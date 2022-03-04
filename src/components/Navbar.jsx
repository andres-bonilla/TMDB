import { Link } from "react-router-dom"

export const Navbar = () => {

   return (
      <div>
         <Link to = "/access">
            <h2>Access</h2></Link>

         <Link to = "/">
            <h2>¡Movie BASE!</h2></Link>

         <Link to = "/search/any">
            <h3>Buscar</h3></Link></div> )
}