const { authJwt } = require('../middleware')
const x = require('../controllers/golController')


module.exports = function (app){
    app.get('/api/goles/', x.getGoles)        
    app.post('/api/goles/', x.createGol)    
    app.put('/api/goles/:id', x.updateGol)  
    app.delete('/api/goles/:id', x.removeGol)    
}

