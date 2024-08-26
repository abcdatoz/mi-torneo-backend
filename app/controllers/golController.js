const db = require('../models')
const Gol = db.gol

const { isEmpty } = require('../helpers/validations')
const {status, errorMessage} = require('../helpers/status')

const getGoles = async (req,res,next ) => {

    const result = await Gol.findAll({}).catch(next)
  
    return res.status(status.success).send(result)    

}


const createGol = async(req,res,next)=> {
    const { goles, tarjetas_amarillas, tarjeta_roja, torneo, juego, equipo, jugador }  = req.body
      console.log(req.unstable_shouldYield)
    if(  isEmpty(torneo)        
        || isEmpty(juego)        
        || isEmpty(equipo)        
        || isEmpty(jugador)        
        ){
        errorMessage.error ='Todos los campos son requeridos'
        return res.status(status.bad).send(errorMessage)
    }

    const result =  await Gol.create({        
        goles: goles,
        tarjetas_amarillas: tarjetas_amarillas,
        tarjeta_roja: tarjeta_roja,
        torneoId: torneo,
        juegoId: juego,
        equipoId: equipo,
        jugadorId: jugador
    }).catch(next)

    
    return res.status(status.success).send(result)
}

const updateGol = async(req,res,next)=>{
    const { goles, tarjetas_amarillas, tarjeta_roja }  = req.body

    const registro = await Gol.findByPk(req.params.id).catch(next)


    if (registro){
          
        const result = await registro.update({            
            goles: goles,
            tarjetas_amarillas: tarjetas_amarillas,
            tarjeta_roja: tarjeta_roja
        }).catch(next)

        return res.status(status.success).send(result)
    }else{
        return res.status(status.nocontent)
    }
}

 const removeGol = async(req,res,next)=> {
   
    const result = await Gol.destroy({
        where: {
            id : req.params.id
        }
    }).catch(next)


    return res.status(200).send('El registro ha sido eliminado');  

}

module.exports = {
    getGoles: getGoles,        
    createGol: createGol,
    updateGol: updateGol,
    removeGol: removeGol
}