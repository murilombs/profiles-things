require('dotenv-safe').load()
const server = require('./server/server')
require('./model/profiles')
const repository = require('./repository/repository')
const api = require('./api/api')

server.start(api, repository, (err, app) => {
    console.log('Server iniciado')
})
