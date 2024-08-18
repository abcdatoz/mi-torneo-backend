const db = require('../models')
const Torneo = db.torneo

const { isEmpty } = require('../helpers/validations')
const {status, successMessage, errorMessage} = require('../helpers/status')

const fs = require('fs')
const path = require ('path')

const getTorneos = async (req,res,next ) => {

    const result = await Torneo
                            .findAll({
                                where: {status: "alta"}
                            })
                            .catch(next)
  
    return res.status(status.success).send(result)    

}


const createTorneo = async(req,res,next)=> {
    const {localidad, nombre}  = req.body

	  
    if( isEmpty(nombre) ){
        errorMessage.error ='El nombre es un campo requerido'
        return res.status(status.bad).send(errorMessage)
    }

    if( isEmpty(localidad) ){
        errorMessage.error ='La localidad es un campo requerida'
        return res.status(status.bad).send(errorMessage)
    }

    
    const result =  await Torneo.create({
        nombre: nombre,
        localidad: localidad,
        imagen: req.file.filename,
        status: 'alta',
        user_owner: 0
    }).catch(next)

    
    return res.status(status.success).send(result)
}

const updateTorneo = async(req,res,next)=>{
    const {nombre, localidad}  = req.body

    const registro = await Torneo.findByPk(req.params.id).catch(next)

 

    if (registro){
 
        
        let ruta = path.resolve()
        ruta = ruta + '\\public\\uploads\\' + registro.imagen
         
        const result = await registro.update({
            nombre: nombre,
            localidad: localidad,            
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

const statusBaja = async(req,res,next)=>{
    

    const registro = await Torneo.findByPk(req.params.id).catch(next)

    if (registro){
        
        const result = await registro.update({
            status: 'baja'            
        }).catch(next)        

        return res.status(status.success).send(result)
    }else{
        return res.status(status.nocontent)
    }
}



module.exports = {
    getTorneos: getTorneos,
    createTorneo: createTorneo,
    updateTorneo: updateTorneo,
    statusBaja: statusBaja
}

