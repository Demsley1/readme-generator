// require or add the file system module from the node.js website
const fs = require('fs');

// Create a function to write README file
const writeToFile = data => {
    // create a promise object for creating a new readme file using template data.
    return new Promise((resolve, reject) => {
        fs.writeFile('./Dist/readme.md', data, err => {
            if(err){
                reject(err);
                return;
            }
            // message to log if inforamtion is correct
            resolve({
                ok: true,
                message: 'File Created',
            });
        });
    });
}

// export function writetofile()
module.exports = { writeToFile };