import service from "./config.services";
//route from the backend to do exactly what their name says

const  uploadImage = (imageFile) => {
    return service.post('/upload', imageFile)
} 

export {
    uploadImage
}