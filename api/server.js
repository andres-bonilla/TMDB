const express =  require( "express" ),
      morgan = require( "morgan" ),
      router = require( "./routes" ),
      db = require( "./models/db" ),
      User = require( "./models/user" ),
      cookieParser = require("cookie-parser"),
      session = require('express-session'),
      passport = require("passport"),
      bodyParser = require( "body-parser" ),
      LocalStrategy = require("passport-local").Strategy

const app = express(),
      port = 3001

app.use( bodyParser.urlencoded( { extended: true } ) )
app.use( bodyParser.json() )
app.use( morgan( "tiny" ) )
app.use( cookieParser() )
app.use( session( { secret: "prueba" } ) ) 
app.use( passport.initialize() )
app.use( passport.session() )


passport.use(
   new LocalStrategy( {
     useremailField: "email",
     passwordField: "password",
   },
   ( email, password, done ) => {
      User.findOne( { email: email } )
      .then( usuario => {
         if (!usuario) return done(null, false)
         return { usuario: usuario, hash: usuario.hash(password, usuario.salt) }
      } )
      .then( ( { usuario, hash } ) => {
         if ( hash === usuario.password ) {
            console.log("Bienvenido")
            done(null, usuario)
         }
         else {
            console.log("Email y/o contraseña incorrectos" )
            done(null, false)
         }
      } )
      .catch( err => {
         console.log( err ) 
         done(null, false)
      })
   } ) 
)
// How we save the user
passport.serializeUser( ( user, done ) => {
   done( null, user.id )
 } )
 
 // How we look for the user
 passport.deserializeUser( ( id, done ) => {
   User.findByPk( id )
   .then( user => done( null, user ) )
   .catch(err => done(err))
 } )


app.use( "/api", router )
 
app.get('/', function(req, res) {
 
   res.send('Welcome to Passport with Sequelize');

})

db.sync( { force: !true } )
.then( () => {
   console.log("Base de datos sincronizada")
   app.listen( port, () => {
      console.log( 
         `\nYou can now view "Movie Base" in the browser.\n\n` +
         `  Client:           http://localhost:3000\n` +
         `  Server:           http://localhost:${ port }\n` )
   } )
} )