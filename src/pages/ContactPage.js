import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function ContactPage() {
  // We use a single state object to hold all form data.
  const [formData, setFormData] = useState({
    nombre: '',
    tipoUsuario: 'persona-natural', // Default value
    tipoConsulta: '',
    problema: ''
  });

  // This single function updates the state for any form field that changes.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the page from reloading.
    // In a real app, you'd send this data to a server.
    // For now, we'll show an alert and log the data.
    alert('Formulario enviado con éxito. Revisa la consola para ver los datos.');
    console.log('Datos del formulario:', formData);
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-7">
          <div className="card shadow-sm">
            <div className="card-body p-4 p-md-5">
              <h2 className="text-center mb-4">Contáctanos</h2>
              <p className="text-center text-muted mb-4">
                Para más información sobre disponibilidad de libros, escríbenos.
              </p>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="nombre" className="form-label">Nombre:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Tipo de usuario:</label>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" id="persona-natural" name="tipoUsuario" value="persona-natural" checked={formData.tipoUsuario === 'persona-natural'} onChange={handleChange} />
                    <label className="form-check-label" htmlFor="persona-natural">Persona natural</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" id="estudiante" name="tipoUsuario" value="estudiante" checked={formData.tipoUsuario === 'estudiante'} onChange={handleChange} />
                    <label className="form-check-label" htmlFor="estudiante">Estudiante</label>
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="tipo-consulta" className="form-label">Tipo de consulta:</label>
                  <select className="form-select" id="tipo-consulta" name="tipoConsulta" value={formData.tipoConsulta} onChange={handleChange} required>
                    <option value="" disabled>Selecciona una opción</option>
                    <option value="disponibilidad">Disponibilidad de libro</option>
                    <option value="error">Error al solicitar libro</option>
                    <option value="otras">Otras consultas</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="problema" className="form-label">Describe tu problema:</label>
                  <textarea className="form-control" id="problema" name="problema" rows="4" value={formData.problema} onChange={handleChange} required></textarea>
                </div>

                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button type="submit" className="btn btn-primary">Enviar</button>
                  <Link to="/" className="btn btn-secondary">Cancelar</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;