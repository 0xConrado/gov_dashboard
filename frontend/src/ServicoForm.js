import React, { useState, useEffect } from 'react';

function ServicoForm({ onAdd, onUpdate, onCancel, initialData, secretariaId }) {
  const [nome, setNome] = useState(initialData ? initialData.nome : '');
  const [descricao, setDescricao] = useState(initialData ? initialData.descricao : '');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setNome(initialData.nome);
      setDescricao(initialData.descricao || '');
    } else {
      setNome('');
      setDescricao('');
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
      ? `http://127.0.0.1:8000/api/servicos/${initialData.id}/`
      : 'http://127.0.0.1:8000/api/servicos/';

    const method = initialData ? 'PUT' : 'POST';

    const body = initialData
      ? { nome, descricao, secretaria: initialData.secretaria }
      : { nome, descricao, secretaria: secretariaId };

    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Erro ao salvar serviço');
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
        placeholder="Nome do Serviço"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        disabled={loading}
        style={{ padding: '8px', width: '300px', marginBottom: '8px' }}
      />
      <textarea
        placeholder="Descrição (opcional)"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
        disabled={loading}
        style={{ padding: '8px', width: '300px', height: '80px', marginBottom: '8px' }}
      />
      <div>
        <button type="submit" disabled={loading} style={{ padding: '8px 16px', marginRight: '10px' }}>
          {loading ? 'Salvando...' : initialData ? 'Atualizar' : 'Adicionar'}
        </button>
        <button type="button" onClick={onCancel} disabled={loading} style={{ padding: '8px 16px' }}>
          Cancelar
        </button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}

export default ServicoForm;