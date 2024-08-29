const path = require('path');
const fs = require('fs');

const Exists = (filname) => {
    const filepath = path.join(__dirname, filname);
    if(fs.existsSync(filepath)) {
        return true;
    }
    return false;
}

module.exports = Exists;