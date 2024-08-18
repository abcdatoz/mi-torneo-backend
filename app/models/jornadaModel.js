module.exports = (sequelize, Sequelize) => {


      const Jornada = sequelize.define("jornada",{

        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true
        },        
        
        nombre:    { type: Sequelize.STRING },              
        inicia:    { type: Sequelize.DATE },              
        termina:    { type: Sequelize.DATE },              
        aviso:    { type: Sequelize.STRING },              
        status:    { type: Sequelize.STRING },                      
        torneoId:    { type: Sequelize.STRING },

    })
           
    return Jornada;
    
}