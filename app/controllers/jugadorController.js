const db = require('../models')
const Jugador = db.jugador
const Equipo  = db.equipo


const { isEmpty } = require('../helpers/validations')
const {status, errorMessage} = require('../helpers/status')



const getJugadores = async (req,res,next ) => {

    const result = await Jugador.findAll({}).catch(next)
  
    return res.status(status.success).send(result)    

}




const createJugador = async(req,res,next)=> {
    const { nombre, torneo, equipo }  = req.body
      
    if( isEmpty(nombre) 
        || isEmpty(torneo)        
        || isEmpty(equipo)        
        ){
        errorMessage.error ='Todos los campos son requeridos'
        return res.status(status.bad).send(errorMessage)
    }

    const result =  await Jugador.create({        
        nombre: nombre,
        status: 'alta',
        torneoId: torneo,
        equipoId: equipo
    }).catch(next)

    
    return res.status(status.success).send(result)
}

const updateJugador = async(req,res,next)=>{
    const {nombre}  = req.body

    const registro = await Jugador.findByPk(req.params.id).catch(next)


    if (registro){
          
        const result = await registro.update({            
            nombre: nombre
        }).catch(next)

        return res.status(status.success).send(result)
    }else{
        return res.status(status.nocontent)
    }
}

 
const removeJugador = async(req,res,next)=> {
  
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
        const result = await Jugador.destroy({
            where: {
                id : req.params.id
            }
        }).catch(next)


        return res.status(200).send('El registro ha sido eliminado');  
    }
}

module.exports = {
    getJugadores: getJugadores,        
    createJugador: createJugador,
    updateJugador: updateJugador,
    removeJugador: removeJugador    
}