export const uploadImages = async(file) => {

    if(!file) throw new Error('No hay ningun archivo seleccionado')

    const cloudUrl = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/upload`;
    
    const formData = new FormData();
    formData.append('upload_preset', 'diary-app')
    formData.append('file', file)

    try {
        const resp = await fetch(cloudUrl, {
            method: 'POST',
            body: formData,
        });

        if( !resp.ok ) throw new Error('No se pudo subir la imagen')

        const cloudResp = await resp.json();
        return cloudResp.secure_url
    } catch (error) {
        console.log('error', error)
        throw new Error(error.message)
    }
    
}