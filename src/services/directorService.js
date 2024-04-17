import {axiosInstance} from '../helper/axios-config'

//obtener director de service
const getDirector = () => {
    return axiosInstance.get('director', {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

//crear director de service
const crearDirector = (data) => {
    return axiosInstance.post('Director', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

//actualizar director de service

const putDirector = (directorId, data) => {
    return axiosInstance.put(`director/${directorId}`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export {

    getDirector,
    crearDirector,
    putDirector
}