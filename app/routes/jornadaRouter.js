const { authJwt } = require('../middleware')
const x = require('../controllers/jornadaController')


module.exports = function (app){
    app.get('/api/jornadas/', x.getJornadas)        
    app.post('/api/jornadas/', x.createJornada)        
    app.put('/api/jornadas/:id', x.updateJornada)
    app.delete('/api/jornadas/:id', x.removeJornada)
}

