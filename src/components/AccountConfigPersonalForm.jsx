import React, { useState } from 'react';

function PersonalForm() {
  const [formData, setFormData] = useState({
    name: 'Eduardo',
    lname: 'Gutiérrez',
    email: 'eduardogutierrez@estudiantec.cr'
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can do something with the form data here, such as submitting it to a server
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700">Nombre:</label>
        <input
          id="name"
          type="text"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="lname" className="block text-gray-700">Apellidos:</label>
        <input
          id="lname"
          type="text"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
          value={formData.lname}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700">Correo electrónico:</label>
        <input
          type="email"
          id="email"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <input type="submit" value="Guardar Cambios" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" />
    </form>
  );
}

export default PersonalForm;