const test = require('tape')
const repository = require('./repository')
const data = require('./data').data

function runTest() {
    let id = '5d03d78a5bd0a9485018825b'
    let upData = {
        name: 'new name',
        profilePicture: 'new url'
    }

    /** usuario unico retornado pelo ID unico */
    test('repository GetByID', (t) => {
        if (!id) {
            t.assert(false, 'User by ID returned')
            t.end()
            return
        }
        repository.getByID(id, (err, user) => {
            t.assert(!err && user, 'User by ID returned')
            t.end()
        })
    })

    /** novo usuario salvo na base */
    test('Repository create', (t) => {
        repository.create(data, err => {
            t.assert(!err, 'New profile saved')
            t.end()
        })
    })

    /** update das informações do user */
    test('Repository updateProfileByID', (t) => {
        if (!id) {
            t.assert(false, 'User not found')
            t.end()
            return
        }
        repository.updateProfileByID(id, upData, err => {
            t.assert(!err, 'user information updated')
            t.end()
        })
    })

    /** conexão encerrada */
    test('Repository Disconnect', (t) => {
        t.assert(repository.disconnect(), 'Disconnect OK')
        t.end()
    })
}

module.exports = { runTest }