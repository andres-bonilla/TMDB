const express =  require( "express" ),
      morgan = require( "morgan" ),
      router = require("./routes")

const app = express(),
      port = 3700

app.use( morgan( "tiny" ) )

app.use("/api", router)

app.listen( port, () => {
   console.log( 
      `\nYou can now view tmdb in the browser.\n\n` +
      `  Server:           http://localhost:${ port }\n` +
      `  local:            http://localhost:3000\n` )
   }
)