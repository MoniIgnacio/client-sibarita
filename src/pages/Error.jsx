
function Error() {
  //Whenever you have an error you are redirected to this page, which shows a picture of a burnt chicken and has a funny message :)
  return (
    <div style={{color:'white',textShadow:'2px 3px black'}}>
      <img style={{borderRadius:'20px'}}
        src="https://res.cloudinary.com/dbrqv6ypj/image/upload/v1668682432/Sibarita-img/s0gm1mtbylpzo7jbfqbz.jpg"
        alt="Error-img"
        width={'60%'}
      /> 
      <h2 style={{display: 'flex', justifyContent: 'center'}}>No nos culpe porfavor, nuestro servidor está como el pollo </h2>
    </div>
  );
}

export default Error;
