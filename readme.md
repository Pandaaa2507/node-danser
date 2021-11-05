# Node Danser
A simple and easy to use wrapper arround [Wieku/danser-go](https://github.com/Wieku/danser-go)


### Example of rendering a Beatmap
```js
const Danser = require('node-danser');

const danser = new Danser();

const map = new Danser.Beatmap();
map.setID(3018109);
danser.setBeatmap(map);

const options = new Danser.Options();
options.enableRecord(`/some/random/folder`);
danser.setOptions(options);

```
*you of course need to have the beatmap downloaded*