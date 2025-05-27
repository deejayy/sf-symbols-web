const fs = require('fs');
const xml2js = require('xml2js');

function loadAndParsePlist(filePath) {
    const xmlData = fs.readFileSync(filePath, 'utf8');
    const parser = new xml2js.Parser();

    return new Promise((resolve, reject) => {
        parser.parseString(xmlData, (err, result) => {
            if (err) {
                reject(err);
            } else {
                const parsedData = {};
                const dict = result.plist.dict[0];
                const keys = dict.key;
                const values = dict.array;

                keys.forEach((key, index) => {
                    parsedData[key] = values[index].string;
                });

                resolve(parsedData);
            }
        });
    });
}

loadAndParsePlist('./search.plist')
    .then(data => console.log(JSON.stringify(data, null, 2)))
    .catch(err => console.error(err));
