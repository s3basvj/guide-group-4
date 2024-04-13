import React from "react";

type FloatingScreenProps = {
  onClose: () => void;
};

const FloatingScreen: React.FC<FloatingScreenProps> = ({ onClose }) => {
  // Manejar el clic en la pantalla flotante para evitar que se cierre al hacer clic en ella
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation(); // Evitar que el clic se propague al contenedor principal
  };

  return (
    <div className="fixed z-50 top-0 left-0 w-full h-full flex justify-center items-center content-center">
      <div
        className="bg-black bg-opacity-50 absolute inset-0 "
        onClick={onClose} // Cerrar la pantalla flotante al hacer clic fuera de ella
      />
      <div
        className="bg-white p-8 rounded-lg shadow-lg z-10 flex flex-col items-center"
        onClick={handleClick} // Manejar el clic dentro de la pantalla flotante
      >
        <h2 className="text-2xl font-bold mb-4">¡Gracias por tu compra!</h2>
        <img
          width="96"
          height="96"
          src="https://img.icons8.com/fluency/96/verified-account--v1.png"
          alt="verified-account--v1"
        />
        <p className="text-lg">Tu pedido ha sido confirmado.</p>
        <button
          className="bg-green-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-green-600 w-6/12"
          onClick={(e) => {
            e.stopPropagation(); // Evitar que el clic en el botón cierre la pantalla flotante
            onClose();
          }}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default FloatingScreen;