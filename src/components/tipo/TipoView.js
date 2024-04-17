import React, { useState, useEffect } from 'react';
import { getTipos, crearTipos, putTipos } from '../../services/tipoService';
import Swal from 'sweetalert2';
const moment = require('moment');

export const TipoView = () => {
  const [valoresForm, setValoresForm] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [editando, setEditando] = useState(false);
  const [idActual, setIdActual] = useState(null);
  const { name = '', description = '' } = valoresForm;

  const handleOnChange = (e) => {
    setValoresForm({ ...valoresForm, [e.target.name]: e.target.value });
  };

  const listarTipos = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      });
      const { data } = await getTipos();
      setTipos(data);
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  };

  useEffect(() => {
    listarTipos();
  }, []);

  const handleCrearTipo = async (e) => {
    e.preventDefault();
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      });
      Swal.showLoading();
      const resp = await crearTipos(valoresForm);
      setValoresForm({ name: '', description: '' });
      Swal.fire({
        icon: 'success',
        title: 'Tipo creado correctamente',
        showConfirmButton: false,
        timer: 1500
      });
      listarTipos();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  };

  const handleEditar =  async  (tipo) => {
    setValoresForm({ name: tipo.name, description: tipo.description });
    setIdActual(tipo._id);
    setEditando(true);
  };

  const handleActualizarTipo = async (e) => {
    e.preventDefault();
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      });
      Swal.showLoading();
      await putTipos(idActual, valoresForm);
      setValoresForm({ name: '', description: '' });
      setIdActual(null);
      setEditando(false);
      Swal.fire({
        icon: 'success',
        title: 'Tipo actualizado correctamente',
        showConfirmButton: false,
        timer: 1500
      });
      listarTipos();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  };

  return (
    <div className='container-fluid'>
      <form onSubmit={editando ? handleActualizarTipo : handleCrearTipo}>
        <div className='row'>
          <div className='col-lg-4'>
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input required name='name' value={name} type="text" className="form-control"
                onChange={handleOnChange} />
            </div>
          </div>

          <div className='col-lg-4'>
            <div className="mb-3">
              <label className="form-label">Descripción</label>
              <input required name='description' value={description} type="text" className="form-control"
                onChange={handleOnChange} />
            </div>
          </div>

        </div>
        <button className="btn btn-primary">{editando ? 'Actualizar' : 'Guardar'}</button>
      </form>

      <table className="table">
        <thead>
          <tr>
            <th scope='row'>#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Descripción</th>
            <th scope='col'>Fecha Creación</th>
            <th scope='col'>Fecha Actualización</th>
            <th scope='col'>Opción</th>
          </tr>
        </thead>
        <tbody>
          {
            tipos.length > 0 && tipos.map((tipo, index) => {
              return <tr key={tipo.id}>
                <th scope='row'>{index + 1}</th>
                <td>{tipo.name}</td>
                <td>{tipo.description}</td>
                <td>{moment(tipo.fechaCreacion).format('DD-MM-YYYY HH:mm')}</td>
                <td>{moment(tipo.FechaActualizacion).format('DD-MM-YYYY HH:mm')}</td>
                <td><button type='submit' className="btn btn-primary" onClick={() => handleEditar(tipo)}>Editar</button></td>
              </tr>
            })
          }
        </tbody>
      </table>
    </div>
  )
}