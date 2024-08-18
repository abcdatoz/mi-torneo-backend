const { authJwt } = require('../middleware')
const x = require('../controllers/juegoController')


module.exports = function (app){
    app.get('/api/juego/', x.getJuegos)        
    app.post('/api/juego/', x.createJuego)    
    app.put('/api/juego/:id', x.updateJuego)    
}

