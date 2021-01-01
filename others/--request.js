var fs = require('fs');
var request = require("request");

var src = "https://www.google.com.hk/images/srpr/logo3w.png";

var writeStream = fs.createWriteStream('image.png');
var readStream = request(src)
readStream.pipe(writeStream);
readStream.on('end', function(response) {
    console.log('�ļ�д��ɹ�');
    writeStream.end();
});

writeStream.on("finish", function() {
    console.log("ok");
});