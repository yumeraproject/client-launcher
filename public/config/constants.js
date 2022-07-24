const system = require('os');
const path = require('path');

exports.OFFLINE_PATH = system.homedir() + path.sep + ".ethereal" + path.sep + "offline";