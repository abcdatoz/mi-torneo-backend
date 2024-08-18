const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()


app.use(express.static('public'))

let corsOptions = { origin: false }
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


const db = require("./app/models");
const Role = db.role;

   
     db.sequelize.sync({force:false})
      .then(()=>{ 
          console.log("Drop and Resync Db");        
          //initial()            
    });



app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token");
    next();   
});

 


app.use('/api/resources',express.static(__dirname + '/public/uploads'));

app.get('/',(req,res)=>{ res.json({messsage:'lets play'}) })

require('./app/routes/torneoRoute')(app)
require('./app/routes/grupoRouter')(app)
require('./app/routes/equipoRouter')(app)
require('./app/routes/jugadorRoute')(app)
require('./app/routes/jornadaRouter')(app)
require('./app/routes/juegoRouter')(app)
require('./app/routes//golRouter')(app)


      
app.use( (error, req, res, next) => {
        return res.status(500).json({ error: error.toString() });
});
   


const PORT = process.env.PORT || 8080

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)    
})


function initial(){
    Role.create({
        id:1,
        name:"user"
    });

    Role.create({
        id:2,
        name:"moderator"
    });

    Role.create({
        id:3,
        name:"admin"
    });
}


