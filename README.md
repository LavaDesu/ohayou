# Ohayou

A small library to fetch data from the [osu!api v2](https://osu.ppy.sh/docs/index.html)

## Getting Started

### Clone the git repository

```
$ git clone https://github.com/LavaDesu/ohayou.git
$ cd ohayou
```

### Install dependencies

```
$ npm install
```

### Build

```
$ npm run build
```

### Link the library for use as a dependency

```
$ npm link
$ cd /path/to/your/app
$ npm link ohayou
```

## Examples

### Fetch data from [peppy](https://osu.ppy.sh/users/2)'s profile

```js
const { Client } = require("ohayou");

const client = new Client("OAUTH_CLIENT_ID_HERE", "OAUTH_CLIENT_SECRET_HERE");
client.getUser("2").then(res => console.log(res))
```

## Contributing

Try to keep the same code style as the rest of the project. Running `npm run lint` can help.

## Versioning

This library uses [SemVer](https://semver.org), as should any library. The current major version is `0`, meaning that breaking changes are to be expected every minor version increment. When a breaking change is made, it should be deprecated 1 or more minor versions earlier before being entirely removed. For example: Feature X is present on `0.2` - `0.3`, deprecated on `0.4`, and removed on `0.5`.

## FAQ

### Why is this not on NPM?

The library is currently incomplete, containing old code that has yet to be updated along with the constnatly-changing API. This library will be pulished to NPM when deemed to be "stable enough" for use.

## License

This project is licensed under the MIT License - see [LICENSE](LICENSE)