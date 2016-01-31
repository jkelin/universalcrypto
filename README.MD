# Universal Crypto

[![npm version](https://badge.fury.io/js/universal-crypto.svg)](https://badge.fury.io/js/universal-crypto)

Common interface for SubtleCrypto, SJCL, Rusha and Spark-MD5.

+ Uses ArrayBuffers and Promises.
+ Works for in browser as well as NodeJS.
+ Uses SubtleCrypto when possible, falls back on other libraries when not.
+ Integrates well with webpack - uses require.ensure for code split points to load additional libraries.

[Documentation](doc/crypto.md)

Licence: [MIT](https://opensource.org/licenses/MIT)
