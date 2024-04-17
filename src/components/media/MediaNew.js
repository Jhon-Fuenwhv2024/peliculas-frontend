import React, { useState, useEffect } from 'react'
import { getDirector } from '../../services/directorService';
import { getGenero } from '../../services/generoService';
import { getProductora } from '../../services/productoraService';
import { getTipos } from '../../services/tipoService';
import { crearMedia } from '../../services/mediasService';
import Swal from 'sweetalert2';


export const MediaNew = ({ handleOpenModal, listarMedias }) => {

    const [generos, setGenero] = useState([]);
    const [directores, setDirector] = useState([]);
    const [productoras, setProductora] = useState([]);
    const [tipos, setTipo] = useState([]);
    const [valoresForm, setValoresForm] = useState([]);
    const { serial = '', titulo = '', url = '', sinopsis = '', genero, director, productora, tipo, año,
        fechaCreacion, imagen = '' } = valoresForm;

    const listarGenero = async () => {
        try {
            const { data } = await getGenero();
            console.log(data); // Verifica los datos obtenidos

            setGenero(data); // Actualiza el estado con los datos
        } catch (error) {
            console.log('Error al obtener los géneros', error);
        }
    };

    useEffect(() => {
        listarGenero();
    }, []);

    const listarDirectores = async () => {
        try {
            const { data } = await getDirector();
            console.log(data); // Verifica los datos obtenidos

            setDirector(data); // Actualiza el estado con los datos
        } catch (error) {
            console.log('Error al obtener los Directores', error);
        }
    };

    useEffect(() => {
        listarDirectores();
    }, []);

    const listarTipos = async () => {
        try {
            const { data } = await getTipos();
            console.log(data); // Verifica los datos obtenidos

            setTipo(data); // Actualiza el estado con los datos
        } catch (error) {
            console.log('Error al obtener los tipos', error);
        }
    };

    useEffect(() => {
        listarTipos();
    }, []);

    const listarProductora = async () => {
        try {
            const { data } = await getProductora();
            console.log(data); // Verifica los datos obtenidos

            setProductora(data); // Actualiza el estado con los datos
        } catch (error) {
            console.log('Error al obtener las productoras', error);
        }
    };

    useEffect(() => {
        listarProductora();
    }, []);

    const handleOnChange = ({ target }) => {
        const { name, value } = target;
        setValoresForm({
            ...valoresForm,
            [name]: value
        });
    }; // 

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const media = {
                serial,
                titulo,
                sinopsis,
                url,
                imagen,
                fechaCreacion,
                año,
                generoPrincipal: {
                    _id: genero
                },
                tipoPrincipal: {
                    _id: tipo
                },
                directorPrincipal: {
                    _id: director
                },
                productoraPrincipal: {
                    _id: productora
                },
                
            }  // Verifica los datos obtenidos
        console.log(media)
        try {
            Swal.fire({
                allowOutsideClick: false,
                text: 'Cargando...'
            });
            Swal.showLoading();
            const { data } = await crearMedia(media)
            handleOpenModal();
            listarMedias();
            Swal.close();
    } catch (error) {
        console.log(error);
        Swal.close();
    }
}

return (
    <div className="sidebar">
        <div className="container-fluid">
            <div className='row'>
                <div className='col'>
                    <div className='sidebar-header'>
                        <h3>Nueva Media</h3>
                        <i className="bi bi-x cerrar" onClick={handleOpenModal}></i>
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <hr />
                    </div>
                </div>
                <form onSubmit = {(e) => handleOnSubmit(e)} >
                    <div className='row'>
                        <div className='col'>
                            <div className="mb-3">
                                <table>
                                    <thead>
                                        <tr>
                                            <td><label className="form-label">Serial:</label>
                                                <input type="text" name='serial' className="form-control"
                                                    value={serial}
                                                    onChange={e => handleOnChange(e)}
                                                    required /></td>
                                            <td><label className="form-label">Titulo:</label>
                                                <input type="text" name='titulo' className="form-control"
                                                    value={titulo}
                                                    onChange={e => handleOnChange(e)}
                                                    required /></td>
                                            <td><label className="form-label">Url:</label>
                                                <input type="text" name='url' className="form-control"
                                                    value={url}
                                                    onChange={e => handleOnChange(e)}
                                                    required /></td>
                                            <td><label className="form-label">Sinopsis</label>
                                                <input type="text" name='sinopsis' className="form-control"
                                                    value={sinopsis}
                                                    onChange={e => handleOnChange(e)}
                                                    required /></td>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <div className="mb-3">
                                <table>
                                    <thead>
                                        <tr>
                                            <td><label className="form-label">Genero:</label>
                                                <select name='genero' className="form-select"
                                                    value={genero}
                                                    onChange={e => handleOnChange(e)}
                                                    required>
                                                    <option value="">--Seleccione--</option>
                                                    {
                                                        generos.map(({ _id, name }) => {
                                                            return <option key={_id} value={_id}>{name}</option>
                                                        })
                                                    }
                                                </select> </td>
                                            <td><label className="form-label">Director:</label>
                                                <select name='director' className="form-select"
                                                    value={director}
                                                    onChange={e => handleOnChange(e)}
                                                    required>
                                                    <option value="">--Seleccione--</option>
                                                    {
                                                        directores.map(({ _id, names }) => {
                                                            return <option key={_id} value={_id}>{names}</option>
                                                        })
                                                    }
                                                </select> </td>
                                            <td><label className="form-label">Tipo:</label>
                                                <select name='tipo' className="form-select"
                                                    value={tipo}
                                                    onChange={e => handleOnChange(e)}
                                                    required>
                                                    <option value="">--Seleccione--</option>
                                                    {
                                                        tipos.map(({ _id, name }) => {
                                                            return <option key={_id} value={_id}>{name}</option>
                                                        })
                                                    }
                                                </select> </td>
                                            <td><label className="form-label">Productora:</label>
                                                <select name='productora' className="form-select"
                                                    value={productora}
                                                    onChange={e => handleOnChange(e)}
                                                    required>
                                                    <option value="">--Seleccione--</option>
                                                    {
                                                        productoras.map(({ _id, name }) => {
                                                            return <option key={_id} value={_id}>{name}</option>
                                                        })
                                                    }
                                                </select> </td>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <div className="mb-3">
                                <table>
                                    <thead>
                                        <tr>
                                            <td><label className="form-label">Año de extreno</label>
                                                <input type="text" name='año' className="form-control"
                                                    value={año}
                                                    onChange={e => handleOnChange(e)}
                                                    required /></td>
                                            <td><label className="form-label">Fecha Creacion:</label>
                                                <input type="date" name='fechaCreacion' className="form-control"
                                                    value={fechaCreacion}
                                                    onChange={e => handleOnChange(e)}
                                                    required /></td>
                                            <td><label className="form-label">Imagen:</label>
                                                <input type="url" name='imagen' className="form-control"
                                                    value={imagen}
                                                    onChange={e => handleOnChange(e)}
                                                    required /></td>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <button type='submit' className='btn btn-primary' >Guardar</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
)
}
