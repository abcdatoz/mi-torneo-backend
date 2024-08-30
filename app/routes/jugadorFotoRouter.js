const { authJwt } = require('../middleware')
const x = require('../controllers/jugadorFotoController')

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
    app.get('/api/fotojugadores/', x.getFotosJugadores)    
    app.post('/api/fotojugadores/',  [upload.single('imagen')], x.cargarFotoJugador)    
    app.put('/api/fotojugadores/:id',[upload.single('imagen')], x.updateFotoJugador)   
    app.delete('/api/fotojugadores/:id', x.removeFoto) 
}

