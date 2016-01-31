var assert = require('assert');
var crypto = require('../lib/crypto.js');
require('debug').enable('crypto');

function assertArrayBuffer(a, b, message){
    const aArr = new Uint8Array(a);
    const bArr = new Uint8Array(b);

    assert(aArr.length === bArr.length, message);
    for (var i = 0, len = aArr.length; i < len; i++){
        assert(aArr[i] === bArr[i], message);
    }
}

function serializeBuffer(buf){
    var arr = new Uint8Array(buf);
    return "" + arr;
}

function bufLen(len){
    return function(ba){
        assert.equal(new Uint8Array(ba).length, len, "Buffer are not " + len + " long. [" + serializeBuffer(ba) + "]");
    }
}

function bufEquals(target){
    return function(ba){
        assertArrayBuffer(ba, target, "Buffers are not identical.\nActual\t:[" + serializeBuffer(ba) + "]\nExpected\t:[" + serializeBuffer(target) + "]");
    }
}

function promAb(promise, func, done){
    return promise.then(func).then(done, done);
}

describe('randomBuffer', function() {
    it('buffer should have correct length', function (done) {
        var len = Math.floor(Math.random() * 20) + 10;
        var prom = Promise.resolve(crypto.randomBytes(len));

        return promAb(prom, bufLen(len), done);
    });
});

describe('derive', function() {
    describe('pbkdf2', function() {
        it('sha-256', function (done) {
            var password = new Uint8Array([1,2,3,4]).buffer;
            var salt = new Uint8Array([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]).buffer;
            var output = new Uint8Array([47,13,80,112,194,67,188,165,156,20,55,91,253,15,35,59,77,131,137,240,173,119,14,158,165,101,159,21,181,212,111,137]).buffer;

            var prom = Promise.resolve(crypto.derive(password, salt, {
                iterations: 5,
                algorithm: crypto.DerivationAlgorithm.PBKDF2,
                hash: crypto.Hash.SHA256,
                bits: 256
            }));

            return promAb(prom, bufEquals(output), done);
        });
    });
});

describe('digest', function() {
    var input = crypto.str2ab("The quick brown fox jumps over the lazy dog");

    it('sha-256', function (done) {
        var output = crypto.hex2ab("d7a8fbb307d7809469ca9abcb0082e4f8d5651e46d3cdb762d02d0bf37c9e592");

        var prom = crypto.digest(input, {hash: crypto.Hash.SHA256});

        return promAb(prom, bufEquals(output), done);
    });

    it('sha-1', function (done) {
        var output = crypto.hex2ab("2fd4e1c67a2d28fced849ee1bb76e7391b93eb12");

        var prom = crypto.digest(input, {hash: crypto.Hash.SHA1});

        return promAb(prom, bufEquals(output), done);
    });

    it('md5', function (done) {
        var output = crypto.hex2ab("9e107d9d372bb6826bd81d3542a419d6");

        var prom = crypto.digest(input, {hash: crypto.Hash.MD5});

        return promAb(prom, bufEquals(output), done);
    });
});

describe('helpers', function() {
    describe('ab2hex and hex2ab', function() {
        it('ab2hex convert correctly', function () {
            var ab = new Uint8Array([255, 15, 16, 0]).buffer;
            var target = "ff0f1000";
            var converted = crypto.ab2hex(ab);

            assert.equal(target, converted);
        });

        it('ab2hex input should equal hex2ab output', function () {
            var ab = new Uint8Array([255, 15, 16, 0]).buffer;
            var converted = crypto.ab2hex(ab);
            var reverted = crypto.hex2ab(converted);

            assertArrayBuffer(ab, reverted, "Buffers not equal");
        });
    });
});


describe('crypt', function() {
    describe('AES-GCM', function() {
        var key = crypto.hex2ab("9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08");
        var iv = crypto.hex2ab("9f86d081884c");
        var input = crypto.str2ab("The quick brown fox jumps over the lazy dog");
        var output = new Uint8Array([
            79,247,73,172,136,12,70,67,44,98,118,130,238,170,237,212,94,212,98,54,232,139,227,104,
            139,127,75,212,79,148,251,2,58,105,31,83,195,132,107,221,205,52,81,118,77,227,75,194,
            96,138,191,143,86,40,127,232,99,207,81
        ]).buffer;

        it('encrypt', function (done) {
            var prom = crypto.encrypt(key, iv, input, {
                cypher: crypto.CryptCypher.AES,
                mode: crypto.CryptMode.GCM,
                tagLength: 128
            });
            return promAb(prom, bufEquals(output), done);
        });

        it('decrypt', function (done) {
            var prom = crypto.decrypt(key, iv, output, {
                cypher: crypto.CryptCypher.AES,
                mode: crypto.CryptMode.GCM,
                tagLength: 128
            });
            return promAb(prom, bufEquals(input), done);
        });
    });
});