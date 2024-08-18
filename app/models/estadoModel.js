module.exports = (sequelize, Sequelize) => {

    const Estado = sequelize.define("estado",{

        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true
        },        
        clave:    { type: Sequelize.STRING }, 
        nombre:    { type: Sequelize.STRING },
        
      });

    return Estado;
    
}