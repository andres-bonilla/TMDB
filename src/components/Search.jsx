import axios from "axios"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export const Search = () => {

   let [ urlBaseImg, setUrlBaseImg ] = useState( "" ),
      [ imgSize, setImgSize ] = useState( "" ),
      [ searchWords, setSearchWords ] = useState( "" ),
      [ results, setResults ] = useState( [] )

   useEffect( () => {
      if ( searchWords ) {
      let busqueda = searchWords.replace(/ /g, "%20")

      axios
      .get( `/api/search/any?by_words=${ busqueda }` )
      .then( res => res.data )
      .then( results => { 
         if (!results.error) setResults(results)
         
         axios
         .get( `/api/search/img_data` )
         .then( res => res.data )
         .then( imgData => { 
            setUrlBaseImg( imgData[ "secure_base_url" ] )
            setImgSize( imgData[ "poster_sizes" ] )
         } )
      } )
      }
   }, [searchWords] )

   const changeHandler = e => {
      e.preventDefault()
      setSearchWords(e.target.value)
   }

   const urlImg = element => {
         if (imgSize[ 1 ] && ( element["poster_path"] || element["profile_path" ] ))
            return `${ urlBaseImg }${ imgSize[ 1 ] }${ element[ "poster_path" ] || element[ "profile_path" ] }` 
         return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3PHMucJhoigq6aEtUEndZFifYoICA6VNXyg&usqp=CAU"
   }

   return (
      <><form >
            <input onChange = { changeHandler } 
               value = { searchWords } 
               type = "text"  
               name = "words" /></form>

         <div>
            { results.map( (result) => {
               return (
                  <div key = {result.id}>
                     <Link to = {`/${ result[ "media_type" ] }/${ result.id }` } >
                        <img 
                           src = { urlImg( result ) } 
                           alt = { `${ result.name || result["original_title"] }` }/>
                  
                        <h3>{ result.name || result["original_title"] }</h3></Link></div> )

            } ) }</div></> )
}