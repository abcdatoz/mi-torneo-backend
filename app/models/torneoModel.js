module.exports = (sequelize, Sequelize) => {

    const Torneo = sequelize.define("torneo",{

        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true
        },        
        //estado = models.ForeignKey(Estado, on_delete=models.SET_NULL, null=True)
        localidad:    { type: Sequelize.STRING }, 
        nombre:    { type: Sequelize.STRING },
        status:    { type: Sequelize.STRING },
        imagen:    { type: Sequelize.STRING },
        user_owner:    { type: Sequelize.INTEGER },
        
      });

    return Torneo;
    
}