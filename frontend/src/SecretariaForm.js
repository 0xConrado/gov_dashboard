import React, { useState, useEffect } from 'react';

function SecretariaForm({ onAdd, onCancel, onUpdate, initialData }) {
  const [nome, setNome] = useState(initialData ? initialData.nome : '');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setNome(initialData.nome);
    } else {
      setNome('');
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nome.trim()) {
      setError('O nome é obrigatório');
      return;
    }
    setError(null);
    setLoading(true);

    const url = initialData
      ? `http://127.0.0.1:8000/api/secretarias/${initialData.id}/`
      : 'http://127.0.0.1:8000/api/secretarias/';

    const method = initialData ? 'PUT' : 'POST';

    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nome }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Erro ao salvar secretaria');
        return res.json();
      })
      .then((data) => {
        if (initialData) {
          onUpdate(data);
        } else {
          onAdd(data);
        }
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
        {loading ? 'Salvando...' : initialData ? 'Atualizar' : 'Adicionar'}
      </button>
      <button type="button" onClick={onCancel} disabled={loading} style={{ marginLeft: '10px', padding: '8px 16px' }}>
        Cancelar
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}

export default SecretariaForm;