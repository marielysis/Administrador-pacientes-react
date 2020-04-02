import React, { Fragment, useState } from 'react';
import uuid from 'uuid/v4';


const Formulario = ({crearCita}) => {

  // Crear State de Cita 
  const [cita, actualizarCita] = useState({
    mascota: '',
    propietario: '',
    fecha: '',
    hora: '',
    sintomas: ''
  })

  // creamos un nuevo estado para manejar el error
  const [error, actualizarError] = useState(false)

  // Función que se ejecuta cada vez que el usuario escribe en un input
  const actualizarState = e => {
    actualizarCita({
    ...cita,
    [e.target.name]: e.target.value
  })
}

  // Extraer los valores
  const { mascota, propietario, fecha, hora, sintomas } = cita;

  // Cuando el usuario presiona agregar cita o enviar formulario
  const submitCita = e => {
    e.preventDefault(); // para evitar que envie los campos del form con get

    // validar
    if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || 
    hora.trim() === '' || sintomas.trim() === '' ) {
      actualizarError(true)
      return;
    } 

    // Eliminar el mensaje de validacion de campo vacio
      actualizarError(false);

    // Asignar un ID 
    cita.id = uuid();


    // Crear la cita
    crearCita(cita);

    // Reiniciar el formulario
    actualizarCita({
      mascota: '',
      propietario: '',
      fecha: '',
      hora: '',
      sintomas: ''
    })

  }
   

  return ( 
    <Fragment>
       <h2>Crear Cita</h2>

       { error ? <p className="alerta-error">Todos los campos son obligatorios</p>  : null }

       <form
        onSubmit={submitCita}
       >
          <label>Nombre Mascota</label>
          <input
            type="text"
            name="mascota"
            className="u-full-width"
            placeholder="Nombre Mascota"
            onChange={actualizarState}
            value={mascota}
          />
          <label>Nombre Dueño</label>
          <input
            type="text"
            name="propietario"
            className="u-full-width"
            placeholder="Nombre Dueño de la Mascota"
            onChange={actualizarState}
            value={propietario}
          />
          <label>Fecha</label>
          <input
            type="date"
            name="fecha"
            className="u-full-width"
            onChange={actualizarState}
            value={fecha}
          />
          <label>Hora</label>
          <input
            type="time"
            name="hora"
            className="u-full-width"
            onChange={actualizarState}
            value={hora}
          />
          <label>Síntomas</label>
          <textarea
            className="u-full-width"
            name="sintomas"
            onChange={actualizarState}
            value={sintomas}
          ></textarea>
          <button
            type="submit"
            className="u-full-width button-primary"
          >Agregar Cita</button>

       </form>

    </Fragment>
    
    
   );
}
 
export default Formulario;