import { Link } from "react-router-dom"
import { urlImg } from "../utils/utils"
import { useSelector } from "react-redux"

export const Card = ( { data } ) => {
   const urlBaseImg = useSelector( state => state.img )

   return ( 
      <div key = { data.id }>
         <Link to = {`/${ data[ "media_type" ] }/${ data.id }` } >
            <img src = { urlImg( urlBaseImg, data["poster_path"] || data["profile_path" ] ) } 
               alt = { `${ data.name || data[ "original_title" ] }` }/>
   
            <h3>{ data.name || data[ "original_title" ] }</h3></Link></div> )
}