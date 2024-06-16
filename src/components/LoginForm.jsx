import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../constants';
import ErrorPopup from './ErrorPopup';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(email);
    console.log(password);

    let data = JSON.stringify({
      email: email,
      password: password
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${API_URL}/authenticate`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios
      .request(config)
      .then((response) => {
        const userId = response.data.user_id;
        window.sessionStorage.setItem('USER_ID', userId); //Guardar en local storage el id del usuario
        if (response.data.student_id){
          const student_id = response.data.student_id
          window.sessionStorage.setItem('STUDENT_ID', student_id);
        }
          
        window.location.href = 'ControlPanel'; //Navegar a la nueva ventana
        fetchPersonalData();
      })
      .catch((error) => {
        const newError = JSON.stringify(error.response.data.error);
        setError(newError);
      });
  };

  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();
    // Crear un objeto con el correo electrónico
    const requestData = { email: forgotPasswordEmail };

    // Realizar la solicitud HTTP POST al endpoint users/recover_password
    axios.post(`${API_URL}/users/recover_password`, requestData)
      .then((response) => {
        // Manejar la respuesta del servidor si es necesario
        console.log('Solicitud de recuperación de contraseña enviada con éxito');
        // Puedes mostrar un mensaje de éxito o realizar otras acciones aquí
        // Por ejemplo, puedes cerrar el pop-up de recuperación de contraseña
        setShowForgotPassword(false);
      })
      .catch((error) => {
        // Manejar errores de la solicitud al servidor
        console.error('Error al enviar la solicitud de recuperación de contraseña:', error);
        // Puedes mostrar un mensaje de error al usuario aquí si es necesario
      });
  };

  const toggleForgotPasswordPopup = () => {
    setShowForgotPassword(!showForgotPassword);
  };

  return (
    <>
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Correo electrónico:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleChangeEmail}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
            placeholder="Ingrese su correo electrónico"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handleChangePassword}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
            placeholder="Ingrese su contraseña"
            required
          />
        </div>
        <button type="submit" className="w-full bg-indigo-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:bg-indigo-600 hover:bg-indigo-600">
          Ingresar
        </button>
      </form>

      <button onClick={toggleForgotPasswordPopup} className="text-indigo-600 hover:underline mt-2 block">Olvidé mi contraseña</button>

      {error && <ErrorPopup setError={setError} errorMessage={'Correo o Contraseña Invalidos'} client:load/>}

      {showForgotPassword && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-80">
            <h2 className="text-lg font-semibold mb-4">Recuperar contraseña</h2>
            <form onSubmit={handleForgotPasswordSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Correo electrónico:</label>
                <input
                  type="email"
                  value={forgotPasswordEmail}
                  onChange={(e) => setForgotPasswordEmail(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
                  placeholder="Ingrese su correo electrónico"
                  required
                />
              </div>
              <button type="submit" className="w-full bg-indigo-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:bg-indigo-600 hover:bg-indigo-600">
                Enviar solicitud
              </button>
            </form>
            <button onClick={toggleForgotPasswordPopup} className="text-indigo-600 hover:underline mt-2 block">Cancelar</button>
          </div>
        </div>
      )}
    </>
  );
}

export default LoginForm;