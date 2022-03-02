import axios from "axios"
import React, { useEffect, useState } from "react"
import { useNavigate } from 'react-router'
import { Link } from "react-router-dom"

export const Search = () => {

   let [ urlBaseImg, setUrlBaseImg ] = useState( "" ),
      [ imgSize, setImgSize ] = useState( "" ),
      [ searchWords, setSearchWords ] = useState( "" ),
      [ searchMovie, setSearchMovie ] = useState( false ),
      [ searchTv, setSearchTv ] = useState( false ),
      [ searchPerson, setSearchPerson ] = useState( false ),
      [ results, setResults ] = useState( [] ),
      [ controller, setController ] = useState( null )
      

   const navigate = useNavigate()

   useEffect( () => {

      if ( searchWords ) {
         let busqueda = searchWords.replace(/ /g, "%20")
         
         let mediaType = searchMovie ? "movie" : ( searchTv ? "tv" : ( searchPerson ? "person" : "any" ) )
            mediaType = searchMovie && searchTv ? "movie_or_tv" : mediaType

         const cont = new AbortController();
         setController( cont )

         axios
         .get( `/api/search/${ mediaType }?by_words=${ busqueda }`, { signal: controller ? controller.signal : null} )
         .then( res => res.data )
         .then( results => { 
            if ( !results.error ) setResults( results )
         
            navigate(`/search/${ mediaType }?by_words=${ busqueda }` )

            if ( urlBaseImg === "" ) {
               axios
               .get( "/api/tools/img_data" )
               .then( res => res.data )
               .then( imgData => { 
                  setUrlBaseImg( imgData[ "secure_base_url" ] )
                  setImgSize( imgData[ "poster_sizes" ] )
               } )
            }
         } )
         .catch ( err => { console.log(`Too FAST\n   Search of "${ busqueda }" is ${ err.message }` ) } )
      }

      return () => {
         if ( searchWords.length > 1 && controller ) controller.abort()
      }
   }, [searchWords, searchMovie, searchTv, searchPerson] )

   const changeHandler = e => {
      e.preventDefault()
      setSearchWords(e.target.value)
   }

   const searchMovieHandler = () => {
      if ( !searchMovie )
         setSearchPerson( false )
      setSearchMovie( !searchMovie )
   }

   const searchTvHandler = () => {
      if ( !searchTv )
         setSearchPerson( false )
      setSearchTv( !searchTv )
   }

   const searchPersonHandler = () => {
      if ( !searchPerson ) {
         setSearchMovie( false )
         setSearchTv( false ) 
      }
      setSearchPerson( !searchPerson )
   }

   const urlImg = element => {
      if (imgSize[ 1 ] && ( element["poster_path"] || element["profile_path" ] ))
         return `${ urlBaseImg }${ imgSize[ 1 ] }${ element[ "poster_path" ] || element[ "profile_path" ] }` 
      return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3PHMucJhoigq6aEtUEndZFifYoICA6VNXyg&usqp=CAU"
   }

   return (
      <><form >
            <input onChange = { (changeHandler) } 
               value = { searchWords } 
               type = "text"  
               name = "words" />
            
            <label>
               <input onChange={ searchMovieHandler }
                  checked={ searchMovie } 
                  type="checkbox" 
                  name="movie" />
                
               Peliculas</label>
            
            <label>
               <input onChange={ searchTvHandler }
                  checked={ searchTv } 
                  type="checkbox" 
                  name="tv" />

               Tv</label>

            <label>
               <input onChange={ searchPersonHandler }
                  checked={ searchPerson } 
                  type="checkbox" 
                  name="person" />
             
               Persona</label></form>

            <div>
               { results.map( result => {
                  return (
                     <div key = { result.id }>
                        <Link to = {`/${ result[ "media_type" ] }/${ result.id }` } >
                           <img src = { urlImg( result ) } 
                              alt = { `${ result.name || result[ "original_title" ] }` }/>
                  
                           <h3>{ result.name || result[ "original_title" ] }</h3></Link></div> ) } ) }
            
            </div></> )
}