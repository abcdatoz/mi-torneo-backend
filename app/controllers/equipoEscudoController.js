const db = require('../models')
const EquipoEscudo = db.equipoEscudo

const { isEmpty } = require('../helpers/validations')
const {status, successMessage, errorMessage} = require('../helpers/status')

const fs = require('fs')
const path = require ('path')

const getEscudosEquipos = async (req,res,next ) => {

    const result = await EquipoEscudo
                            .findAll()
                            .catch(next)
  
    return res.status(status.success).send(result)    

}


const cargarEscudoEquipo = async(req,res,next)=> {
    const {equipo}  = req.body

	  
    if( isEmpty(equipo) ){
        errorMessage.error = 'No indico el equipo al que corresponde la foto'
        return res.status(status.bad).send(errorMessage)
    }
    
    const result =  await EquipoEscudo.create({
        equipoId: equipo,        
        imagen: req.file.filename
    }).catch(next)

    
    return res.status(status.success).send(result)
}

const updateEscudoEquipo = async(req,res,next)=>{
    const {equipo}  = req.body

    const registro = await EquipoEscudo.findByPk(req.params.id).catch(next)

 

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

const destroyEscudo = async(req,res,next)=> {

    const registro = await EquipoEscudo.findByPk(req.params.id).catch(next)  

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
    getEscudosEquipos: getEscudosEquipos,
    cargarEscudoEquipo: cargarEscudoEquipo,
    updateEscudoEquipo: updateEscudoEquipo,
    destroyEscudo: destroyEscudo
}

