const fs = require("fs");
const path = require("path");
const setting = require('../common/setting');

exports.saveFile = (file, id) => {
    const avatarExtension = file.originalname.split('.').pop();
    const newFileName = id.concat('.', avatarExtension);
    fs.renameSync(file.path, path.resolve("src/public/images/", newFileName));
    return newFileName;
}

exports.saveCertificate = (cert, id) => {
    const certExtension = cert.originalname.split('.').pop();
    const newFileName = id.concat('_certificate.', certExtension);
    fs.renameSync(cert.path, path.resolve("src/public/images/", newFileName));
    return newFileName;
}

exports.unlinkFile = (file) => {
    if(file === setting.DEFAULT_AVATAR) return;
    else fs.unlink("src/public/images/"+ file,()=>{});
}