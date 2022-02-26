import axios from "axios"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const Mediafile = (  ) => {
   let [ titulo, setTitulo ] = useState(""),
      [ descripcion, setDescripcion ] = useState(""),
      [ imgPath, setImgPath ] = useState(""),
      [ urlBaseImg, setUrlBaseImg ] = useState(""),
      [ imgSize, setImgSize ] = useState("")

   const { type, id } = useParams()
   
   useEffect( () => {
      axios
      .get( `/api/${ type }/${ id }` )
      .then( res => res.data )
      .then( result => { 
         
         setTitulo( result.name || result[ "original_title" ] )
         setDescripcion( result[ "overview" ] )
         setImgPath( result[ "poster_path" ] || result[ "profile_path" ] )
   
         axios
         .get( `/api/search/img_data` )
         .then( res => res.data )
         .then( imgData => { 
            setUrlBaseImg( imgData[ "secure_base_url" ] )
            setImgSize( imgData[ "poster_sizes" ] )
         } )
   
      } )
   
   }, [type, id])

   const urlImg = () => {
      return ( 
         imgSize[ 1 ] && imgPath
         ? `${ urlBaseImg }${ imgSize[ 1 ] }${ imgPath }` 
         : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3PHMucJhoigq6aEtUEndZFifYoICA6VNXyg&usqp=CAU" )
   }

   return (
      <div>
         <img 
            src = { urlImg() } 
            alt = { titulo || "" }/>

         <h1>{ titulo || "" }</h1>

         <p>{ descripcion || "NO HAY DESCRIPCION" }</p></div> )
}

