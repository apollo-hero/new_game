const express = require('express'); 
const bodyParser = require('body-parser'); 
// const functions = require('firebase-functions') 
const cors = require('cors'); 
const path = require('path'); 
const passport = require('passport'); 
const https = require('https'); 
const http = require('http'); 
const fs = require('fs'); 

const stripe = require('stripe')('sk_test_51P1NhQP8bC8pI0cCopNmUPCGVEkEIjPY5JZj5eI6hwEWCeGx8eDvRKSDCmpEQjQugfqoj9X1vMik9E9yZFdwYwZy00p9gBZMnm');
 
const pool = require('./config/db.config'); 

const GameController = require('./controllers/GameController');
 
require('dotenv').config(); 
 
const app = express(); 
// install middleware 
app.use(cors());

app.post('/game/webhook', bodyParser.raw({type: 'application/json'}), async (request, response) => {
  GameController.webhook(request, response);
});

app.use(bodyParser.urlencoded({extended:true})) 
app.use(bodyParser.json()); 
app.use(bodyParser.raw()); 
 
// install passport 
app.use(passport.initialize()); 
require('./config/passport.config')(passport); 
 
// routers 
 
const gameRouter =  require('./routes/api/GameRouter'); 
const memberRouter = require('./routes/api/MemberRouter'); 
 
 
// database 
const db = require("./models"); 
// db.sequelize.sync({force: true}) 
db.sequelize.sync() 
  .then(() => { 
    console.log("Synced db."); 
  }) 
  .catch((err) => { 
    console.log("Failed to sync db: " + err.message); 
  });   
 
// install apis 
app.use('/account',memberRouter); 
app.use('/game',gameRouter); 
 
// static folders 
 
const assetFolder = path.resolve(__dirname,'./build/'); 
app.use(express.static(assetFolder));
app.use("*", express.static(assetFolder)); 
 
// run server 
const port = process.env.PORT || 3001;  
 
if (fs.existsSync('/var/www/key.pem')) {
  const httpsServer = https.createServer({ 
    key: fs.readFileSync('/var/www/key.pem'), 
    cert: fs.readFileSync('/var/www/certificate.pem'), 
  }, app); 
  
  httpsServer.listen(port, () => { 
    console.log(`Https Server is running on port ${port}`); 
  });
} else if (fs.existsSync('/var/www')) {
  const httpServer = http.createServer(app); 
  httpServer.listen(port, () => { 
    console.log(`HTTP Server running on port ${port}`); 
  });
} else {
  app.listen(port, () => { 
      console.log(`Server is running on port ${port}`);
  }); 
}