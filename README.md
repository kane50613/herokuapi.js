# herokuapi.js

Unofficial heroku api wrapper for NodeJS

### 📦 Install

```shell
npm i herokuapi.js
```

### 📖 Usage 

> [Documentation](https://heroku.js.org/)

`auth` could be an optional parameter, if not set, `HEROKU_API_KEY` will be used by default!

- commonjs
    ```js 
    const {getAccount} = require("herokuapi.js")
     
    const account = await getAccount()
    ```

- mjs / esm / ts
    ```ts 
    import { getAccount } from "herokuapi.js";
    
    const account = await getAccount()
    ```

### ✨ Used By

- [YEE式機器龍](https://yeecord.com/) ([Github](https://github.com/Gary50613/yeecord-project))

### ❤️  Contribute

feel free to make a pull request or join our [Discord Server](https://discord.gg/yeecord)