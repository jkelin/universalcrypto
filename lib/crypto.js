"use strict";

if(typeof require.ensure !== "function") require.ensure = function(d, c) { c(require) };

const assert = require('assert');
const debug = require('debug')('crypto');
const UTF8Encoder = new (require('text-encoding').TextEncoder)('utf-8');
const UTF8Decoder = new (require('text-encoding').TextDecoder)('utf-8');

/** @constant {number} Suggested length of salt in Bytes */
const saltLength = 16;
/** @constant {number} Suggested length of initialization vector in Bytes */
const ivLength = 12;
/** @constant {number} Suggested length of tag for gcm mode in bits */
const tagLength = 128;

const isBrowser = typeof window !== "undefined";
const hasSubtle = isBrowser && typeof window.crypto !== "undefined" && typeof window.crypto.subtle !== "undefined";


//=================
//     Enums
//=================

/**
 * Cypher types that you can use in 'encrypt' and 'decrypt' functions
 * @readonly
 * @enum {string}
 */
const CryptCypher = {
  AES: "AES"
};
Object.freeze(CryptCypher);

/**
 * Cypher modes that you can use in 'encrypt' and 'decrypt' functions
 * @readonly
 * @enum {string}
 */
const CryptMode = {
    GCM: "GCM"
};
Object.freeze(CryptMode);

/**
 * Hash function types that you can use in 'digest' and 'derive' functions
 * @readonly
 * @enum {string}
 */
const Hash = {
    /** 160 bits or 20 Bytes or 40 hex characters */
    SHA1: "SHA1",
    /** 256 bits or 36 Bytes or 64 hex characters */
    SHA256: "SHA256",
    /**
     * Not supported by subtle crypto
     * 128 bits or 16 Bytes or 32 hex characters
     * */
    MD5: "MD5"
};
Object.freeze(Hash);

/**
 * Derivation algorithms for 'derive' function
 * @readonly
 * @enum {string}
 */
const DerivationAlgorithm = {
    PBKDF2: "PBKDF2"
};
Object.freeze(DerivationAlgorithm);


//=================
// Translators - these functions serve as helpers for translating options into their implementation specific counterparts
//=================

function sjcl_hash(hash){
    switch (hash){
        case Hash.SHA256: return "sha256";
        default: throw new Error("Not implemented");
    }
}

function subtle_hash(hash){
    switch (hash){
        case Hash.SHA1: return "SHA-1";
        case Hash.SHA256: return "SHA-256";
        default: throw new Error("Not implemented");
    }
}

function sjcl_cryptCypher(cypher){
    return cypher.toLocaleLowerCase();
}

function sjcl_cryptMode(cypherMode){
    return cypherMode.toLocaleLowerCase();
}

function subtle_cryptName(cypher, cryptMode){
    return cypher + "-" + cryptMode;
}

function sjcl_derivator(derivator){
    return derivator.toLowerCase();
}

function subtle_derivator(derivator){
    return derivator;
}

//=================
//    Helpers
//=================

/**
 * Convert from a bitArray to an array of bytes.
 * Taken from sjcl/core/codecBytes.js
 * @licence MIT
 */
function fromBits (arr) {
    return new Promise(function(resolve) {
        return require.ensure(['sjcl'], function(require){
            const sjcl = require('sjcl');
            var out = [], bl = sjcl.bitArray.bitLength(arr), i, tmp;
            for (i=0; i<bl/8; i++) {
                if ((i&3) === 0) {
                    tmp = arr[i/4];
                }
                out.push(tmp >>> 24);
                tmp <<= 8;
            }
            return resolve(out);
        });
    })
}

/**
 * Convert from an array of bytes to a bitArray.
 * Taken from sjcl/core/codecBytes.js
 * @licence MIT
 */
function toBits(bytes) {
    return new Promise(function(resolve) {
        return require.ensure(['sjcl'], function(require){
            const sjcl = require('sjcl');
            var out = [], i, tmp=0;
            for (i=0; i<bytes.length; i++) {
                tmp = tmp << 8 | bytes[i];
                if ((i&3) === 3) {
                    out.push(tmp);
                    tmp = 0;
                }
            }
            if (i&3) {
                out.push(sjcl.bitArray.partial(8*(i&3), tmp));
            }
            return resolve(out);
        });
    });
}

function ab2sjcl(buffer){
    assert(buffer instanceof ArrayBuffer);

    const arr = new Uint8Array(buffer);

    return toBits(arr);
}

function sjcl2ab(sjclBitArray){
    return fromBits(sjclBitArray).then(function(bytes){
        return new Uint8Array(bytes).buffer;
    });
}

/**
 * Converts ArrayBuffer into UTF-8 encoded string
 * @param {ArrayBuffer} buffer
 * @returns {String}
 */
function ab2str(buffer) {
    return UTF8Decoder.decode(buffer);
}

/**
 * Converts UTF-8 encoded string into ArrayBuffer
 * @param {String} str
 * @returns {ArrayBuffer}
 */
function str2ab(str) {
    return UTF8Encoder.encode(str).buffer;
}

/**
 * Converts ArrayBuffer into hex string
 * @param {ArrayBuffer} buffer
 * @returns {string}
 */
function ab2hex(buffer){
    var hexEncodeArray = [
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'
    ];

    var arr = new Uint8Array(buffer);
    var s = '';
    for (var i = 0; i < arr.length; i++) {
        var code = arr[i];
        s += hexEncodeArray[code >>> 4];
        s += hexEncodeArray[code & 0x0F];
    }

    return s;
}

/**
 * Converts hex string into ArrayBuffer
 * @param {String} hex
 * @returns {ArrayBuffer}
 */
function hex2ab(hex){
    var buf = new ArrayBuffer(hex.length / 2);
    var bufView = new Uint8Array(buf);
    for (var i = 0, y = 0; i < hex.length; i+=2, y++) {
        bufView[y] = parseInt(hex[i] + hex[i+1], 16);
    }
    return buf;
}

function assertAb(fn, args){
    for(var i in args){
        if(typeof args[i] === "undefined") continue;
        assert(args[i] instanceof ArrayBuffer, fn + ", " + i + " needs to be an array buffer.")
    }
}

//=================
//  Random buffer
//=================

function randomBuffer_browser(len){
    debug("randomBuffer_browser");

    return new Promise(function(resolve) {
        const values = window.crypto.getRandomValues(new Uint8Array(len));
        return resolve(values.buffer);
    });
}

function randomBuffer_sjcl(len){
    debug("randomBuffer_sjcl");

    return new Promise(function(resolve) {
        return require.ensure(['sjcl'], function(require){
            const sjcl = require('sjcl');
            const words = sjcl.random.randomWords(Math.floor(len / 4) + 1);
            return resolve(words);
        });
    }).then(function(words){
        return sjcl2ab(words);
    }).then(function(buf){
        return buf.slice(0, len);
    });
}

/**
 * Generates sequence of random Bytes and returns them as ArrayBuffer promise
 * @param {Number} len - Positive number of Bytes that you would like to have generated
 * @returns {Promise.<ArrayBuffer>}
 */
function randomBuffer(len){
    if(isBrowser && typeof window.crypto.getRandomValues !== "undefined") {
        return randomBuffer_browser(len).catch(function(ex){
            console.warn(ex);
            return randomBuffer_sjcl(len);
        });
    }
    else return randomBuffer_sjcl(len);
}


//=================
//     digest
//=================

function digest_subtle(data, opts){
    debug("digest_subtle");

    return window.crypto.subtle.digest(
        {
            name: subtle_hash(opts.hash)
        },
        data
    );
}

function digest_sjcl(data, opts){
    debug("digest_sjcl");

    return ab2sjcl(data).then(function(bits){
            return new Promise(function(resolve) {
                return require.ensure(['sjcl'], function(require){
                    const sjcl = require('sjcl');
                    const out_bits = sjcl.hash.sha256.hash(bits);

                    return resolve(out_bits);
                });
            })
        })
        .then(sjcl2ab);
}

function digest_rusha(data, opts){
    debug("digest_rusha");

    return new Promise(function(resolve) {
        return require.ensure(['rusha'], function(require){
            const rusha = require('rusha');
            const Rusha = new rusha();

            const buf = Rusha.digest(data);

            return resolve(hex2ab(buf));
        });
    });
}

function digest_spark(data, opts){
    debug("digest_spark");

    return new Promise(function(resolve) {
        return require.ensure(['spark-md5'], function(require){
            const SparkMD5 = require('spark-md5');

            const buf = SparkMD5.ArrayBuffer.hash(data);

            return resolve(hex2ab(buf));
        });
    });
}

function digestFallback(data, opts){
    if(opts.hash === Hash.SHA1) return digest_rusha(data, opts);
    else if(opts.hash === Hash.SHA256) return digest_sjcl(data, opts);
    else if(opts.hash === Hash.MD5) return digest_spark(data, opts);
}

/**
 * Digests data with hashing algorithm specified in the options
 * @param {ArrayBuffer} data - Data that you would like to have hashed
 * @param {Object} [opts] - Options object
 * @param {Hash} [opts.hash=Hash.SHA256] - Hashing algorithm
 * @returns {Promise.<ArrayBuffer, Error>}
 */
function digest(data, opts){
    assertAb("digest", {data: data});


    if(typeof opts !== "object") opts = {};

    if(!opts.hash) opts.hash = Hash.SHA256;
    if(Object.keys(Hash).indexOf(opts.hash) === -1) return Promise.reject(new Error("Unknown hash function"));


    if(isBrowser && hasSubtle && opts.hash !== Hash.MD5) {
        return digest_subtle(data, opts).catch(function(ex){
            console.warn(ex);
            return digestFallback(data, opts);
        });
    }
    else return digestFallback(data, opts);
}


//=================
//     derive
//=================

function createPrf_sjcl(hash) {
    return new Promise(function(resolve) {
        return require.ensure(['sjcl'], function(require){
            const sjcl = require('sjcl');

            function prf (key) {
                const hasher = new sjcl.misc.hmac( key, sjcl.hash.sha256 );
                this.encrypt = function () {
                    return hasher.encrypt.apply( hasher, arguments );
                };
            }

            return resolve(prf);
        });
    });
}

function createPrf(hash){
    if(hash === Hash.SHA256) return createPrf_sjcl(hash);
    else if(hash === Hash.MD5) return Promise.reject(new Error("Not implemented"));
    else if(hash === Hash.SHA1) return Promise.reject(new Error("Not implemented"));
}

function derive_sjcl(password, salt, opts){
    debug("derive_sjcl");

    const promises = [
        ab2sjcl(password),
        ab2sjcl(salt),
        createPrf(opts.hash)
    ];

    return Promise.all(promises)
        .then(function(proms){
            return new Promise(function(resolve) {
                return require.ensure(['sjcl'], function(require){
                    const sjcl = require('sjcl');

                    const words = sjcl.misc.pbkdf2(proms[0], proms[1], opts.iterations, opts.bits, proms[2]);
                    return resolve(words);
                });
            })
        }).then(sjcl2ab);
}

function derive_subtle(password, salt, opts){
    debug("derive_subtle");

    return window.crypto.subtle.importKey(
        "raw",
        password,
        {
            name: subtle_derivator(opts.algorithm)
        },
        false,
        ["deriveBits"]
    ).then(function(key){
        return window.crypto.subtle.deriveBits(
            {
                name: subtle_derivator(opts.algorithm),
                salt: salt,
                iterations: opts.iterations,
                hash: {name: subtle_hash(opts.hash)}
            },
            key,
            opts.bits
        )
    });
}

/**
 * Derives password and salt using specified number of iterations of specified hashing algorithm
 * Can be though of as 'hash(password + salt) * iterations'
 * @param {ArrayBuffer} password
 * @param {ArrayBuffer} salt - Sequence of random bytes, can be generated using randomBuffer function
 * @param {Object} [opts] - Options object
 * @param {DerivationAlgorithm} [opts.algorithm=DerivationAlgorithm.PBKDF2] - Derivation algorithm. It is suggested to use PBKDF2 for deriving passwords
 * @param {Hash} [opts.hash=Hash.SHA256] - Hash function of the derivation algorithm
 * @param {Number} [opts.iterations=1000] - Number of times the hashing function will run
 * @param {Number} [opts.bits=256] - Number of bits that will be derived and output. This is also dependent on the hashing algorithm used
 * @returns {Promise.<ArrayBuffer, Error>} Returns ArrayBuffer promise with length = opts.bits / 8
 */
function derive(password, salt, opts){
    assertAb("PBKDF2", {password: password, salt: salt});


    if(typeof opts !== "object") opts = {};

    if(!opts.algorithm) opts.algorithm = DerivationAlgorithm.PBKDF2;
    if(Object.keys(DerivationAlgorithm).indexOf(opts.algorithm) === -1) return Promise.reject(new Error("Unknown algorithm"));

    if(!opts.hash) opts.hash = Hash.SHA256;
    if(Object.keys(Hash).indexOf(opts.hash) === -1) return Promise.reject(new Error("Unknown hash function"));

    if(!opts.iterations) opts.iterations = 1000;
    if(!(opts.iterations > 0)) return Promise.reject(new Error("Invalid number of iterations"));

    if(!opts.bits) opts.bits = 256;
    if(!(opts.bits > 0)) return Promise.reject(new Error("Invalid number of bits"));


    if(hasSubtle) {
        return derive_subtle(password, salt, opts).catch(function (ex) {
            console.warn(ex);
            return derive_sjcl(password, salt, opts);
        });
    }
    else return derive_sjcl(password, salt, opts);
}


//=================
//      crypt
//=================

function crypt_subtle(key, iv, data, opts){
    debug("crypt_subtle", opts.type);

    const name = subtle_cryptName(opts.cypher, opts.mode);

    return window.crypto.subtle.importKey(
        "raw",
        key,
        {
            name: name
        },
        false,
        [opts.type]
    ).then(function(key){
        return window.crypto.subtle[opts.type](
            {
                name: name,
                iv: iv,
                additionalData: opts.additionalData,
                tagLength: opts.tagLength
            },
            key,
            data
        );
    });
}

function crypt_sjcl(key, iv, data, opts){
    debug("crypt_sjcl", opts.type);

    const proms = [
        ab2sjcl(key),
        ab2sjcl(iv),
        ab2sjcl(data),
        ab2sjcl(opts.additionalData)
    ];

    return Promise.all(proms).then(function(res){
        return new Promise(function(resolve) {
            return require.ensure(['sjcl'], function(require){
                const sjcl = require('sjcl');
                const prp = new sjcl.cipher[sjcl_cryptCypher(opts.cypher)](res[0]);
                const crypt_func = sjcl.mode[sjcl_cryptMode(opts.mode)][opts.type];
                const bits = crypt_func(prp, res[2], res[1], res[3], opts.tagLength);
                resolve(bits);
            });
        });
    }).then(sjcl2ab);
}

function crypt(key, iv, data, opts){
    assertAb("AES_GCM_encrypt", {key: key, iv: iv, data: data});

    if(typeof opts !== "object") opts = {};

    if(!opts.cypher) opts.cypher = CryptCypher.AES;
    if(opts.cypher !== CryptCypher.AES) return Promise.reject(new Error("Unknown algorithm"));

    if(opts.type !== "encrypt" && opts.type !== "decrypt") return Promise.reject(new Error("Crypt function needs a type"));

    if(opts.cypher === CryptCypher.AES){
        if(!opts.mode) opts.mode = CryptMode.GCM;
        if(opts.mode !== CryptMode.GCM) return Promise.reject(new Error("Unknown cypher mode"));

        if(opts.mode === CryptMode.GCM){
            if(!opts.additionalData) opts.additionalData = new Uint8Array([]).buffer;
            if(!(opts.additionalData instanceof ArrayBuffer)) return Promise.reject(new Error("Additional data is not an ArrayBuffer"));

            if(!opts.tagLength) opts.tagLength = tagLength;
            if(!(opts.tagLength > 0)) return Promise.reject(new Error("Tag length invalid"));
        }
    }

    if(hasSubtle) {
        return crypt_subtle(key, iv, data, opts).catch(function(ex){
            console.warn(ex);
            return crypt_sjcl(key, iv, data, opts);
        });
    }
    else return crypt_sjcl(key, iv, data, opts);
}

/**
 * Encrypts data using key and iv with symmetrical algorithm and its mode chosen in the opts
 * @param {ArrayBuffer} key - Key to be used in the encryption process, different encryption algorithms require different key lengths
 * @param {ArrayBuffer} iv - Initialization Vector of the encryption function (ArrayBuffer filled with random data). Never reuse IVs!
 * @param {ArrayBuffer} data - Data to encrypt
 * @param {Object} [opts] - Options object
 * @param {CryptCypher} [opts.cypher=CryptCypher.AES] - Cypher to be used during encryption
 * @param {CryptMode} [opts.mode=CryptMode.GCM] - Cypher mode to be used with the AES cypher
 * @param {ArrayBuffer} [opts.additionalData=[]] - Additional data for the AES-GCM mode
 * @param {Number} [opts.tagLength=128] - Tag length for the AES-GCM mode
 */
function encrypt(key, iv, data, opts){
    opts.type = "encrypt";
    return crypt(key, iv, data, opts);
}

/**
 * Decrypt data using key and iv with symmetrical algorithm and its mode chosen in the opts
 * Reverses encrypt
 * @param {ArrayBuffer} key - Key to be used in the decryption process, different decryption algorithms require different key lengths
 * @param {ArrayBuffer} iv - Initialization Vector used during encryption
 * @param {ArrayBuffer} data - Encrypted data to decrypt
 * @param {Object} [opts] - Options object
 * @param {CryptCypher} [opts.cypher=CryptCypher.AES] - Cypher that has been used during encryption
 * @param {CryptMode} [opts.mode=CryptMode.GCM] - Cypher mode to be used with the AES cypher
 * @param {ArrayBuffer} [opts.additionalData=[]] - Additional data for the AES-GCM mode. Required if additional data has been used during encryption
 * @param {Number} [opts.tagLength=128] - Tag length for the AES-GCM mode
 */
function decrypt(key, iv, data, opts){
    opts.type = "decrypt";
    return crypt(key, iv, data, opts);
}


module.exports = {
    randomBytes: randomBuffer,
    derive: derive,
    digest: digest,
    encrypt: encrypt,
    decrypt: decrypt,
    ab2str: ab2str,
    str2ab: str2ab,
    ab2hex: ab2hex,
    hex2ab: hex2ab,
    CryptCypher: CryptCypher,
    CryptMode: CryptMode,
    Hash: Hash,
    DerivationAlgorithm: DerivationAlgorithm,
    saltLength: saltLength,
    ivLength: ivLength,
    tagLength: tagLength
};

Object.freeze(module.exports);