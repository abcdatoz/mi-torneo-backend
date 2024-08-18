const db = require('../models')
const Grupo = db.grupo
const Equipo  = db.equipo


const { isEmpty } = require('../helpers/validations')
const {status, errorMessage} = require('../helpers/status')



const getGrupos = async (req,res,next ) => {

    const result = await Grupo.findAll({}).catch(next)
  
    return res.status(status.success).send(result)    

}

const getGrupoByTorneo = async (req,res,next) => {

    const result = await Grupo.findAll({
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



const createGrupo = async(req,res,next)=> {
    const { nombre, torneo }  = req.body
      
    if( isEmpty(nombre) 
        || isEmpty(torneo)        
        ){
        errorMessage.error ='Todos los campos son requeridos'
        return res.status(status.bad).send(errorMessage)
    }

    const result =  await Grupo.create({        
        nombre: nombre,
        torneoId: torneo
    }).catch(next)

    
    return res.status(status.success).send(result)
}

const updateGrupo = async(req,res,next)=>{
    const {nombre}  = req.body

    const registro = await Grupo.findByPk(req.params.id).catch(next)


    if (registro){
          
        const result = await registro.update({            
            nombre: nombre
        }).catch(next)

        return res.status(status.success).send(result)
    }else{
        return res.status(status.nocontent)
    }
}

 
const removeGrupo = async(req,res,next)=> {
  
    const { count, rows } = await Equipo.findAndCountAll({
        where: { grupoId: req.params.id},
        offset: 10,
        limit: 2
      });

    

    if (count > 0 ){

        

        return res.status(status.bad).send({
            message: "no se puede eliminar porque tiene equipos registrados"
        })

    }else{
        const result = await Grupo.destroy({
            where: {
                id : req.params.id
            }
        }).catch(next)


        return res.status(200).send('El registro ha sido eliminado');  
    }
}

module.exports = {
    getGrupos: getGrupos,    
    getGrupoByTorneo: getGrupoByTorneo,
    createGrupo: createGrupo,
    updateGrupo: updateGrupo,
    removeGrupo: removeGrupo    
}