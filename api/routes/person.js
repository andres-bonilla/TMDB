const express = require( "express" ),
      person = require( "../controllers/person" )

const personRouter = express.Router()

personRouter.get( "/:id", person.getById )

module.exports = personRouter