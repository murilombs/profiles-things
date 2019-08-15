require('dotenv-safe').load() // carrega as variaveis globais
require('./model/profiles') // não esqueça o model
require('./config/mongodb.test').runTest() // conexão com o banco
require('./server/server.test').runTest() // inicia o server
require('./repository/repository.test').runTest() // funçoes do repository
require('./azureService/azureStoragePhotos.test').runTest() // teste azure storage
require('./api/api.test').runTest() // API
