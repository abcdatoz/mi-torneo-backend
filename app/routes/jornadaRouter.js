const { authJwt } = require('../middleware')
const x = require('../controllers/jornadaController')


module.exports = function (app){
    app.get('/api/jornada/', x.getJornadas)        
    app.post('/api/jornada/', x.createJornada)        
    app.delete('/api/jornada/:id', x.removeJornada)
}

