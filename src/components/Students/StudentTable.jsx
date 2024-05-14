import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../constants';

function StudentInfo() {
  const [studentData, setStudentData] = useState([]);
  const [error, setError] = useState(null);
  const [filterOption, setFilterOption] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [selectedCampus, setSelectedCampus] = useState('Todos');
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get(`${API_URL}/students${filterOption}`);
        setStudentData(response.data);
        setError(null)
      } catch (error) {
        setError('No se han encontrado estudiantes.');
        console.error('Error fetching student data:', error);
      }
    };

    fetchStudentData();
  }, [filterOption]); 

  const handleFilterChange = (option) => {
    setFilterOption(option);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleViewDetails = (studentId, studentCampus) => {
    if (window.sessionStorage.getItem('USER_CAMPUS') === studentCampus) {
      console.log('Ver detalles del estudiante ID:', studentId);
      // Encode the data into URL parameters
      const params = new URLSearchParams();
      params.append('id', studentId);
      params.append('campus', studentCampus);
      // Redirect to the new page with encoded data
      window.location.href = `/StudentDetail?${params.toString()}`;
    } else {
      console.log('No tiene los permisos para ver el estudiante.');
    }
  };

  const handleImportExcel = async () => {
    const input = document.createElement('input');
    input.type = 'file';

    input.addEventListener('change', async (event) => {
      const file = event.target.files[0];
      const formData = new FormData();

      formData.append('file', file);
      formData.append('admin_id', window.sessionStorage.getItem('USER_ID'));

      try {
        const response = await axios.post(`${API_URL}/students/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log('Respuesta del servidor:', response.data);
        alert('Archivo cargado exitosamente.');
      } catch (error) {
        console.error('Error al cargar el archivo:', error);
        alert('Error al cargar el archivo. Por favor, inténtelo de nuevo.');
      }
    });

    input.click();
  };

  const handleExportExcel = async () => {
    let exportEndpoint = `${API_URL}/students/export`;
    setShowDropdown(false);
    if (selectedCampus !== 'Todos') {
      exportEndpoint += `?campus=${selectedCampus}`;
    }

    try {
      const response = await axios.get(exportEndpoint, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'estudiantes.xlsx');
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error al exportar datos a Excel:', error);
      alert('Error al exportar datos a Excel. Por favor, inténtelo de nuevo.');
    }
  };

  return (
    <div>
      <label className="block text-gray-700">Filtros</label>
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => handleFilterChange('/by_name')}
          className={`px-2 py-1 border rounded-md ${filterOption === '/by_name' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Nombre
        </button>
        <button
          onClick={() => handleFilterChange('/by_campus')}
          className={`px-2 py-1 border rounded-md ${filterOption === '/by_campus' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Campus
        </button>
        <button
          onClick={() => handleFilterChange('/by_carne')}
          className={`px-2 py-1 border rounded-md ${filterOption === '/by_carne' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Carné
        </button>
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Buscar..."
        className="border px-2 py-1 rounded-md"
      />
      <button onClick={() => handleFilterChange(`/search?query=${searchTerm}`)} className="px-2 py-1 border rounded-md bg-blue-500 text-white">
        Buscar
      </button>
      {error && <p className="text-red-500">{error}</p>}
      <table className="w-full border-collapse border border-gray-300 mt-4 mb-4">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 border">Carné</th>
            <th className="px-4 py-2 border">Nombre</th>
            <th className="px-4 py-2 border">E-mail</th>
            <th className="px-4 py-2 border">Teléfono</th>
            <th className="px-4 py-2 border">Campus</th>
            <th className="px-4 py-2 border">Detalles</th>
          </tr>
        </thead>
        <tbody>
          {(searchResult.length > 0 ? searchResult : studentData).map((student, index) => (
            <tr key={index}>
              <td className="px-4 py-2 border">{student.carne}</td>
              <td className="px-4 py-2 border">{student.full_name}</td>
              <td className="px-4 py-2 border">{student.email}</td>
              <td className="px-4 py-2 border">{student.phone}</td>
              <td className="px-4 py-2 border">{student.campus}</td>
              <td className="px-4 py-2 border">
                {window.sessionStorage.getItem('USER_CAMPUS') === student.campus && (
                  <button onClick={() => handleViewDetails(student.carne, student.campus)}
                  className='border rounded-md bg-green-500 text-white'>Ver Detalles</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex space-x-4 mb-4 mt-2.5 py-2">
        <button
          onClick={handleImportExcel}
          className="px-2 py-1 border rounded-md bg-blue-500 text-white"
        >
          Importar Excel
        </button>
        <button
          onClick={() => setShowDropdown(true)}
          className="px-2 py-1 border rounded-md bg-blue-500 text-white mx-4"
        >
          Exportar Excel
        </button>
        {/* Popup con dropdown para seleccionar el campus */}
        {showDropdown && (
          <div className="popup">
            <select value={selectedCampus} onChange={(e) => setSelectedCampus(e.target.value)}>
              <option value="Todos">Todos</option>
              <option value="CA">CA</option>
              <option value="SJ">SJ</option>
              <option value="LI">LI</option>
              <option value="SC">SC</option>
              <option value="AL">AL</option>
            </select>
            <button onClick={handleExportExcel} className="px-2 py-1 border rounded-md bg-blue-500 text-white mx-4">
              Confirmar y Exportar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentInfo;