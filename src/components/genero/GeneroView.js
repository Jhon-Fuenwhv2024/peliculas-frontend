import React, {useState, useEffect} from 'react'
import { getGenero, crearGenero, putGenero } from '../../services/generoService';
import Swal from 'sweetalert2';
const moment = require('moment');

export const GeneroView = () => {

  const[ valoresForm, setValoresForm] = useState([]);
  const [ generos, setGeneros ] = useState([]);
  const [editando, setEditando] = useState(false);
  const [idActual, setIdActual] = useState(null);
  const { name = '', status = '', description ='' } = valoresForm;

  const listarGeneros = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      })
      const resp = await getGenero();
      setGeneros(resp.data);
      Swal.close();

    } catch (error) {
      console.log(error);
      Swal.close();
    }
  };


  useEffect(() => {
    listarGeneros();
  }, []);

  const handleOnChange = (e) => {
    setValoresForm({...valoresForm, [e.target.name]: e.target.value });
  };

  const handleCrearGenero = async (e) => {
    e.preventDefault();
    console.log(valoresForm);
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      });
      Swal.showLoading();
      const resp = await crearGenero(valoresForm);
      setValoresForm({ name: '', status: '', description: ''});
      Swal.fire({
        icon:'success',
        title: 'Genero creado correctamente',
        showConfirmButton: false,
        timer: 1500
      })

      listarGeneros();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  };

  const handleEditar =  async  (genero) => {
    setValoresForm({ name: genero.name, status: genero.status, description: genero.description});
    setIdActual(genero._id);
    setEditando(true);
  };

  const handleActualizarGenero = async (e) => {
    e.preventDefault();
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      });
      Swal.showLoading();
      await putGenero(idActual, valoresForm);
      setValoresForm({ names: '', status: '', description: '' });
      setIdActual(null);
      setEditando(false);
      Swal.fire({
        icon: 'success',
        title: 'Genero actualizado correctamente',
        showConfirmButton: false,
        timer: 1500
      });
      listarGeneros();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  };

  return (
    <div className='container-fluid'>
      <form onSubmit={editando ? handleActualizarGenero : handleCrearGenero}>
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
            <th scope="col">Estado</th>
            <th scope="col">Descripción</th>
            <th scope='col'>Fecha Creación</th>
            <th scope='col'>Fecha Actualización</th>
            <th scope='col'>Opción</th>
          </tr>
        </thead>
        <tbody>
          {
            generos.length > 0 && generos.map((genero, index) => {
              return <tr key={genero.id}>
                <th scope='row'>{index + 1}</th>
                <td>{genero.name}</td>
                <td>{genero.status}</td>
                <td>{genero.description}</td>
                <td>{moment(genero.fechaCreacion).format('DD-MM-YYYY HH:mm')}</td>
                <td>{moment(genero.FechaActualizacion).format('DD-MM-YYYY HH:mm')}</td>
                <td><button type='submit' className="btn btn-primary" onClick={() => handleEditar(genero)}>Editar</button></td>
              </tr>
            })
          }
        </tbody>
      </table>
    </div>
  )
}