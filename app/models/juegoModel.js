module.exports = (sequelize, Sequelize) => {

    const Juego = sequelize.define("juego",{

        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true
        },        
        
        equipoA:    { type: Sequelize.UUID },              
        equipoB:    { type: Sequelize.UUID },              
        fecha:    { type: Sequelize.DATE },              
        hora:    { type: Sequelize.INTEGER },              
        minuto:    { type: Sequelize.INTEGER },              
        golesA:    { type: Sequelize.INTEGER },              
        golesB:    { type: Sequelize.INTEGER },              
        puntosA:    { type: Sequelize.INTEGER },              
        puntosB:    { type: Sequelize.INTEGER },                      
        status:    { type: Sequelize.STRING },                      
        torneoId:    { type: Sequelize.STRING },                      
        jornadaId:    { type: Sequelize.STRING },                      
      });
      
    return Juego;
    
}