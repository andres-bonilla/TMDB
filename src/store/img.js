import { createAction, createReducer } from "@reduxjs/toolkit"

export const setImg = createAction( "URLIMG" )

export const urlImg = createReducer( [], { 
   [ setImg ]: ( state, action ) => action.payload
} )