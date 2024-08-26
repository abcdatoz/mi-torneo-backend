const db = require('../models')
const Juego = db.juego
const Goles = db.gol



const { isEmpty } = require('../helpers/validations')
const {status, errorMessage} = require('../helpers/status')



const getJuegos = async (req,res,next ) => {

    const result = await Juego.findAll({}).catch(next)
  
    return res.status(status.success).send(result)    

}

const getJuegosByTorneo = async (req,res,next) => {

    const result = await Juego.findAll({
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



const createJuego = async(req,res,next)=> {
    const { equipoA, equipoB, fecha, hora, minuto, golesA, golesB, status, torneo, jornada }  = req.body
      
    
    if( isEmpty(equipoA) 
        || isEmpty(equipoB)        
        || isEmpty(fecha)        
        || isEmpty(hora)        
        || isEmpty(minuto)        
        || isEmpty(status)        
        ){
        errorMessage.error ='Todos los campos son requeridos'

        return res.status(400).send(errorMessage)        
    }

    
    let puntosA = 0
    let puntosB = 0

    if (status == 'finalizado'){


        if (golesA == golesB){
            puntosA=1
            puntosB=1
        }else if (golesA > golesB){
            puntosA=3
            puntosB=0
        }else {
            puntosA=0
            puntosB=3
        }
    }
        

    const result =  await Juego.create({        
        equipoA: equipoA,
        equipoB: equipoB,
        fecha: fecha,
        hora: hora,
        minuto: minuto,
        golesA: golesA,
        golesB: golesB,
        puntosA: puntosA,
        puntosB: puntosB,
        status: status,
        torneoId: torneo,
        jornadaId: jornada
    }).catch(next)

    
    return res.status(200).send(result)
}

const updateJuego = async(req,res,next)=>{
    const {  golesA, golesB, status }  = req.body

    const registro = await Juego.findByPk(req.params.id).catch(next)


    if (registro){

        let puntosA = 0
        let puntosB = 0

        if (golesA == golesB){
            puntosA=1
            puntosB=1
        }else if (golesA > golesB){
            puntosA=3
            puntosB=0
        }else {
            puntosA=0
            puntosB=3
        }
    

          
        const result = await registro.update({            
            golesA: golesA,
            golesB: golesB,
            puntosA:puntosA,
            puntosB: puntosB,
            status: status
        }).catch(next)

        return res.status(200).send(result)
    }else{
        return res.status(400)
    }
}

const removeJuego = async(req,res,next)=> {
  
    const { count, rows } = await Goles.findAndCountAll({
        where: { juegoId: req.params.id},
        offset: 10,
        limit: 2
      });

    

    if (count > 0 ){


        return res.status(status.bad).send({
            message: "no se puede eliminar porque tiene jugadores registrados"
        })

    }else{
        const result = await Juego.destroy({
            where: {
                id : req.params.id
            }
        }).catch(next)


        return res.status(200).send('El registro ha sido eliminado');  
    }
}




module.exports = {
    getJuegos: getJuegos,    
    getJuegosByTorneo: getJuegos,
    createJuego: createJuego,
    updateJuego: updateJuego,
    removeJuego: removeJuego    
}