import React from "react"
import { Routes, Route } from "react-router"
import { Link, Navigate } from "react-router-dom"
import { Mediafile } from "../commons/Mediafile"
import { Search } from "./Search"

export const App = () => {

   return (
      <div>
         <Link to = "/">
            <h1>¡Movie BASE!</h1></Link>

         <Link to = "/search/any">
            <h3>Buscar</h3></Link>

        <div>
            <Routes>
               <Route path = "/" 
                  element = { <></> } />
            
               <Route path = "/search/any" 
                  element = { <Search /> } />
            
               <Route path = "/:type/:id" 
                  element = { <Mediafile /> } />
            
               <Route path = "*" 
                  element = { <Navigate to = { "/" } /> } /></Routes></div></div> )
}