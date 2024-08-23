const config = require("../config/dbConfig.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        operatorsAliases: false,
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./userModel.js")(sequelize, Sequelize);
db.role = require("./roleModel.js")(sequelize, Sequelize);


db.torneo = require("./torneoModel.js")(sequelize, Sequelize);
db.grupo = require("./grupoModel.js")(sequelize, Sequelize);
db.equipo = require("./equipoModel.js")(sequelize, Sequelize);
db.equipoFoto = require("./equipoFotoModel.js")(sequelize, Sequelize);
db.equipoEscudo = require("./equipoEscudoModel.js")(sequelize, Sequelize);
db.jugador = require("./jugadorModel.js")(sequelize, Sequelize);
db.jornada = require("./jornadaModel.js")(sequelize, Sequelize);
db.juego = require("./juegoModel.js")(sequelize, Sequelize);
db.gol = require("./golModel.js")(sequelize, Sequelize);



db.role.belongsToMany(db.user,{ 
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
});

db.user.belongsToMany(db.role,{
    through:"user_roles",
    foreignKey:"userId",
    otherKey:"roleId"
});




db.ROLES= ["user","admin","moderator"];

module.exports = db;
