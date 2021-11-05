const Beatmap = require('./Beatmap');
const Options = require('./Options');
const LogParser = require('./LogParser');

const cp = require('child_process');
const fs = require('fs');

const DanserPath = require('../path');
const Executeable = `${DanserPath}danser${process.platform === 'win32' ? '.exe' : ''}`;

const defaultBanned = ['record'];

/**
 * Starts a danser process
 * @param {Options} options The options to use
 * @param {Beatmap} beatmap The beatmap to use
 */
module.exports = async function(clientOptions, options, beatmap) {

    console.log('\n');
    let Logger = await LogParser();

    let args = [`-settings=${clientOptions['settingsName']}`];
    let job = {};

    let optionKeys = Object.keys(options);
    for(let i = 0; i < optionKeys.length; i++) {
        let value = options[optionKeys[i]];
        switch(optionKeys[i]) {
            case 'outputFolder': {
                if(options.record === true && typeof value === 'string') {
                    args.push(`-record`);
                    job['record'] = value;
                } else {
                    Logger.warnAndQuit('used enableRecord() without proper arguments!');
                }
                break;
            }
            default: {
                if(defaultBanned.includes(optionKeys[i])) {
                    break;
                } else if(typeof value === 'boolean' && value === true) {
                    args.push(`-${optionKeys[i]}`);
                } else if(typeof value === 'string' && value.length !== 0) {
                    args.push(`-${optionKeys[i]}=${value}`);
                } else if(typeof value === 'number' && value !== -1) {
                    args.push(`-${optionKeys[i]}=${value}`);
                }
            }
        }
    }

    let beatmapKeys = Object.keys(beatmap);
    for(let i = 0; i < beatmapKeys.length; i++) {
        let value = beatmap[beatmapKeys[i]];
        if(value) {
            args.push(`-${beatmapKeys[i]}=${value}`);
        }
    }

    const proc = cp.spawn(Executeable, args);

    proc.stdout.on('data', Logger.handler);

    proc.on('exit', () => {
        Logger.onQuit();

        if(job['record']) {
            let files = fs.readdirSync(`${DanserPath}/videos/`);
            let mp4files = files.filter(f => !fs.statSync(`${DanserPath}/videos/${f}`).isDirectory() && f.endsWith('.mp4'));
            for(let i = 0; i < mp4files.length; i++) {
                fs.renameSync(`${DanserPath}/videos/${mp4files[i]}`, `${job['record']}/${mp4files[i]}`);
            }
        }

    });

}