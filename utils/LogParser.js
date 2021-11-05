const oraImp = import('ora');

module.exports = async function() {

    let ora = await oraImp;

    const loader = ora.default({text: 'loading...'}).start();

    global.lastData = {message: '', type: 'info'};

    return {
        getLastMessage: () => lastMessage,
        warnAndQuit(message) {
            loader.text = message;
            loader.warn(message);
            process.exit(1);
        },
        handler(chunk) {
            let InitArgs = `${chunk}`.split(' ');
            InitArgs.splice(0, 2); // Remove Date and Time
            let message = lastData.message = InitArgs.join(' ');
    
            if(message.startsWith('DatabaseManager: ')) {
                let importMessage = message.split(': ');
                
                if(importMessage[1].startsWith('New beatmap found:')) {
                    loader.text = `Beatmap found: ${importMessage[2]}`;
                } else if(importMessage[1].startsWith('Imported beatmaps')) {
                    loader.text = importMessage[1].split('. ')[0];
                } else if(importMessage[1].startsWith('Import') && importMessage.length === 3) {
                    let importInfo = importMessage[2].split(' ');
    
                    let beatmapID = importInfo.shift();
                    let beatmapName = importInfo.join(' ').split('\\')[0];
    
                    loader.text = `Importing Beatmap: ${beatmapID} | ${beatmapName}`;
                } else if(importMessage[1].startsWith('Load')) {
                    loader.text = importMessage[1];
                }
            } else if(message.startsWith('Beatmap')) {
                loader.text = message;
                if(message.endsWith('closing...\n')) {
                    lastData.type = 'fail';
                }
            } else if(message.startsWith('Playing: ')) {
                loader.succeed(message);
            } else if(message.startsWith('Progress: ')) {
                loader.start();
                loader.text = `Render ${message}`;
            } else if(message === 'Finished.') {
                loader.succeed(message);
            }
        },
        onQuit() {
            loader[lastData.type](lastData.message);
        }
    };
};
