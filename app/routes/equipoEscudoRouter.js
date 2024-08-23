const { authJwt } = require('../middleware')
const x = require('../controllers/equipoEscudoController')

let multer = require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '.jpg') //Appending .jpg
    }
  })

var upload = multer({ storage: storage });


module.exports = function (app){
    app.get('/api/escudoequipos/', x.getEscudosEquipos)    
    app.post('/api/escudoequipos/',  [upload.single('imagen')], x.cargarEscudoEquipo)    
    app.put('/api/escudoequipos/:id',[upload.single('imagen')], x.updateEscudoEquipo)    
    app.delete('/api/escudoequipos/:id', x.destroyEscudo)
}

