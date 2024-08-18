module.exports = (sequelize, Sequelize) => {

    const Equipo = sequelize.define("equipo",{

        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true
        },                
        nombre:    { type: Sequelize.STRING },        
        nombre_contacto:    { type: Sequelize.STRING },        
        correo_contacto:    { type: Sequelize.STRING },        
        telefono_contacto:    { type: Sequelize.STRING },        
        status:    { type: Sequelize.STRING },        
        torneoId:    { type: Sequelize.STRING },
        grupoId:    { type: Sequelize.STRING },
        
      });
    
    return Equipo;
    
}