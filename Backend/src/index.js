const path = require('path')
const app = require('./app')
const http = require('http')
const server = http.createServer(app)
const port = 3000 || process.env.port

server.listen(port, () => {
    console.log('listening to port' + port)
})

