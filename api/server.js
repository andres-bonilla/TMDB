const express =  require( "express" ),
      morgan = require( "morgan" ),
      router = require( "./routes" )

const app = express(),
      port = 3001

app.use( morgan( "tiny" ) )
app.use( "/api", router )

app.listen( port, () => {
   
   console.log( 
      `\nYou can now view tmdb in the browser.\n\n` +
      `  Client:           http://localhost:3000\n` +
      `  Server:           http://localhost:${ port }\n` )
   }
)