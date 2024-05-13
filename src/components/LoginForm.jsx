import { useState} from 'react';
import axios from 'axios';
import { API_URL } from '../constants';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState(null);

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(email)
    console.log(password)

    let data = JSON.stringify({
      "email": email,
      "password": password
    });

    let config = {
      method: 'post',
      maxBodyLength : Infinity,
      url: `${API_URL}/authenticate`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios.request(config)
      .then((response) => {
        const userId = response.data.user_id
        window.sessionStorage.setItem('USER_ID', userId); //Guardar en local storage el id del usuario
        window.location.href = 'ControlPanel'; //Navegar a la nueva ventana
        fetchPersonalData();
      })
      .catch((error) => {
        const newError = JSON.stringify(error.response.data.error);
        setError(newError)
      });
  }

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
        <button type='submit' className="w-full bg-indigo-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:bg-indigo-600 hover:bg-indigo-600">
          Ingresar
        </button>
      </form>
      
      {error && <h1 className='text-red-600 text-xl mt-3'>{error}</h1>}
    </>

  );
}

export default LoginForm;