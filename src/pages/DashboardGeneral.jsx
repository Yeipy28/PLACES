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
    localStorage.removeItem("userId");
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
      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>

      {/* Contenido principal */}
      <div className="relative z-20 p-6 max-w-7xl mx-auto">
        {/* Encabezado */}
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

        {/* Título central */}
        <div className="text-center mb-10 ">
          <h2 className="text-3xl font-bold text-green-50 drop-shadow-lg">SELECIONA EL PLACE A TRABAJAR</h2>
        </div>

        {/* Tiendas */}
        {loading ? (
          <p className="text-center text-white text-lg">Cargando tiendas...</p>
        ) : error ? (
          <p className="text-center text-white text-lg">{error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {places.length > 0 ? (
              [...Array(8)].flatMap((_, i) =>
              places.map((item, index) => {
                const isDisabled = !item.is_enabled;

                return (
                  <div
                    key={index}
                    onClick={() => {
                      if (!isDisabled) {
                        navigate(`/tiendas/${item.place.id}`);
                      }
                    }}
                    className={`rounded-xl p-5 border transition-all shadow ${
                      isDisabled
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed opacity-70"
                        : "bg-white hover:shadow-lg cursor-pointer"
                    }`}
                  >
                    <h3 className="text-xl font-bold text-green-700 mb-2">{item.place.name}</h3>
                    <p className="text-sm mb-1">
                      Dirección: <span className="font-medium">{item.place.address}</span>
                    </p>
                    <p className="text-sm mb-1">
                      Rol: <span className="font-semibold">{item.role === "PLACE_OWNER" ? "Dueño" : "Trabajador"}</span>
                    </p>
                    <p
                      className={`text-sm font-semibold mt-2 ${
                        item.is_enabled ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {item.is_enabled ? "Habilitado" : "Deshabilitado"}
                    </p>
                    
                  </div>
                );

              })
            )
            ) : (
              <p className="text-center text-white text-lg col-span-full">
                No tienes lugares registrados.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardGeneral;
