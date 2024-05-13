import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../constants';

function StudentInfo() {
  const [studentData, setStudentData] = useState([]);
  const [error, setError] = useState(null);
  const [filterOption, setFilterOption] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get(`${API_URL}/students${filterOption}`);
        setStudentData(response.data);
      } catch (error) {
        setError('Error al cargar la información de los estudiantes. Inténtelo de nuevo más tarde.');
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

  const handleViewDetails = (studentId) => {
    // Lógica para ver detalles del estudiante
  };

  const handleImportExcel = () => {
    // Lógica para importar datos desde Excel
  };

  const handleExportExcel = () => {
    // Lógica para exportar datos a Excel
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
                <button onClick={() => handleViewDetails(student.id)}
                className='border rounded-md bg-green-500 text-white'>Ver Detalles</button>
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
          onClick={handleExportExcel}
          className="px-2 py-1 border rounded-md bg-blue-500 text-white mx-4"
        >
          Exportar Excel
        </button>
      </div>
    </div>
  );
}

export default StudentInfo;
