## Constants

<dl>
<dt><a href="#Suggested">Suggested</a> : <code>number</code></dt>
<dd><p>length of salt in Bytes</p>
</dd>
<dt><a href="#Suggested">Suggested</a> : <code>number</code></dt>
<dd><p>length of initialization vector in Bytes</p>
</dd>
<dt><a href="#Suggested">Suggested</a> : <code>number</code></dt>
<dd><p>length of tag for gcm mode in bits</p>
</dd>
<dt><a href="#CryptCypher">CryptCypher</a> : <code>enum</code></dt>
<dd><p>Cypher types that you can use in &#39;encrypt&#39; and &#39;decrypt&#39; functions</p>
</dd>
<dt><a href="#CryptMode">CryptMode</a> : <code>enum</code></dt>
<dd><p>Cypher modes that you can use in &#39;encrypt&#39; and &#39;decrypt&#39; functions</p>
</dd>
<dt><a href="#Hash">Hash</a> : <code>enum</code></dt>
<dd><p>Hash function types that you can use in &#39;digest&#39; and &#39;derive&#39; functions</p>
</dd>
<dt><a href="#DerivationAlgorithm">DerivationAlgorithm</a> : <code>enum</code></dt>
<dd><p>Derivation algorithms for &#39;derive&#39; function</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#fromBits">fromBits()</a></dt>
<dd><p>Convert from a bitArray to an array of bytes.
Taken from sjcl/core/codecBytes.js</p>
</dd>
<dt><a href="#toBits">toBits()</a></dt>
<dd><p>Convert from an array of bytes to a bitArray.
Taken from sjcl/core/codecBytes.js</p>
</dd>
<dt><a href="#ab2str">ab2str(buffer)</a> ⇒ <code>String</code></dt>
<dd><p>Converts ArrayBuffer into UTF-8 encoded string</p>
</dd>
<dt><a href="#str2ab">str2ab(str)</a> ⇒ <code>ArrayBuffer</code></dt>
<dd><p>Converts UTF-8 encoded string into ArrayBuffer</p>
</dd>
<dt><a href="#ab2hex">ab2hex(buffer)</a> ⇒ <code>string</code></dt>
<dd><p>Converts ArrayBuffer into hex string</p>
</dd>
<dt><a href="#hex2ab">hex2ab(hex)</a> ⇒ <code>ArrayBuffer</code></dt>
<dd><p>Converts hex string into ArrayBuffer</p>
</dd>
<dt><a href="#randomBuffer">randomBuffer(len)</a> ⇒ <code>Promise.&lt;ArrayBuffer&gt;</code></dt>
<dd><p>Generates sequence of random Bytes and returns them as ArrayBuffer promise</p>
</dd>
<dt><a href="#digest">digest(data, [opts])</a> ⇒ <code>Promise.&lt;ArrayBuffer, Error&gt;</code></dt>
<dd><p>Digests data with hashing algorithm specified in the options</p>
</dd>
<dt><a href="#derive">derive(password, salt, [opts])</a> ⇒ <code>Promise.&lt;ArrayBuffer, Error&gt;</code></dt>
<dd><p>Derives password and salt using specified number of iterations of specified hashing algorithm
Can be though of as &#39;hash(password + salt) * iterations&#39;</p>
</dd>
<dt><a href="#encrypt">encrypt(key, iv, data, [opts])</a></dt>
<dd><p>Encrypts data using key and iv with symmetrical algorithm and its mode chosen in the opts</p>
</dd>
<dt><a href="#decrypt">decrypt(key, iv, data, [opts])</a></dt>
<dd><p>Decrypt data using key and iv with symmetrical algorithm and its mode chosen in the opts
Reverses encrypt</p>
</dd>
</dl>

<a name="Suggested"></a>
## Suggested : <code>number</code>
length of salt in Bytes

**Kind**: global constant  
<a name="Suggested"></a>
## Suggested : <code>number</code>
length of initialization vector in Bytes

**Kind**: global constant  
<a name="Suggested"></a>
## Suggested : <code>number</code>
length of tag for gcm mode in bits

**Kind**: global constant  
<a name="CryptCypher"></a>
## CryptCypher : <code>enum</code>
Cypher types that you can use in 'encrypt' and 'decrypt' functions

**Kind**: global constant  
**Read only**: true  
**Properties**

| Name | Type | Default |
| --- | --- | --- |
| AES | <code>string</code> | <code>&quot;AES&quot;</code> | 

<a name="CryptMode"></a>
## CryptMode : <code>enum</code>
Cypher modes that you can use in 'encrypt' and 'decrypt' functions

**Kind**: global constant  
**Read only**: true  
**Properties**

| Name | Type | Default |
| --- | --- | --- |
| GCM | <code>string</code> | <code>&quot;GCM&quot;</code> | 

<a name="Hash"></a>
## Hash : <code>enum</code>
Hash function types that you can use in 'digest' and 'derive' functions

**Kind**: global constant  
**Read only**: true  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| SHA1 | <code>string</code> | <code>&quot;SHA1&quot;</code> | 160 bits or 20 Bytes or 40 hex characters |
| SHA256 | <code>string</code> | <code>&quot;SHA256&quot;</code> | 256 bits or 36 Bytes or 64 hex characters |
| MD5 | <code>string</code> | <code>&quot;MD5&quot;</code> | Not supported by subtle crypto 128 bits or 16 Bytes or 32 hex characters |

<a name="DerivationAlgorithm"></a>
## DerivationAlgorithm : <code>enum</code>
Derivation algorithms for 'derive' function

**Kind**: global constant  
**Read only**: true  
**Properties**

| Name | Type | Default |
| --- | --- | --- |
| PBKDF2 | <code>string</code> | <code>&quot;PBKDF2&quot;</code> | 

<a name="fromBits"></a>
## fromBits()
Convert from a bitArray to an array of bytes.
Taken from sjcl/core/codecBytes.js

**Kind**: global function  
**Licence**: MIT  
<a name="toBits"></a>
## toBits()
Convert from an array of bytes to a bitArray.
Taken from sjcl/core/codecBytes.js

**Kind**: global function  
**Licence**: MIT  
<a name="ab2str"></a>
## ab2str(buffer) ⇒ <code>String</code>
Converts ArrayBuffer into UTF-8 encoded string

**Kind**: global function  

| Param | Type |
| --- | --- |
| buffer | <code>ArrayBuffer</code> | 

<a name="str2ab"></a>
## str2ab(str) ⇒ <code>ArrayBuffer</code>
Converts UTF-8 encoded string into ArrayBuffer

**Kind**: global function  

| Param | Type |
| --- | --- |
| str | <code>String</code> | 

<a name="ab2hex"></a>
## ab2hex(buffer) ⇒ <code>string</code>
Converts ArrayBuffer into hex string

**Kind**: global function  

| Param | Type |
| --- | --- |
| buffer | <code>ArrayBuffer</code> | 

<a name="hex2ab"></a>
## hex2ab(hex) ⇒ <code>ArrayBuffer</code>
Converts hex string into ArrayBuffer

**Kind**: global function  

| Param | Type |
| --- | --- |
| hex | <code>String</code> | 

<a name="randomBuffer"></a>
## randomBuffer(len) ⇒ <code>Promise.&lt;ArrayBuffer&gt;</code>
Generates sequence of random Bytes and returns them as ArrayBuffer promise

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| len | <code>Number</code> | Positive number of Bytes that you would like to have generated |

<a name="digest"></a>
## digest(data, [opts]) ⇒ <code>Promise.&lt;ArrayBuffer, Error&gt;</code>
Digests data with hashing algorithm specified in the options

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| data | <code>ArrayBuffer</code> |  | Data that you would like to have hashed |
| [opts] | <code>Object</code> |  | Options object |
| [opts.hash] | <code>[Hash](#Hash)</code> | <code>Hash.SHA256</code> | Hashing algorithm |

<a name="derive"></a>
## derive(password, salt, [opts]) ⇒ <code>Promise.&lt;ArrayBuffer, Error&gt;</code>
Derives password and salt using specified number of iterations of specified hashing algorithm
Can be though of as 'hash(password + salt) * iterations'

**Kind**: global function  
**Returns**: <code>Promise.&lt;ArrayBuffer, Error&gt;</code> - Returns ArrayBuffer promise with length = opts.bits / 8  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| password | <code>ArrayBuffer</code> |  |  |
| salt | <code>ArrayBuffer</code> |  | Sequence of random bytes, can be generated using randomBuffer function |
| [opts] | <code>Object</code> |  | Options object |
| [opts.algorithm] | <code>[DerivationAlgorithm](#DerivationAlgorithm)</code> | <code>DerivationAlgorithm.PBKDF2</code> | Derivation algorithm. It is suggested to use PBKDF2 for deriving passwords |
| [opts.hash] | <code>[Hash](#Hash)</code> | <code>Hash.SHA256</code> | Hash function of the derivation algorithm |
| [opts.iterations] | <code>Number</code> | <code>1000</code> | Number of times the hashing function will run |
| [opts.bits] | <code>Number</code> | <code>256</code> | Number of bits that will be derived and output. This is also dependent on the hashing algorithm used |

<a name="encrypt"></a>
## encrypt(key, iv, data, [opts])
Encrypts data using key and iv with symmetrical algorithm and its mode chosen in the opts

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| key | <code>ArrayBuffer</code> |  | Key to be used in the encryption process, different encryption algorithms require different key lengths |
| iv | <code>ArrayBuffer</code> |  | Initialization Vector of the encryption function (ArrayBuffer filled with random data). Never reuse IVs! |
| data | <code>ArrayBuffer</code> |  | Data to encrypt |
| [opts] | <code>Object</code> |  | Options object |
| [opts.cypher] | <code>[CryptCypher](#CryptCypher)</code> | <code>CryptCypher.AES</code> | Cypher to be used during encryption |
| [opts.mode] | <code>[CryptMode](#CryptMode)</code> | <code>CryptMode.GCM</code> | Cypher mode to be used with the AES cypher |
| [opts.additionalData] | <code>ArrayBuffer</code> | <code>[]</code> | Additional data for the AES-GCM mode |
| [opts.tagLength] | <code>Number</code> | <code>128</code> | Tag length for the AES-GCM mode |

<a name="decrypt"></a>
## decrypt(key, iv, data, [opts])
Decrypt data using key and iv with symmetrical algorithm and its mode chosen in the opts
Reverses encrypt

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| key | <code>ArrayBuffer</code> |  | Key to be used in the decryption process, different decryption algorithms require different key lengths |
| iv | <code>ArrayBuffer</code> |  | Initialization Vector used during encryption |
| data | <code>ArrayBuffer</code> |  | Encrypted data to decrypt |
| [opts] | <code>Object</code> |  | Options object |
| [opts.cypher] | <code>[CryptCypher](#CryptCypher)</code> | <code>CryptCypher.AES</code> | Cypher that has been used during encryption |
| [opts.mode] | <code>[CryptMode](#CryptMode)</code> | <code>CryptMode.GCM</code> | Cypher mode to be used with the AES cypher |
| [opts.additionalData] | <code>ArrayBuffer</code> | <code>[]</code> | Additional data for the AES-GCM mode. Required if additional data has been used during encryption |
| [opts.tagLength] | <code>Number</code> | <code>128</code> | Tag length for the AES-GCM mode |

