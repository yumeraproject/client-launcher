const system = require('os');
const path = require('path');
const node_machine_id = require("node-machine-id");

exports.OFFLINE_PATH = path.join(system.homedir(), ".ethereal", "offline");
exports.HWID = node_machine_id.machineIdSync();


const resolveDefaultMinecraftDirectory = () => {
    switch (system.type()) {
        case 'win32':
        case 'Windows_NT':
            return path.join(process.env.APPDATA, '.minecraft');
        case 'Darwin':
            return path.join(system.homedir(), '/Library/Application Support/minecraft');
        default:
            return path.join(system.homedir(), '.minecraft');
    }
}
exports.DEFAULT_MINECRAFT_DIRECTORY = resolveDefaultMinecraftDirectory();