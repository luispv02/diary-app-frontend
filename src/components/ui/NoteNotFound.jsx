
export const NoteNotFound = () => {
  return (
    <div className=" bg-white rounded-lg shadow-md py-12">
        <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Nota no encontrada</h2>
            <p className="text-gray-600">La nota que buscas no existe o ha sido eliminada.</p>
        </div>
    </div>
  );
};