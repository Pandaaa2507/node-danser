const Danser = require('./main');

const danser = new Danser({
    SkinsDir: 'G:/osu!/Skins/',
    SongsDir: 'G:/osu!/Songs/',
});

const options = new Danser.Options();
options.setTAG(2);
// options.setReplay("G:\\osu!\\Replays\\Pandaaa - OxT - Clattanoia (TV Size) [KOWARI'S EXTRA] (2021-11-05) Osu.osr");
options.skipIntro();
options.enableRecord(`${__dirname}/renders`);
danser.setOptions(options);

const map = new Danser.Beatmap();
map.setID(3018109);
danser.setBeatmap(map);

danser.start()
.then(() => {

})
.catch(err => {
    console.log(err);
})