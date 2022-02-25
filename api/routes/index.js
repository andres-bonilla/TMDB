const express = require( "express" ),
      multi = require( "./multi" )

const router = express.Router()

router.use( "/multi", multi )

module.exports = router