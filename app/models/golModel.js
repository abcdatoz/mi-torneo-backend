module.exports = (sequelize, Sequelize) => {


    const Gol = sequelize.define("gol",{

        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true
        },                
        goles:    { type: Sequelize.INTEGER },              
        tarjetas_amarillas:    { type: Sequelize.INTEGER },              
        tarjeta_roja:    { type: Sequelize.INTEGER },              
        torneoId:    { type: Sequelize.STRING },
        juegoId:    { type: Sequelize.STRING },
        equipoId:    { type: Sequelize.STRING },
        jugadorId:    { type: Sequelize.STRING }                    
      });
      
    return Gol;
    
}