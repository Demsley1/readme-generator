const fs = require('fs');

// TODO: Create a function to write README file
const writeToFile = data => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./dist/readme.md', data, err => {
            if(err){
                reject(err);
                return;
            }
            resolve({
                ok: true,
                message: 'File Created',
            });
        });
    });
}

module.exports = { writeToFile };