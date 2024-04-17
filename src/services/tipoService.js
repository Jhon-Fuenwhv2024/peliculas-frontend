import { axiosInstance } from '../helper/axios-config'

// obtener tipo de servicios

const getTipos = () => {
    return axiosInstance.get('tipo', {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

// crear tipo de servicios

const crearTipos = (data) => {
    return axiosInstance.post('tipo', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

// actualizar tipo de servicios

const putTipos = (tipoId, data) => {
    return axiosInstance.put(`tipo/${tipoId}`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

// obtener Tipos por Id

const getTiposId = (tipoId) => {
    return axiosInstance.get(`tipo/${tipoId}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

// eliminar tipo de servicios

const deleteTipos = (tipoId) => {
    return axiosInstance.delete(`tipo/${tipoId}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export {
    getTipos,
    crearTipos,
    getTiposId,
    putTipos,
    deleteTipos
}