const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const bodyParser = require('body-parser')

var server = null

function start(api, repository, callback) {
    const app = express()
    app.use(morgan('dev'))
    app.use(helmet())
    app.use((err, req, res, next) => {
        callback(new Error('Something went wrong, err ' + err), null)
        res.status(500).send('Something went wrong')
    })
    app.use(bodyParser.json())
    api(app, repository)
    server = app.listen(process.env.PORT, () => callback(null, server))
}

function stop() {
    if (server) server.close()
    return true
}

module.exports = { start, stop }
