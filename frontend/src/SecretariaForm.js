import React, { useState } from 'react';

function SecretariaForm({ onAdd, onCancel }) {
  const [nome, setNome] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nome.trim()) {
      setError('O nome é obrigatório');
      return;
    }
    setError(null);
    setLoading(true);

    fetch('http://127.0.0.1:8000/api/secretarias/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nome }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Erro ao criar secretaria');
        return res.json();
      })
      .then((data) => {
        onAdd(data);
        setNome('');
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input
        type="text"
        placeholder="Nome da Secretaria"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        disabled={loading}
        style={{ padding: '8px', width: '300px' }}
      />
      <button type="submit" disabled={loading} style={{ marginLeft: '10px', padding: '8px 16px' }}>
        {loading ? 'Salvando...' : 'Adicionar'}
      </button>
      <button type="button" onClick={onCancel} disabled={loading} style={{ marginLeft: '10px', padding: '8px 16px' }}>
        Cancelar
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}

export default SecretariaForm;