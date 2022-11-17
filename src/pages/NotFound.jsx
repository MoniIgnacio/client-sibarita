
function NotFound() {
  //whenever you are trying to access a non existing route, you get redirected to this page
  return (
    <div>
    <img
      src="https://res.cloudinary.com/dbrqv6ypj/image/upload/v1668682432/Sibarita-img/s0gm1mtbylpzo7jbfqbz.jpg"
      alt="Error-img"
      width={'60%'}
    /> 
    <h2 style={{display: 'flex', justifyContent: 'center'}}>Lo sentimos pero esa página no existe</h2>
  </div>
  )
}

export default NotFound