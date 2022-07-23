const fs = require("fs");
const jre = require("node-jre");

const checkJRE = exports.checkJRE = async () => {
    const directory = fs.existsSync(jre.jreDir());
    const jreDriver = fs.existsSync(jre.driver());
    
    if (!directory || !jreDriver) {
        return new Promise((resolve, reject) => {
            jre.install(resolve);
        });
    }
}

const joinClassPath = exports.joinClassPath = (entries) => {
    return entries.join(jre.platform() === 'windows' ? ';' : ':');
}
