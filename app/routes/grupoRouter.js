const { authJwt } = require('../middleware')
const x = require('../controllers/grupoController')


module.exports = function (app){
    app.get('/api/grupos/', x.getGrupos)        
    app.post('/api/grupos/', x.createGrupo)    
    app.put('/api/grupos/:id', x.updateGrupo)
    app.delete('/api/grupos/:id', x.removeGrupo)
}

