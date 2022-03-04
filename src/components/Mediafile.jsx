import axios from "axios"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { urlImg } from "../utils/utils"
import { useSelector } from "react-redux"



export const Mediafile = () => {
   let [ titulo, setTitulo ] = useState( "" ),
      [ descripcion, setDescripcion ] = useState( "" ),
      [ imgPath, setImgPath ] = useState( "" )

   const urlBaseImg = useSelector( state => state.img )
   const { type, id } = useParams()
   
   useEffect( () => {
      if ( type ) {
         
         axios
         .get( `/api/${ type }/${ id }` )
         .then( ( { data } ) => {
            setTitulo( data.name || data[ "original_title" ] )
            setDescripcion( data[ "overview" ] )
            setImgPath( data[ "poster_path" ] || data[ "profile_path" ] )
         } )
      }
   }, [] ) // eslint-disable-line react-hooks/exhaustive-deps

   return (
      <div>
         <img src = { urlImg( urlBaseImg, imgPath ) } 
            alt = { titulo || "" }/>

         <h1>{ titulo || "" }</h1>

         <p>{ descripcion || "NO HAY DESCRIPCION" }</p>
         
         <p>pelis similares</p></div> )
}

