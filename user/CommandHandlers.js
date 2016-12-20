const numberPlateUtils = require('./checksumutils');

module.exports = {
    lookup: args => {
        args.forEach(numberPlate => {
            buses.find({
                numberPlate: numberPlate.toUpperCase()
            }).limit(1).next((err, bus) => {
                if (!bus) {
                    api.sendMessage('Could not find bus ' + numberPlate);
                    return;
                } else {
                    delete bus._id;
                    api.sendMessage(`Details of ${numberPlate.toUpperCase()}:\n ${JSON.stringify(bus, null, 4)}`);
                }
            });
        });
    },
    calculateChecksum: args => {
        if (args.length !== 1) {
            api.sendMessage('Please send only 1 numberplate');
        } else {
            api.sendMessage(`The checksum digit for ${args} is ${numberPlateUtils.calculateChecksum(args[0].toUpperCase())}`);
        }
    },
    commands: args => {
        var commands = "Commands: ";
        for (var command in module.exports) {
            if (module.exports.hasOwnProperty(command)) {
                commands += command + " ";
            }
        }
        api.sendMessage(commands);
    }
}
