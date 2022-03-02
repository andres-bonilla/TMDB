const express = require( "express" ),
      movie = require( "./movie" ),
      person = require( "./person" ),
      search = require( "./search" ),
      tools = require( "./tools" ),
      tv = require( "./tv" )

const router = express.Router()

router.use( "/movie", movie )
router.use( "/person", person )
router.use( "/search", search )
router.use( "/tools", tools )
router.use( "/tv", tv )

module.exports = router