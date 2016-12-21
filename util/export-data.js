const fs = require('fs');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;

var client = new MongoClient();
client.connect('mongodb://localhost:27017/BusBot', (err, db) => {
    global.buses = db.collection('buses');

    var filePath = path.join(__dirname, "../data/SBS-Deployments.csv");
    fs.readFile(filePath, (err, data) => {
        data = data.toString();
        var entries = data.split('\n');
        for (let line of entries) {
            var parts = line.split(',');
            if (parts.filter(Boolean).length < 3) continue;
            var data = {
                numberPlate: parts[0].replace(/([A-Z])0+/, '$1') + parts[1],
                model: parts[2],
                bodywork: parts[3],
                make: parts[4],
                status: parts[5],
                depot: parts[6] || 'Not Yet Filled',
                notes: parts[7],
                batch: parts[8],
                eds: parts[9],
                owner: parts[10]
            };
            buses.insert(data);
        }
        console.log('Done');
    });
});
