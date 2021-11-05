const fs = require('fs');

const DanserPath = require('../path');
const Start = require('./Start');
const Beatmap = require('./Beatmap');
const Options = require('./Options');

const DefaultSettingsName = 'node-danser';

const DanserOptions = {
    nodbcheck: false,
    debug: false,
    settingsName: DefaultSettingsName,
    SongsDir: '',
    SkinsDir: '',
};

class Danser {

    /**
     * Creates a danser client
     * @param {DanserOptions} ClientOptions The options for the client
     */
    constructor(ClientOptions) {
        ClientOptions.settingsName = ClientOptions.settingsName || DefaultSettingsName;
        this.clientOptions = ClientOptions = ClientOptions || {};
        this.beatmap = null;
        this.options = null;

        fs.rm(`${DanserPath}/videos/`, {recursive: true}, () => {});

        let settingsFile = `${DanserPath}/settings/${DefaultSettingsName}.json`;
        let json = {};
        if(fs.existsSync(settingsFile)) {
            json = JSON.parse(fs.readFileSync(settingsFile))
        } else {
            json = {General: {}};
        }
        if(ClientOptions.SongsDir) {
            json.General.OsuSongsDir = ClientOptions.SongsDir;
        }
        if(ClientOptions.SkinsDir) {
            json.General.OsuSkinsDir = ClientOptions.SkinsDir;
        }
        fs.writeFileSync(settingsFile, JSON.stringify(json, null, 4));
    }

    /**
     * Start danser
     */
    start() {
        return new Promise((res, rej) => {

            if(!this.options) {
                return rej('No options set');
            }

            Start(this.clientOptions, this.options, this.beatmap);

        });
    }

    /**
     * Set the client beatmap
     * @param {Beatmap} BeatmapData The beatmap to use
     * @returns {Danser}
     */
    setBeatmap(BeatmapData) {
        this.beatmap = BeatmapData;
    }

    /**
     * Set the client options
     * @param {Options} OptionsData The options to use
     * @returns {Danser}
     */
    setOptions(OptionsData) {
        this.options = OptionsData;
    }

}

module.exports = Danser;
