import {axiosInstance} from '../helper/axios-config'

//obtener productora de servicios

const getProductora = () => {
    return axiosInstance.get('productora', {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

//crear productora de servicios

const crearProductora = (data) => {
    return axiosInstance.post('productora', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

// actualizar productora de servicios

const putProductora = (productoraId, data) => {
    return axiosInstance.put(`productora/${productoraId}`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

//eliminar productora de servicios

const deleteProductora = (productoraId) => {
    return axiosInstance.delete(`productora/${productoraId}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export {

    getProductora,
    crearProductora,
    putProductora,
    deleteProductora
}