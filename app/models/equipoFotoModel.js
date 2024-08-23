module.exports = (sequelize, Sequelize) => {

    const EquipoFoto = sequelize.define("equipoFoto",{

        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true
        },        
        
        imagen:    { type: Sequelize.STRING },              
        equipoId:  { type: Sequelize.STRING },
        
      });
    
    return EquipoFoto;
    
}