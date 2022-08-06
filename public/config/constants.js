const system = require('os');
const path = require('path');
const node_machine_id = require("node-machine-id");

exports.OFFLINE_PATH = system.homedir() + path.sep + ".ethereal" + path.sep + "offline";
exports.HWID = node_machine_id.machineIdSync();