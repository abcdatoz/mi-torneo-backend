const { authJwt } = require('../middleware')
const x = require('../controllers/jugadorController')


module.exports = function (app){
    app.get('/api/jugadores/', x.getJugadores)        
    app.post('/api/jugadores/', x.createJugador)    
    app.put('/api/jugadores/:id', x.updateJugador)
    app.delete('/api/jugadores/:id', x.removeJugador)
}

