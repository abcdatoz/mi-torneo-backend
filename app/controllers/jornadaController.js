const db = require('../models')
const Jornada = db.jornada



const { isEmpty } = require('../helpers/validations')
const {status, errorMessage} = require('../helpers/status')



const getJornadas = async (req,res,next ) => {

    const result = await Jornada.findAll({
        order: [
            ['inicia', 'DESC'],            
        ]
    }).catch(next)
  
    return res.status(status.success).send(result)    

}

const getJornadasByTorneo = async (req,res,next) => {

    const result = await Jornada.findAll({
        where: {
            torneoId: req.params.id
        }
    });

    if (result){
        return res.status(status.success).send(result)
    }else{
        errorMessage.error = 'El registro no fue lozalizado'
        return res.status(status.bad).send(errorMessage)
    }
}



const createJornada = async(req,res,next)=> {
    const { nombre, inicia, termina, aviso, torneo }  = req.body
      
    if( isEmpty(nombre) 
        || isEmpty(inicia)        
        || isEmpty(termina)        
        || isEmpty(aviso)                
        || isEmpty(torneo)        
        ){
        errorMessage.error ='Todos los campos son requeridos'
        return res.status(status.bad).send(errorMessage)
    }

    const result =  await Jornada.create({        
        nombre: nombre,
        inicia: inicia,
        termina: termina,
        aviso: aviso,
        status: 'Abierta',
        torneoId: torneo
    }).catch(next)

    
    return res.status(status.success).send(result)
}

const updateJornada = async(req,res,next)=>{
    const { status }  = req.body

    const registro = await Jornada.findByPk(req.params.id).catch(next)
 
    if (registro){
          
        const result = await registro.update({            
            status: status
        }).catch(next)

        return res.status(200).send(result)
    }else{
        return res.status(404)
    }
}
 
const removeJornada = async(req,res,next)=> {
  
    const result = await Jornada.destroy({
        where: {
            id : req.params.id
        }
    }).catch(next)


    return res.status(200).send('El registro ha sido eliminado');  
}

module.exports = {
    getJornadas: getJornadas,    
    getJornadasByTorneo: getJornadasByTorneo,
    createJornada: createJornada,
    updateJornada: updateJornada,    
    removeJornada: removeJornada    
}