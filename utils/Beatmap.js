class Beatmap {
    constructor() {
        this.id = 0;
        this.md5 = '';
        this.artist = '';
        this.title = '';
        this.difficulty = '';
        this.creator = '';
    }

    /**
     * Set the Beatmap ID (overwrites all other options)
     * @param {Number} BeatmapID The BeatmapID (not BeatmapSetID!)
     * @returns {Beatmap}
     */
    setID(BeatmapID) {
        this.id = BeatmapID;

        this.md5 = '';
        this.artist = '';
        this.title = '';
        this.difficulty = '';
        this.creator = '';
    }

    /**
     * Set the beatmap md5-hash (overwrites all other options)
     * @param {String} BeatmapHash The md5-hash of the beatmap
     * @returns {Beatmap}
     */
    setMD5(BeatmapHash) {
        this.md5 = BeatmapHash;

        this.id = 0;
        this.artist = '';
        this.title = '';
        this.difficulty = '';
        this.creator = '';
    }

    /**
     * Set the Beatmap Artist (overwrites id & md5 options)
     * @param {String} BeatmapArtist The name of the song artist
     * @returns {Beatmap}
     */
    setArtist(BeatmapArtist) {
        this.artist = BeatmapArtist;

        this.md5 = '';
        this.id = 0;
    }

    /**
     * Set the Beatmap Title (overwrites id & md5 options)
     * @param {String} BeatmapTitle The name of the song
     * @returns {Beatmap}
     */
    setTitle(BeatmapTitle) {
        this.title = BeatmapTitle;
        
        this.md5 = '';
        this.id = 0;
    }

    /**
     * Set the Beatmap Difficulty (overwrites id & md5 options)
     * @param {String} BeatmapDifficulty The name of the difficulty
     * @returns {Beatmap}
     */
    setDifficulty(BeatmapDifficulty) {
        this.difficulty = BeatmapDifficulty;

        this.md5 = '';
        this.id = 0;
    }

    /**
     * Set the Beatmap Creator (overwrites id & md5 options)
     * @param {String} BeatmapCreator The name of the beatmap creator
     * @returns {Beatmap}
     */
    setCreator(BeatmapCreator) {
        this.creator = BeatmapCreator;

        this.md5 = '';
        this.id = 0;
    }

}

module.exports = Beatmap;
