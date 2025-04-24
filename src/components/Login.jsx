import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Loader2 } from 'lucide-react';

function Login() {
  const [form, setForm] = useState({ usuario: '', contrasena: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.usuario || !form.contrasena) {
      setError('Todos los campos son obligatorios');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://3.148.27.206/api/places/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_name: form.usuario,
          password: form.contrasena,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Guardar la respuesta del backend (token, usuario, etc.)
        localStorage.setItem('user', JSON.stringify(data));
        navigate('/DashboardOwner');
      } else {
        setError(data.message || 'Credenciales incorrectas');
      }
    } catch (error) {
      setError('Error de red. Intenta nuevamente.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-gray-800">
      <h1 className="text-3xl font-bold text-center mb-6">PLACES</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-1 text-sm font-medium">Usuario</label>
          <div className="relative">
            <input
              name="usuario"
              onChange={handleChange}
              className="input pl-10"
              placeholder="Ingrese su usuario"
            />
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Contraseña</label>
          <div className="relative">
            <input
              type="password"
              name="contrasena"
              onChange={handleChange}
              className="input pl-10"
              placeholder="Ingrese su contraseña"
            />
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>

        {error && <p className="text-sm text-red-600 text-center">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center"
          disabled={loading}
        >
          {loading && <Loader2 className="animate-spin mr-2" size={20} />}
          {loading ? 'Entrando...' : 'Iniciar Sesión'}
        </button>
      </form>
    </div>
  );
}

export default Login;
