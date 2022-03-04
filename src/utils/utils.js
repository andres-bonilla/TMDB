
export const urlImg = ( urlBase, path ) => {
   return ( 
      urlBase.length !== 0 && path
      ? `${ urlBase }${ path }` 
      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3PHMucJhoigq6aEtUEndZFifYoICA6VNXyg&usqp=CAU" )
}