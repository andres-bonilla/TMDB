const express = require( "express" ),
      tools = require( "../controllers/tools" )

const toolsRouter = express.Router()

toolsRouter.get( "/img_data", tools.urlImgData )

module.exports = toolsRouter