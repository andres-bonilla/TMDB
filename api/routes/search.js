const express = require( "express" ),
      search = require( "../controllers/search" )

const searchRouter = express.Router()

searchRouter.get( "/any", search.anyByWords )
searchRouter.get( "/img_data", search.imgData )

module.exports = searchRouter