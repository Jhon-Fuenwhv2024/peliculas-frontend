import React, {useState, useEffect} from 'react'
import { getDirector, crearDirector, putDirector } from '../../services/directorService';
import Swal from 'sweetalert2';
const moment = require('moment');

export const DirectorView = () => {

  const [valoresForm, setValoresForm] = useState([]);
  const [ directores, setDirectores ] = useState([]);
  const [editando, setEditando] = useState(false);
  const [idActual, setIdActual] = useState(null);
  const { names = '', status = '' } = valoresForm;

  const listarDirectores = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      })
      const resp = await getDirector();
      setDirectores(resp.data);
      Swal.close();

    } catch (error) {
      console.log(error);
      Swal.close();
    }
  };


  useEffect(() => {
    listarDirectores();
  }, []);

  const handleOnChange = (e) => {
    setValoresForm({...valoresForm, [e.target.name]: e.target.value });
  };

  const handleCrearDirector = async (e) => {
    e.preventDefault();
    console.log(valoresForm);
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      });
      Swal.showLoading();
      const resp = await crearDirector(valoresForm);
      setValoresForm({ names: '', status: '' });
      Swal.close();
      listarDirectores();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  };

  const handleEditar =  async  (director) => {
    setValoresForm({ names: director.names, status: director.status });
    setIdActual(director._id);
    setEditando(true);
  };

  const handleActualizarDirector = async (e) => {
    e.preventDefault();
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      });
      Swal.showLoading();
      await putDirector(idActual, valoresForm);
      setValoresForm({ names: '', status: '' });
      setIdActual(null);
      setEditando(false);
      Swal.fire({
        icon: 'success',
        title: 'Director actualizado correctamente',
        showConfirmButton: false,
        timer: 1500
      });
      listarDirectores();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  };

  return (
    <div className='container-fluid'>
      <form onSubmit={editando ? handleActualizarDirector : handleCrearDirector}>
        <div className='row'>
          <div className='col-lg-4'>
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input required name='names' value={names} type="text" className="form-control"
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

        </div>
        <button className="btn btn-primary">{editando ? 'Actualizar' : 'Guardar'}</button>
      </form>

      <table className="table">
        <thead>
          <tr>
            <th scope='row'>#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Estado</th>
            <th scope='col'>Fecha Creación</th>
            <th scope='col'>Fecha Actualización</th>
            <th scope='col'>Opción</th>
          </tr>
        </thead>
        <tbody>
          {
            directores.length > 0 && directores.map((director, index) => {
              return <tr key={director.id}>
                <th scope='row'>{index + 1}</th>
                <td>{director.names}</td>
                <td>{director.status}</td>
                <td>{moment(director.fechaCreacion).format('DD-MM-YYYY HH:mm')}</td>
                <td>{moment(director.FechaActualizacion).format('DD-MM-YYYY HH:mm')}</td>
                <td><button type='submit' className="btn btn-primary" onClick={() => handleEditar(director)}>Editar</button></td>
              </tr>
            })
          }
        </tbody>
      </table>
    </div>
  )
}