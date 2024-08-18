const { authJwt } = require('../middleware')
const x = require('../controllers/torneoController')

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
    app.get('/api/torneos/', x.getTorneos)    
    // app.post('/api/torneos/',  [authJwt.verifyToken, upload.single('imagen')], x.createTorneo)
    // app.put('/api/torneos/:id',[authJwt.verifyToken, upload.single('imagen')], x.updateTorneo)
    
    app.post('/api/torneos/',  [upload.single('imagen')], x.createTorneo)    
    app.put('/api/torneos/:id',[upload.single('imagen')], x.updateTorneo)
    app.delete('/api/torneos/:id',[authJwt.verifyToken],x.statusBaja)
}

