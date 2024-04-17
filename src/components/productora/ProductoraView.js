import React, { useState, useEffect } from 'react'
import { getProductora, crearProductora, putProductora } from '../../services/productoraService';
import Swal from 'sweetalert2';
const moment = require('moment');

export const ProductoraView = () => {

  const [valoresForm, setValoresForm] = useState([]);
  const [productoras, setProductoras] = useState([]);
  const [editando, setEditando] = useState(false);
  const [idActual, setIdActual] = useState(null);
  const { name = '', status = '', descripcion = '', slogan = '' } = valoresForm;

  const listarProductora = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      })
      const resp = await getProductora();
      setProductoras(resp.data);
      Swal.close();

    } catch (error) {
      console.log(error);
      Swal.close();
    }
  };


  useEffect(() => {
    listarProductora();
  }, []);

  const handleOnChange = (e) => {
    setValoresForm({ ...valoresForm, [e.target.name]: e.target.value });
  };

  const handleCrearProductora = async (e) => {
    e.preventDefault();
    console.log(valoresForm);
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      });
      Swal.showLoading();
      const resp = await crearProductora(valoresForm);
      setValoresForm({ name: '', status: '',  descripcion: '',  slogan: '' });
      Swal.fire({
        icon: 'success',
        title: 'Productora creada correctamente',
        showConfirmButton: false,
        timer: 1500
      })

      listarProductora();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  };

  const handleEditar =  async  (productora) => {
    setValoresForm({ name: productora.name, status: productora.status, descripcion: productora.descripcion, slogan: productora.slogan});
    setIdActual(productora._id);
    setEditando(true);
  };

  const handleActualizarProductora = async (e) => {
    e.preventDefault();
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      });
      Swal.showLoading();
      await putProductora(idActual, valoresForm);
      setValoresForm({ name: '', status: '',  descripcion: '', slogan: ''});
      setIdActual(null);
      setEditando(false);
      Swal.fire({
        icon: 'success',
        title: 'Productora actualizada correctamente',
        showConfirmButton: false,
        timer: 1500
      });
      listarProductora();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  };

  return (
    <div className='container-fluid'>
      <form onSubmit={editando ? handleActualizarProductora : handleCrearProductora}>
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
              <label className="form-label">Estado</label>
              <select required name='status' value={status} className="form-select"
                onChange={(e) => handleOnChange(e)} >
                <option >--SELECCIONE--</option>
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
            </div>
          </div>

          <div className='col-lg-4'>
            <div className="mb-3">
              <label className="form-label">Descripción</label>
              <input required name='descripcion' value={descripcion} type="text" className="form-control"
                onChange={handleOnChange} />
            </div>
          </div>

          <div className='col-lg-4'>
            <div className="mb-3">
              <label className="form-label">Slogan</label>
              <input required name='slogan' value={slogan} type="text" className="form-control"
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
            <th scope="col">Estado</th>
            <th scope="col">Descripción</th>
            <th scope='col'>Slogan</th>
            <th scope='col'>Fecha Creación</th>
            <th scope='col'>Fecha Actualización</th>
            <th scope='col'>Opción</th>
          </tr>
        </thead>
        <tbody>
          {
            productoras.length > 0 && productoras.map((productora, index) => {
              return <tr key={productora.id}>
                <th scope='row'>{index + 1}</th>
                <td>{productora.name}</td>
                <td>{productora.status}</td>
                <td>{productora.descripcion}</td>
                <td>{productora.slogan}</td>
                <td>{moment(productora.fechaCreacion).format('DD-MM-YYYY HH:mm')}</td>
                <td>{moment(productora.FechaActualizacion).format('DD-MM-YYYY HH:mm')}</td>
                <td><button type='submit' className="btn btn-primary" onClick={() => handleEditar(productora)}>Editar</button></td>
              </tr>
            })
          }
        </tbody>
      </table>
    </div>
  )
}
