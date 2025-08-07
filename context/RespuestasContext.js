// context/RespuestasContext.js
import React, { createContext, useContext, useState } from 'react';

const RespuestasContext = createContext();

export const RespuestasProvider = ({ children }) => {
  const [respuestas, setRespuestas] = useState(Array(25).fill(null));

  const guardarRespuesta = (indice, valor) => {
    const nuevas = [...respuestas];
    nuevas[indice] = valor;
    setRespuestas(nuevas);
  };

  const resetearRespuestas = () => {
    setRespuestas(Array(25).fill(null));
  };

  const suspenderPrueba = () => {
    setRespuestas((prev) => prev.map((r) => (r === null ? 'SP' : r)));
  };

  return (
    <RespuestasContext.Provider
      value={{
        respuestas,
        guardarRespuesta,
        resetearRespuestas,
        suspenderPrueba,
      }}
    >
      {children}
    </RespuestasContext.Provider>
  );
};

export const useRespuestas = () => useContext(RespuestasContext);
