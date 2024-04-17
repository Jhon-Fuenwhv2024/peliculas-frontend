import {axiosInstance} from '../helper/axios-config'

//obtener medias de servios

const obtenerMedias = () => {
    return axiosInstance.get('media', {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

// crear media de servicios

const crearMedia = (data) => {
    return axiosInstance.post('media', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

// actualizar media de servicios

const actualizarMedia = (mediaId, data) => {
    return axiosInstance.put(`media/${mediaId}`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

//eliminar media de servicios

const eliminarMedia = (mediaId) => {
    return axiosInstance.delete(`media/${mediaId}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

// obtener media por Id 

const getMediaPorId = (mediaId) => {
    return axiosInstance.get(`media/${mediaId}`, { // http://localhost:3000/media/id
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export {
    obtenerMedias,
    crearMedia,
    actualizarMedia,
    getMediaPorId,
    eliminarMedia,
}

