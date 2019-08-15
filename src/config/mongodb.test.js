const mongodb = require('./mongodb')
const test = require('tape')

function runTest() {
    test('MongoDB Connection', (t) => {
        mongodb.connect((err, conn) => {
            t.assert(conn, 'connection established')
            t.end()
        })
    })

    test('MongoDB Disconected', (t) => {
        t.assert(mongodb.disconnect(), 'Disconnected')
        t.end()
    })
}

module.exports = { runTest }