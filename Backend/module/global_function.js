const fs = require("fs")
const path = require("path")

exports.sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
}

exports.deleteImg = (fileName) => {
        const dir = path.join(__dirname, 'public/images/');
        fs.unlink(dir + fileName, (err) => {
                if (err) {
                        console.log(err)
                }

                console.log("Delete File successfully.");
        });
}