import React, { useEffect, useState } from 'react';

function SecretariaDetalhe({ secretariaId, onBack }) {
  const [secretaria, setSecretaria] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/secretarias/${secretariaId}/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro ao buscar secretaria');
        }
        return response.json();
      })
      .then((data) => {
        setSecretaria(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [secretariaId]);

  if (loading) return <p>Carregando detalhes...</p>;
  if (error) return <p>Erro: {error}</p>;
  if (!secretaria) return <p>Secretaria não encontrada.</p>;

  return (
    <div style={{ padding: '20px' }}>
      <button onClick={onBack} style={{ marginBottom: '20px' }}>
        ← Voltar
      </button>
      <h1>{secretaria.nome}</h1>
      <h2>Serviços</h2>
      {secretaria.servicos.length === 0 ? (
        <p>Sem serviços cadastrados.</p>
      ) : (
        <ul>
          {secretaria.servicos.map((servico) => (
            <li key={servico.id}>
              <strong>{servico.nome}</strong>: {servico.descricao || 'Sem descrição'}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SecretariaDetalhe;