const { authJwt } = require('../middleware')
const x = require('../controllers/juegoController')


module.exports = function (app){
    app.get('/api/juegos/', x.getJuegos)        
    app.post('/api/juegos/', x.createJuego)    
    app.put('/api/juegos/:id', x.updateJuego)   
    app.delete('/api/juegos/:id', x.removeJuego)   
}

