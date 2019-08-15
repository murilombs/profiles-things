const test = require('tape');
const azurePhotoSave = require('./azureStoragePhotos').azurePhotoSave;

const dataPhoto = require('./data').data;

function runTest() {
    test('Azure Storage Blob test for Photo', (t) => {
        let picName = azurePhotoSave(dataPhoto);
        t.assert(picName && picName != 'default-product.png', 'Photo saved');
        t.end();
    })
}

module.exports = { runTest }