const { authJwt } = require('../middleware')
const x = require('../controllers/equipoFotoController')

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
    app.get('/api/fotoequipos/', x.getFotosEquipos)    
    app.post('/api/fotoequipos/',  [upload.single('imagen')], x.cargarFotoEquipo)    
    app.put('/api/fotoequipos/:id',[upload.single('imagen')], x.updateFotoEquipo)   
    app.delete('/api/fotoequipos/:id', x.removeFoto) 
}

