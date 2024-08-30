const db = require('../models')
const JugadorFoto = db.jugadorFoto

const { isEmpty } = require('../helpers/validations')
const {status, successMessage, errorMessage} = require('../helpers/status')

const fs = require('fs')
const path = require ('path')

const getFotosJugadores = async (req,res,next ) => {

    const result = await JugadorFoto
                            .findAll()
                            .catch(next)
  
    return res.status(status.success).send(result)    

}


const cargarFotoJugador = async(req,res,next)=> {
    const {jugador}  = req.body

	  
    if( isEmpty(jugador) ){
        errorMessage.error = 'No indico el jugador al que corresponde la foto'
        return res.status(status.bad).send(errorMessage)
    }
    
    const result =  await JugadorFoto.create({
        jugadorId: jugador,        
        imagen: req.file.filename
    }).catch(next)

    
    return res.status(status.success).send(result)
}

const updateFotoJugador = async(req,res,next)=>{
    const {jugador}  = req.body

    const registro = await JugadorFoto.findByPk(req.params.id).catch(next)

 

    if (registro){
 
        
        let ruta = path.resolve()
        ruta = ruta + '\\public\\uploads\\' + registro.imagen
         
        const result = await registro.update({            
            imagen: req.file.filename,
        }).catch(next)

        
        

        try {
            fs.unlinkSync(ruta);
        } catch (e) {}
    


        return res.status(status.success).send(result)
    }else{
        return res.status(status.nocontent)
    }
}


const removeFoto = async(req,res,next)=> {

    const registro = await JugadorFoto.findByPk(req.params.id).catch(next)  

    if (registro){
 
        
        let ruta = path.resolve()
        ruta = ruta + '\\public\\uploads\\' + registro.imagen
         
        const result = await registro.destroy().catch(next)
        
        try {
            fs.unlinkSync(ruta);
        } catch (e) {}    


        return res.status(status.success).send(result)
    }else{
        return res.status(status.nocontent)
    }
    
}




module.exports = {
    getFotosJugadores: getFotosJugadores,
    cargarFotoJugador: cargarFotoJugador,
    updateFotoJugador: updateFotoJugador,
    removeFoto: removeFoto
}

