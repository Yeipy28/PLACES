import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/mi-fondo.jpg";

function DashboardGeneral() {
  const [user, setUser] = useState(null);
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!storedUser || !token) {
      navigate("/");
      return;
    }

    const userData = JSON.parse(storedUser);
    setUser(userData);

    const fetchPlaces = async () => {
      try {
        const response = await fetch("http://3.148.27.206/api/places/my-places", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("No se pudieron cargar las tiendas");
        }

        const data = await response.json();
        setPlaces(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-40 z-10"></div>

      <div className="relative z-20 p-6 max-w-7xl mx-auto">
        <div className="bg-green-600 rounded-lg text-white px-6 py-5 flex justify-between items-center shadow-lg mb-8">
          <div>
            <h1 className="text-3xl font-bold">¡Hola, {user?.user_name} 👋!</h1>
            <p className="text-lg">Bienvenido a PLACES</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-white text-green-600 hover:bg-gray-100 font-semibold px-4 py-2 rounded-lg transition"
          >
            Cerrar sesión
          </button>
        </div>

        {loading ? (
          <p className="text-center text-white text-lg">Cargando tiendas...</p>
        ) : error ? (
          <p className="text-center text-white text-lg">{error}</p>
        ) : (
          <>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white">PLACES</h2>
              <p className="text-sm text-white">Selecciona el PLACE a ingresar</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {places.length > 0 ? (
                places.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => navigate(`/tiendas/${item.place.id}`)}
                    className="cursor-pointer bg-white rounded-xl shadow hover:shadow-lg transition-all p-5 border border-gray-200"
                  >
                    <h3 className="text-lg font-bold text-green-700">{item.place.name}</h3>
                    <p className="text-sm text-gray-600 mt-2">
                      Dirección: {item.place.address}
                    </p>
                    <p className="text-sm text-gray-800 mt-2 font-semibold">
                      Rol: {item.role === "PLACE_OWNER" ? "Dueño" : "Trabajador"}
                    </p>
                    <p className="text-xs mt-1 text-gray-500 italic">
                      Estado: {item.is_enabled ? "Habilitado" : "Deshabilitado"}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-center text-white text-lg col-span-full">
                  No tienes lugares registrados.
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default DashboardGeneral;
