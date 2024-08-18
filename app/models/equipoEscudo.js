module.exports = (sequelize, Sequelize) => {

    const EquipoEscudo = sequelize.define("equipoEscudo",{

        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true
        },        
        //equipo = models.ForeignKey(Equipo, on_delete=models.SET_NULL, null=True)        
        imagen:    { type: Sequelize.STRING },              
        
      });
    
    return EquipoEscudo;
    
}