const test = require('tape')
const server = require('./server')

function apiMock() {
    console.log('Do nothing')
}

function runTest() {
    test('Start Server', (t) => {
        server.start(apiMock, null, (err, start) => {
            t.assert(!err && start, 'Server start')
            t.end()
        })
    })

    test('Stop Server', (t) => {
        t.assert(server.stop(), 'Server Stop')
        t.end()
    })
}

module.exports = { runTest }