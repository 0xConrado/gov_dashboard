import React, { useEffect, useState } from 'react';
import SecretariaDetalhe from './SecretariaDetalhe';

function App() {
  const [secretarias, setSecretarias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/secretarias/')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro ao buscar secretarias');
        }
        return response.json();
      })
      .then((data) => {
        setSecretarias(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Carregando secretarias...</p>;
  if (error) return <p>Erro: {error}</p>;

  if (selectedId) {
    return (
      <SecretariaDetalhe
        secretariaId={selectedId}
        onBack={() => setSelectedId(null)}
      />
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Secretarias Municipais</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {secretarias.map((sec) => (
          <div
            key={sec.id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '16px',
              width: '250px',
              cursor: 'pointer',
              boxShadow: '2px 2px 6px rgba(0,0,0,0.1)',
            }}
            onClick={() => setSelectedId(sec.id)}
          >
            <h2>{sec.nome}</h2>
            <p>Serviços: {sec.servicos.length}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;