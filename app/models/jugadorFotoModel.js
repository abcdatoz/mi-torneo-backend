module.exports = (sequelize, Sequelize) => {

    const JugadorFoto = sequelize.define("jugadorFoto",{

        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true
        },        
        
        imagen:    { type: Sequelize.STRING },              
        jugadorId:  { type: Sequelize.STRING },
        
      });
    
    return JugadorFoto;
    
}