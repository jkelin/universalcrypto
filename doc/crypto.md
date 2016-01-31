<a name="module_universal-crypto"></a>
## universal-crypto

* [universal-crypto](#module_universal-crypto)
    * _static_
        * [.CryptCypher](#module_universal-crypto.CryptCypher) : <code>enum</code>
        * [.CryptMode](#module_universal-crypto.CryptMode) : <code>enum</code>
        * [.Hash](#module_universal-crypto.Hash) : <code>enum</code>
        * [.DerivationAlgorithm](#module_universal-crypto.DerivationAlgorithm) : <code>enum</code>
        * [.ab2str(buffer)](#module_universal-crypto.ab2str) ⇒ <code>String</code>
        * [.str2ab(str)](#module_universal-crypto.str2ab) ⇒ <code>ArrayBuffer</code>
        * [.ab2hex(buffer)](#module_universal-crypto.ab2hex) ⇒ <code>string</code>
        * [.hex2ab(hex)](#module_universal-crypto.hex2ab) ⇒ <code>ArrayBuffer</code>
        * [.randomBuffer(len)](#module_universal-crypto.randomBuffer) ⇒ <code>Promise.&lt;ArrayBuffer&gt;</code>
        * [.digest(data, [opts])](#module_universal-crypto.digest) ⇒ <code>Promise.&lt;ArrayBuffer, Error&gt;</code>
        * [.derive(password, salt, [opts])](#module_universal-crypto.derive) ⇒ <code>Promise.&lt;ArrayBuffer, Error&gt;</code>
        * [.encrypt(key, iv, data, [opts])](#module_universal-crypto.encrypt)
        * [.decrypt(key, iv, data, [opts])](#module_universal-crypto.decrypt)
    * _inner_
        * [~saltLength](#module_universal-crypto..saltLength) : <code>number</code>
        * [~ivLength](#module_universal-crypto..ivLength) : <code>number</code>
        * [~tagLength](#module_universal-crypto..tagLength) : <code>number</code>

<a name="module_universal-crypto.CryptCypher"></a>
### universal-crypto.CryptCypher : <code>enum</code>
Cypher types that you can use in 'encrypt' and 'decrypt' functions

**Kind**: static constant of <code>[universal-crypto](#module_universal-crypto)</code>  
**Read only**: true  
**Properties**

| Name | Type | Default |
| --- | --- | --- |
| AES | <code>string</code> | <code>&quot;AES&quot;</code> | 

<a name="module_universal-crypto.CryptMode"></a>
### universal-crypto.CryptMode : <code>enum</code>
Cypher modes that you can use in 'encrypt' and 'decrypt' functions

**Kind**: static constant of <code>[universal-crypto](#module_universal-crypto)</code>  
**Read only**: true  
**Properties**

| Name | Type | Default |
| --- | --- | --- |
| GCM | <code>string</code> | <code>&quot;GCM&quot;</code> | 

<a name="module_universal-crypto.Hash"></a>
### universal-crypto.Hash : <code>enum</code>
Hash function types that you can use in 'digest' and 'derive' functions

**Kind**: static constant of <code>[universal-crypto](#module_universal-crypto)</code>  
**Read only**: true  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| SHA1 | <code>string</code> | <code>&quot;SHA1&quot;</code> | 160 bits or 20 Bytes or 40 hex characters |
| SHA256 | <code>string</code> | <code>&quot;SHA256&quot;</code> | 256 bits or 36 Bytes or 64 hex characters |
| MD5 | <code>string</code> | <code>&quot;MD5&quot;</code> | Not supported by subtle crypto 128 bits or 16 Bytes or 32 hex characters |

<a name="module_universal-crypto.DerivationAlgorithm"></a>
### universal-crypto.DerivationAlgorithm : <code>enum</code>
Derivation algorithms for 'derive' function

**Kind**: static constant of <code>[universal-crypto](#module_universal-crypto)</code>  
**Read only**: true  
**Properties**

| Name | Type | Default |
| --- | --- | --- |
| PBKDF2 | <code>string</code> | <code>&quot;PBKDF2&quot;</code> | 

<a name="module_universal-crypto.ab2str"></a>
### universal-crypto.ab2str(buffer) ⇒ <code>String</code>
Converts ArrayBuffer into UTF-8 encoded string

**Kind**: static method of <code>[universal-crypto](#module_universal-crypto)</code>  

| Param | Type |
| --- | --- |
| buffer | <code>ArrayBuffer</code> | 

<a name="module_universal-crypto.str2ab"></a>
### universal-crypto.str2ab(str) ⇒ <code>ArrayBuffer</code>
Converts UTF-8 encoded string into ArrayBuffer

**Kind**: static method of <code>[universal-crypto](#module_universal-crypto)</code>  

| Param | Type |
| --- | --- |
| str | <code>String</code> | 

<a name="module_universal-crypto.ab2hex"></a>
### universal-crypto.ab2hex(buffer) ⇒ <code>string</code>
Converts ArrayBuffer into hex string

**Kind**: static method of <code>[universal-crypto](#module_universal-crypto)</code>  

| Param | Type |
| --- | --- |
| buffer | <code>ArrayBuffer</code> | 

<a name="module_universal-crypto.hex2ab"></a>
### universal-crypto.hex2ab(hex) ⇒ <code>ArrayBuffer</code>
Converts hex string into ArrayBuffer

**Kind**: static method of <code>[universal-crypto](#module_universal-crypto)</code>  

| Param | Type |
| --- | --- |
| hex | <code>String</code> | 

<a name="module_universal-crypto.randomBuffer"></a>
### universal-crypto.randomBuffer(len) ⇒ <code>Promise.&lt;ArrayBuffer&gt;</code>
Generates sequence of random Bytes and returns them as ArrayBuffer promise

**Kind**: static method of <code>[universal-crypto](#module_universal-crypto)</code>  

| Param | Type | Description |
| --- | --- | --- |
| len | <code>Number</code> | Positive number of Bytes that you would like to have generated |

<a name="module_universal-crypto.digest"></a>
### universal-crypto.digest(data, [opts]) ⇒ <code>Promise.&lt;ArrayBuffer, Error&gt;</code>
Digests data with hashing algorithm specified in the options

**Kind**: static method of <code>[universal-crypto](#module_universal-crypto)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| data | <code>ArrayBuffer</code> |  | Data that you would like to have hashed |
| [opts] | <code>Object</code> |  | Options object |
| [opts.hash] | <code>Hash</code> | <code>Hash.SHA256</code> | Hashing algorithm |

<a name="module_universal-crypto.derive"></a>
### universal-crypto.derive(password, salt, [opts]) ⇒ <code>Promise.&lt;ArrayBuffer, Error&gt;</code>
Derives password and salt using specified number of iterations of specified hashing algorithm
Can be though of as 'hash(password + salt) * iterations'

**Kind**: static method of <code>[universal-crypto](#module_universal-crypto)</code>  
**Returns**: <code>Promise.&lt;ArrayBuffer, Error&gt;</code> - Returns ArrayBuffer promise with length = opts.bits / 8  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| password | <code>ArrayBuffer</code> |  |  |
| salt | <code>ArrayBuffer</code> |  | Sequence of random bytes, can be generated using randomBuffer function |
| [opts] | <code>Object</code> |  | Options object |
| [opts.algorithm] | <code>DerivationAlgorithm</code> | <code>DerivationAlgorithm.PBKDF2</code> | Derivation algorithm. It is suggested to use PBKDF2 for deriving passwords |
| [opts.hash] | <code>Hash</code> | <code>Hash.SHA256</code> | Hash function of the derivation algorithm |
| [opts.iterations] | <code>Number</code> | <code>1000</code> | Number of times the hashing function will run |
| [opts.bits] | <code>Number</code> | <code>256</code> | Number of bits that will be derived and output. This is also dependent on the hashing algorithm used |

<a name="module_universal-crypto.encrypt"></a>
### universal-crypto.encrypt(key, iv, data, [opts])
Encrypts data using key and iv with symmetrical algorithm and its mode chosen in the opts

**Kind**: static method of <code>[universal-crypto](#module_universal-crypto)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| key | <code>ArrayBuffer</code> |  | Key to be used in the encryption process, different encryption algorithms require different key lengths |
| iv | <code>ArrayBuffer</code> |  | Initialization Vector of the encryption function (ArrayBuffer filled with random data). Never reuse IVs! |
| data | <code>ArrayBuffer</code> |  | Data to encrypt |
| [opts] | <code>Object</code> |  | Options object |
| [opts.cypher] | <code>CryptCypher</code> | <code>CryptCypher.AES</code> | Cypher to be used during encryption |
| [opts.mode] | <code>CryptMode</code> | <code>CryptMode.GCM</code> | Cypher mode to be used with the AES cypher |
| [opts.additionalData] | <code>ArrayBuffer</code> | <code>[]</code> | Additional data for the AES-GCM mode |
| [opts.tagLength] | <code>Number</code> | <code>128</code> | Tag length for the AES-GCM mode |

<a name="module_universal-crypto.decrypt"></a>
### universal-crypto.decrypt(key, iv, data, [opts])
Decrypt data using key and iv with symmetrical algorithm and its mode chosen in the opts
Reverses encrypt

**Kind**: static method of <code>[universal-crypto](#module_universal-crypto)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| key | <code>ArrayBuffer</code> |  | Key to be used in the decryption process, different decryption algorithms require different key lengths |
| iv | <code>ArrayBuffer</code> |  | Initialization Vector used during encryption |
| data | <code>ArrayBuffer</code> |  | Encrypted data to decrypt |
| [opts] | <code>Object</code> |  | Options object |
| [opts.cypher] | <code>CryptCypher</code> | <code>CryptCypher.AES</code> | Cypher that has been used during encryption |
| [opts.mode] | <code>CryptMode</code> | <code>CryptMode.GCM</code> | Cypher mode to be used with the AES cypher |
| [opts.additionalData] | <code>ArrayBuffer</code> | <code>[]</code> | Additional data for the AES-GCM mode. Required if additional data has been used during encryption |
| [opts.tagLength] | <code>Number</code> | <code>128</code> | Tag length for the AES-GCM mode |

<a name="module_universal-crypto..saltLength"></a>
### universal-crypto~saltLength : <code>number</code>
Suggested length of salt in Bytes

**Kind**: inner constant of <code>[universal-crypto](#module_universal-crypto)</code>  
<a name="module_universal-crypto..ivLength"></a>
### universal-crypto~ivLength : <code>number</code>
Suggested length of initialization vector in Bytes

**Kind**: inner constant of <code>[universal-crypto](#module_universal-crypto)</code>  
<a name="module_universal-crypto..tagLength"></a>
### universal-crypto~tagLength : <code>number</code>
Suggested length of tag for gcm mode in bits

**Kind**: inner constant of <code>[universal-crypto](#module_universal-crypto)</code>  
