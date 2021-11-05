const ValueTypes = 'cs' || 'ar' || 'od' || 'hp';

class Options {
    constructor() {
        this.cursors = -1;
        this.tag = -1;
        this.speed = -1;
        this.pitch = 1;
        this.play = false;
        this.skip = false;
        this.start = -1;
        this.end = false;
        this.knockout = false;
        this.replayFolder = '';
        this.record = false;
        this.outputFolder = '';
        this.outputName = '';
        this.replay = '';
        this.mods = '';
        this.skin = '';
        this.cs = -1,
        this.ar = -1;
        this.od = -1;
        this.hp = -1;
        this.nodbcheck = false;
        this.ss = -1;
        this.quickstart = false;
    }

    /**
     * The number of cursors used in mirror collage
     * @param {Number} CursorCount The cursor count
     * @returns {Options}
     */
    setCursors(CursorCount) {
        this.cursors = CursorCount;
    }

    /**
     * The number of cursors in TAG mode
     * @param {Number} CursorCount The cursor count
     * @returns {Options}
     */
    setTAG(CursorCount) {
        this.tag = CursorCount;
    }

    /**
     * The playback speed multiplier
     * @param {Number} Speed The speed multiplier
     * @returns {Options}
     */
    setSpeed(Speed) {
        this.speed = Speed;
    }

    /**
     * The playback pitch multiplier
     * @param {Number} Pitch The pitch multiplier
     * @returns {Options}
     */
    setPitch(Pitch) {
        this.pitch = Pitch;
    }

    /**
     * Play througth the map like in osu!standard mode
     */
    enablePlay() {
        this.play = true;
    }

    /**
     * Skips the map's intro like in osu!
     */
    skipIntro() {
        this.skip = true;
    }

    /**
     * Start the map on the given time
     * @param {Number} Timestamp The time in seconds
     * @returns {Options}
     */
    setStart(Timestamp) {
        this.start = Timestamp;
    }

    /**
     * End the map on the given time
     * @param {Number} Timestamp The time in seconds
     * @returns {Options}
     */
    setEnd(Timestamp) {
        this.end = Timestamp;
    }

    /**
     * Enables knockout mode
     * @param {String} replayFolderPath The folder of the replays
     */
    enableKnockout(replayFolderPath) {
        this.knockout = true;
        this.replayFolder = `${replayFolderPath}`.split('\\').join('/');
    }

    /**
     * Enables recording mode
     * @param {String} OutputFolder The folder to save the 
     */
    enableRecord(OutputFolder) {
        this.record = true;
        this.outputFolder = `${OutputFolder}`.split('\\').join('/');
    }

    /**
     * Changes the output file name
     * @param {String} OutputFileName The output file name to use 
     */
    setOutput(OutputFileName) {
        this.outputName = `${OutputFileName}`.split('\\').join('/');
    }

    /**
     * Set the replay to render
     * @param {String} ReplayPath The full path of the replay to render
     */
    setReplay(ReplayPath) {
        this.replay = `${ReplayPath}`.split('\\').join('/');
    }

    /**
     * Set mods for cursordance
     * @param {Array<String>|String} Mods A string or array of osu! Mods
     */
    setMods(Mods) {
        if(Array.isArray(Mods)) {
            Mods = Mods.join('');
        }
        this.mods = Mods;
    }

    /**
     * Set the skin
     * @param {String} SkinName The skin name
     */
    setSkin(SkinName) {
        this.skin = SkinName;
    }

    /**
     * Update the map's difficulty settings
     * @param {ValueTypes} Setting The map setting to change
     * @param {Number} NewValue The new value for the setting
     */
    overwriteSetting(Setting, NewValue) {
        if(ValueTypes.includes(Setting)) {
            this[Setting] = NewValue;
        }
    }

    /**
     * Skips updating the database with new, changed or deleted beatmaps
     */
    disableDatabaseCheck() {
        this.nodbcheck = true;
    } 

    /**
     * Take a screenshot on the given time
     * @param {Number} Timestamp The time in seconds
     * @returns {Options}
     */
    screenshot(Timestamp) {
        this.ss = Timestamp;
    }

    /**
     * Enables quickstart
     */
    enableQuickstart() {
        this.quickstart = true;
    }

}

module.exports = Options;
