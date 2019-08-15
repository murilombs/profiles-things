const azure = require('azure-storage');
const guid = require('guid');

const regex = /^data:([A-Za-z-+\/]+);base64,(.+)$/;

/**
 * Salva a imagem na Azure Storage
 * recebe a string da imagem 
 * retornando uma promisse
 */
async function azurePhotoSave(profilePicture) {
    let picName = guid.raw() + '.jpg';
    let matches = profilePicture.match(regex);
    let type = matches[1];
    let buffer = new Buffer.from(matches[2], 'base64');
    
    //azure-storage
    const azureSrv = azure.createBlobService(process.env.CONNECTION_AZURE);
    //upload da foto
    await azureSrv.createBlockBlobFromText('profile-pictures', picName , buffer, { 
        contentType: type
    },function (error, result, response) {
        if (error) {
            picName = 'default-product.png';
            console.log(error);
        } else {
            console.log(result);
        }
    });
    return picName;   
}

module.exports = { azurePhotoSave }