const test = require('tape')
const supertest = require('supertest')
const api = require('./api')
const server = require('../server/server')
const repository = require('../repository/repository')

const data = require('../repository/data').dataUp

function runTest() {
    let app = null

    server.start(api, repository, (err, app) => {
        let id = '5d03d78a5bd0a9485018825b'

        /** Testa a chamada do user pelo ID */
        test('GET | /user/:id', (t) => {
            supertest(app)
            .get('/users/' + id)
            .expect(200)
            .end((err, res) => {
                t.error(err, 'No errors')
                t.assert(res, 'User retorned')
                t.end()
            })
        })
        /** testa a criação de uma nova conta */
        test('POST | /user/', (t) => {
            supertest(app)
            .post('/users/')
            .send(data)
            .expect(201)
            .end((err, res) => {
                t.error(err, 'No errors')
                t.assert(res, 'User created')
                t.end()
            })
        })
        /** testa a atualização de um registro */
        test('PUT | /user/:id', (t) => {
            supertest(app)
            .put('/users/' + id)
            .expect(201)
            .end((err, res) => {
                t.error(err, 'No errors')
                t.assert(res, 'User updated')
                t.end()
            })
        })
    })
}

module.exports = { runTest }