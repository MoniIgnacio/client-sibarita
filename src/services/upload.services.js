import service from "./config.services";

const  uploadImage = (imageFile) => {
    return service.post('/upload', imageFile)
} 

export {
    uploadImage
}