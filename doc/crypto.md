# Global





* * *

### fromBits() 

Convert from a bitArray to an array of bytes.
Taken from sjcl/core/codecBytes.js



### toBits() 

Convert from an array of bytes to a bitArray.
Taken from sjcl/core/codecBytes.js



### ab2str(buffer) 

Converts ArrayBuffer into UTF-8 encoded string

**Parameters**

**buffer**: `ArrayBuffer`, Converts ArrayBuffer into UTF-8 encoded string

**Returns**: `String`


### str2ab(str) 

Converts UTF-8 encoded string into ArrayBuffer

**Parameters**

**str**: `String`, Converts UTF-8 encoded string into ArrayBuffer

**Returns**: `ArrayBuffer`


### ab2hex(buffer) 

Converts ArrayBuffer into hex string

**Parameters**

**buffer**: `ArrayBuffer`, Converts ArrayBuffer into hex string

**Returns**: `string`


### hex2ab(hex) 

Converts hex string into ArrayBuffer

**Parameters**

**hex**: `String`, Converts hex string into ArrayBuffer

**Returns**: `ArrayBuffer`


### randomBuffer(len) 

Generates sequence of random Bytes and returns them as ArrayBuffer promise

**Parameters**

**len**: `Number`, Positive number of Bytes that you would like to have generated

**Returns**: `Promise.&lt;ArrayBuffer&gt;`


### digest(data, opts, opts.hash) 

Digests data with hashing algorithm specified in the options

**Parameters**

**data**: `ArrayBuffer`, Data that you would like to have hashed

**opts**: `Object`, Options object

**opts.hash**: `Hash`, Hashing algorithm

**Returns**: `Promise.&lt;ArrayBuffer, Error&gt;`


### derive(password, salt, opts, opts.algorithm, opts.hash, opts.iterations, opts.bits) 

Derives password and salt using specified number of iterations of specified hashing algorithm
Can be though of as 'hash(password + salt) * iterations'

**Parameters**

**password**: `ArrayBuffer`, Derives password and salt using specified number of iterations of specified hashing algorithm
Can be though of as 'hash(password + salt) * iterations'

**salt**: `ArrayBuffer`, Sequence of random bytes, can be generated using randomBuffer function

**opts**: `Object`, Options object

**opts.algorithm**: `DerivationAlgorithm`, Derivation algorithm. It is suggested to use PBKDF2 for deriving passwords

**opts.hash**: `Hash`, Hash function of the derivation algorithm

**opts.iterations**: `Number`, Number of times the hashing function will run

**opts.bits**: `Number`, Number of bits that will be derived and output. This is also dependent on the hashing algorithm used

**Returns**: `Promise.&lt;ArrayBuffer, Error&gt;`, Returns ArrayBuffer promise with length = opts.bits / 8


### encrypt(key, iv, data, opts, opts.cypher, opts.mode, opts.additionalData, opts.tagLength) 

Encrypts data using key and iv with symmetrical algorithm and its mode chosen in the opts

**Parameters**

**key**: `ArrayBuffer`, Key to be used in the encryption process, different encryption algorithms require different key lengths

**iv**: `ArrayBuffer`, Initialization Vector of the encryption function (ArrayBuffer filled with random data). Never reuse IVs!

**data**: `ArrayBuffer`, Data to encrypt

**opts**: `Object`, Options object

**opts.cypher**: `CryptCypher`, Cypher to be used during encryption

**opts.mode**: `CryptMode`, Cypher mode to be used with the AES cypher

**opts.additionalData**: `ArrayBuffer`, Additional data for the AES-GCM mode

**opts.tagLength**: `Number`, Tag length for the AES-GCM mode



### decrypt(key, iv, data, opts, opts.cypher, opts.mode, opts.additionalData, opts.tagLength) 

Decrypt data using key and iv with symmetrical algorithm and its mode chosen in the opts
Reverses encrypt

**Parameters**

**key**: `ArrayBuffer`, Key to be used in the decryption process, different decryption algorithms require different key lengths

**iv**: `ArrayBuffer`, Initialization Vector used during encryption

**data**: `ArrayBuffer`, Encrypted data to decrypt

**opts**: `Object`, Options object

**opts.cypher**: `CryptCypher`, Cypher that has been used during encryption

**opts.mode**: `CryptMode`, Cypher mode to be used with the AES cypher

**opts.additionalData**: `ArrayBuffer`, Additional data for the AES-GCM mode. Required if additional data has been used during encryption

**opts.tagLength**: `Number`, Tag length for the AES-GCM mode




* * *










