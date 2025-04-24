import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function DashboardGeneral() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
    } else {
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Dashboard General</h1>

      {user ? (
        <div className="space-y-4">
          <div className="bg-white p-4 shadow rounded-lg">
            <p className="text-lg">
              👋 Bienvenido, <span className="font-semibold">{user.user_name}</span>
            </p>
            <p className="text-sm text-gray-500">Rol: {user.role || "No especificado"}</p>
          </div>

          <div className="bg-white p-4 shadow rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Tus lugares (places)</h2>

            {user.places && user.places.length > 0 ? (
              <ul className="space-y-2">
                {user.places.map((place, index) => (
                  <li key={index} className="border p-3 rounded hover:bg-gray-100 transition">
                    <p className="font-medium">{place.name}</p>
                    <p className="text-sm text-gray-500">{place.description || "Sin descripción"}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No tienes lugares registrados.</p>
            )}
          </div>

          <div className="text-center">
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center">Cargando datos del usuario...</p>
      )}
    </div>
  );
}

export default DashboardGeneral;
