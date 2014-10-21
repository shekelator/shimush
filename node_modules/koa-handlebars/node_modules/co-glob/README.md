
# co-glob

[`glob`](https://github.com/isaacs/node-glob) wrapped functions that return thunks
for [co](https://github.com/visionmedia/co).

## Installation

```
$ npm install co-glob
```

## Example

Use all the regular async fs functions without callback hell:

```js
var files = yield glob('*');
var moreFiles = yield glob('*', { dot: true });
```

## License

MIT
