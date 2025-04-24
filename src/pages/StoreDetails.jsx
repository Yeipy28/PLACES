import { useParams } from 'react-router-dom';

function StoreDetails() {
  const { storeId } = useParams();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Detalles de la Tienda: {storeId}</h1>

      {/* Aquí irán secciones como facturación, paquetes, etc. */}
      <div className="space-y-4">
        <div className="p-4 bg-white rounded shadow">📄 Facturación</div>
        <div className="p-4 bg-white rounded shadow">📦 Paquetes próximos</div>
        <div className="p-4 bg-white rounded shadow">🧾 Historial de ventas</div>
      </div>
    </div>
  );
}

export default StoreDetails;
