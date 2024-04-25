function LoginForm() {  
    return (
      <div className="w-3/12 mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-center text-2xl font-bold mb-4">SOLTEC</h2>
        <form className="w-full" >
          <div className="mb-4">
            <label className="block text-gray-700">Correo electrónico:</label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-indigo-500" 
              placeholder = "Ingrese su correo electrónico"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Contraseña:</label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-indigo-500" 
              placeholder = "Ingrese su correo contraseña"
              required
            />
          </div>
          <button type="submit" className="bg-indigo-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:bg-indigo-600 hover:bg-indigo-600">
            Ingresar
          </button>
        </form>
      </div>
    );
}

export default LoginForm;