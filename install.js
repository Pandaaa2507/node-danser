const fs = require('fs');
const Unzipper = require('unzipper');
const DanserPath = require('./path');
const miniget = require('miniget');
const cp = require('child_process');
const oraImp = import('ora');

oraImp.then(async ora => {
    
    const loader = ora.default({text: 'loading...'}).start();
    
    loader.text = 'checking platform';
    
    if(!['win32', 'linux'].includes(process.platform)) {
        throw `unsupported platform ${process.platform}`;
    }
    
    loader.text = 'removing previous version (if available)';
    fs.rm(`${__dirname}/danser/`, {recursive: true}, () => {});

    try {

        const requestOptions = {headers: {'user-agent': `node-danser/${require('./package.json').version}`}};

        loader.text = 'checking releases';
    
        let releaseReq = await miniget('https://api.github.com/repos/wieku/danser-go/releases', requestOptions);
        let releaseBody = JSON.parse(await releaseReq.text());
            
        let latest = releaseBody.find(r => r.prerelease === false);
        if(!latest) {
            loader.color = 'red';
            loader.text = 'no release found';
            return process.exit(1);
        }

        let releaseAsset = latest.assets.find(a => {
            let platform = a.name.split('-')[2].split('.')[0];
            if(platform === 'win' && process.platform === 'win32' || platform === 'linux' && process.platform === 'linux') {
                return true;
            }
            return null
        });
        if(!releaseAsset) {
            loader.color = 'red';
            loader.text = 'no release asset found';
            return process.exit(1);
        }

        loader.text = `downloading danser v${latest.tag_name}`;

        if(!fs.existsSync(DanserPath)) {
            fs.mkdirSync(DanserPath);
        }

        let dl = await miniget(releaseAsset.browser_download_url, requestOptions);

        let unzip = Unzipper.Extract({path: DanserPath});

        dl.pipe(unzip, {end: true});

        unzip.on('error', () => {
            loader.color = 'red';
            loader.text = 'error while extracting';
            return process.exit(1);
        });

        dl.on('end', () => {
            loader.succeed('danser downloaded!');

            const checker = ora.default({text: 'checking for ffmpeg'});

            let ffmpegCheck = cp.spawn('ffmpeg', ['-version']);

            ffmpegCheck.on('exit', () => checker.succeed('ffmpeg is installed, everything ready!'));
            ffmpegCheck.on('error', () => checker.fail('looks like you dont have ffmpeg installed!'));

        });

    } catch (e) {
        console.log(e);
        loader.color = 'red';
        loader.text = 'failed installing danser';
        return process.exit(1);
    }

});