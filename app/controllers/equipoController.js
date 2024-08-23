const db = require('../models')
const Equipo  = db.equipo
//const Grupo = db.grupo


const { isEmpty } = require('../helpers/validations')
const {status, errorMessage} = require('../helpers/status')



const getEquipos = async (req,res,next ) => {

    const result = await Equipo.findAll({}).catch(next)
  
    return res.status(status.success).send(result)    

}

const getEquiposByTorneo = async (req,res,next) => {

    const result = await Equipo.findAll({
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



const createEquipo = async(req,res,next)=> {
    const { nombre, nombreContacto, telefonoContacto, torneo, grupo }  = req.body
      
    if( isEmpty(nombre) 
        || isEmpty(nombreContacto)                
        || isEmpty(telefonoContacto)        
        || isEmpty(torneo)        
        || isEmpty(grupo)        
        ){
        errorMessage.error ='Todos los campos son requeridos'
        return res.status(status.bad).send(errorMessage)
    }

    const result =  await Equipo.create({        
        nombre: nombre,
        nombre_contacto: nombreContacto,
        correo_contacto: "here@and.now",
        telefono_contacto: telefonoContacto,
        torneoId: torneo,
        grupoId: grupo,
        status: 'alta'
    }).catch(next)

    
    return res.status(status.success).send(result)
}

const updateEquipo = async(req,res,next)=>{
    const { nombre, nombreContacto, telefonoContacto, status }  = req.body

    const registro = await Equipo.findByPk(req.params.id).catch(next)


    if (registro){
          
        const result = await registro.update({            
            nombre: nombre,
            nombre_contacto: nombreContacto,            
            telefono_contacto: telefonoContacto,
            status: status
        }).catch(next)

        return res.status(status.success).send(result)
    }else{
        return res.status(status.nocontent)
    }
}

 
const removeEquipo = async(req,res,next)=> {
  
    const { count, rows } = await Equipo.findAndCountAll({
        where: { equipoId: req.params.id},
        offset: 10,
        limit: 2
      });

    

    if (count > 0 ){

        

        return res.status(status.bad).send({
            message: "no se puede eliminar porque tiene equipos registrados"
        })

    }else{
        const result = await Equipo.destroy({
            where: {
                id : req.params.id
            }
        }).catch(next)


        return res.status(200).send('El registro ha sido eliminado');  
    }
}

module.exports = {
    getEquipos: getEquipos,    
    getEquiposByTorneo: getEquiposByTorneo,
    createEquipo: createEquipo,
    updateEquipo: updateEquipo,
    removeEquipo: removeEquipo    
}