const { authJwt } = require('../middleware')
const x = require('../controllers/equipoController')


module.exports = function (app){
    app.get('/api/equipos/', x.getEquipos)        
    app.get('/api/equipos/:id', x.getEquiposByTorneo)
    app.post('/api/equipos/', x.createEquipo)    
    app.put('/api/equipos/:id', x.updateEquipo)
    app.delete('/api/equipos/:id', x.removeEquipo)
}

