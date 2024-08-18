module.exports = (sequelize, Sequelize) => {

    const Jugador = sequelize.define("jugador",{

        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true
        },                
        nombre:    { type: Sequelize.STRING },              
        status:    { type: Sequelize.STRING },              
        torneoId:    { type: Sequelize.STRING },
        equipoId:    { type: Sequelize.STRING },        
      });

    return Jugador;
    
}