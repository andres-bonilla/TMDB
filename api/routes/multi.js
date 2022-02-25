const express = require( "express" ),
      multi = require( "../controllers/multi" )

const multiRoutes = express.Router()

multiRoutes.get( "/search", multi.search )
multiRoutes.get( "/:type/:id", multi.getByTypeId )
multiRoutes.get( "/imgData", multi.imgData )

module.exports = multiRoutes