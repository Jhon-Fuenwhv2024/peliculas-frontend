import {axiosInstance} from '../helper/axios-config'

//obtener genero service

const getGenero = () => {
    return axiosInstance.get('genero', { // http://localhost:3001/genero
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

//crear genero service

const crearGenero = (data) => {
    return axiosInstance.post('genero', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

//actualizar genero service

const putGenero = (generoId, data) => {
    return axiosInstance.put(`genero/${generoId}`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

//eliminar genero service

const deleteGenero = (generoId) => {
    return axiosInstance.delete(`genero/${generoId}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export {
    getGenero,
    crearGenero,
    putGenero,
    deleteGenero
}