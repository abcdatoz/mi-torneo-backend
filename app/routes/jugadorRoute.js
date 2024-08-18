const { authJwt } = require('../middleware')
const x = require('../controllers/jugadorController')


module.exports = function (app){
    app.get('/api/jugador/', x.getJugadores)        
    app.post('/api/jugador/', x.createJugador)    
    app.put('/api/jugador/:id', x.updateJugador)
    app.delete('/api/jugador/:id', x.removeJugador)
}

