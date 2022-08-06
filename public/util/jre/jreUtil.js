const fs = require("fs");
const path = require("path");
const jre = require("./jre");
const log = require('electron-log')

const checkJRE = exports.checkJRE = async () => {
    const dir = fs.existsSync(jre.jreDir());
    
    let installRequired;
    if (dir) {
        const toCheck = [
            jre.driver(),
            path.join(jre.driver(), '..', '..', 'lib', 'rt.jar'),
        ];

        if (process.platform !== 'darwin') {
            toCheck.push(path.join(jre.driver(), '..', '..', 'lib', 'amd64', 'jvm.cfg'));
        }

        const validateFiles = toCheck.every(fs.existsSync);
        if (!validateFiles) installRequired = true;

    } else {
        installRequired = true;
    }

    if (installRequired) {
        log.info('JRE not found. Installing...');
        return new Promise((resolve, reject) => {
            jre.install(resolve);
        });
    }
}

const joinClassPath = exports.joinClassPath = (entries) => {
    return entries.join(jre.platform() === 'windows' ? ';' : ':');
}
