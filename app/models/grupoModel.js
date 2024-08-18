module.exports = (sequelize, Sequelize) => {


    const Grupo = sequelize.define("grupo",{

        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true
        },                
        nombre:    { type: Sequelize.STRING },        
        torneoId:    { type: Sequelize.STRING },
        
      });

    return Grupo;    
}