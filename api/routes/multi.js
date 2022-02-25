const express = require( "express" )

const multi = require("../controllers/multi")

const multiRoutes = express.Router()

multiRoutes.get( "/search", multi.search )
multiRoutes.get( "/:type/:id", multi.getByTypeId )

module.exports = multiRoutes