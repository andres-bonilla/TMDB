const express = require( "express" ),
      movie = require( "./movie" ),
      person = require( "./person" ),
      search = require( "./search" ),
      tv = require( "./tv" )

const router = express.Router()

router.use( "/movie", movie )
router.use( "/person", person )
router.use( "/search", search )
router.use( "/tv", tv )

module.exports = router