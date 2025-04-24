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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_name: form.usuario,
          password: form.contrasena,
        }),
      });

      const text = await response.text();

      let data;
      try {
        data = JSON.parse(text); // ahora intentamos convertirlo a JSON
      } catch (e) {
        data = {}; // si falla, dejamos un objeto vacío
      }

      if (response.ok) {
// Decodificar el JWT para obtener el sub
const token = data.token || data.access_token || ''; // Ajusta según cómo lo llame tu backend

if (token) {
  const base64Payload = token.split('.')[1];
  const payload = JSON.parse(atob(base64Payload));
  const userId = payload.sub;

  if (userId) {
    localStorage.setItem('user_id', userId);
  }
}

// Redireccionar al dashboard general
navigate('/DashboardGeneral');
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

  const handleGoogleLogin = () => {
    alert('Login con Google aún no implementado (se agregará más adelante)');
    // Aquí conectarás la API de Google cuando esté lista
  };

  return (
    <div className="text-gray-800 max-w-sm mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">PLACES</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-1 text-sm font-medium">Usuario</label>
          <div className="relative">
            <input
              name="usuario"
              value={form.usuario}
              onChange={handleChange}
              className="input pl-10 w-full border rounded-lg p-2"
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
              value={form.contrasena}
              onChange={handleChange}
              className="input pl-10 w-full border rounded-lg p-2"
              placeholder="Ingrese su contraseña"
            />
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>

        {error && <p className="text-sm text-red-600 text-center">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center"
        >
          {loading && <Loader2 className="animate-spin mr-2" size={20} />}
          {loading ? 'Entrando...' : 'Iniciar Sesión'}
        </button>

        <div className="text-center text-sm text-gray-500">o</div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full border border-gray-300 text-gray-800 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          Iniciar sesión con Google
        </button>
      </form>
    </div>
  );
}

export default Login;
