import React, { useEffect, useState } from 'react';
import ServicoForm from './ServicoForm';

function SecretariaDetalhe({ secretariaId, onBack }) {
  const [secretaria, setSecretaria] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editServico, setEditServico] = useState(null);

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

  const handleAddServico = (novoServico) => {
    setSecretaria({
      ...secretaria,
      servicos: [...secretaria.servicos, novoServico],
    });
    setShowForm(false);
  };

  const handleUpdateServico = (servicoAtualizado) => {
    setSecretaria({
      ...secretaria,
      servicos: secretaria.servicos.map(s => s.id === servicoAtualizado.id ? servicoAtualizado : s),
    });
    setShowForm(false);
    setEditServico(null);
  };

  const handleDeleteServico = (id) => {
    if (!window.confirm('Confirma exclusão do serviço?')) return;

    fetch(`http://127.0.0.1:8000/api/servicos/${id}/`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (res.ok) {
          setSecretaria({
            ...secretaria,
            servicos: secretaria.servicos.filter(s => s.id !== id),
          });
        } else {
          alert('Erro ao excluir serviço');
        }
      });
  };

  if (loading) return <p>Carregando detalhes...</p>;
  if (error) return <p>Erro: {error}</p>;
  if (!secretaria) return <p>Secretaria não encontrada.</p>;

  return (
    <div style={{ padding: '20px' }}>
      <button onClick={onBack} style={{ marginBottom: '20px' }}>
        ← Voltar
      </button>
      <h1>{secretaria.nome}</h1>

      {!showForm && (
        <button onClick={() => { setShowForm(true); setEditServico(null); }} style={{ marginBottom: '20px', padding: '8px 16px' }}>
          Adicionar Serviço
        </button>
      )}

      {showForm && (
        <ServicoForm
          secretariaId={secretaria.id}
          initialData={editServico}
          onAdd={handleAddServico}
          onUpdate={handleUpdateServico}
          onCancel={() => { setShowForm(false); setEditServico(null); }}
        />
      )}

      <h2>Serviços</h2>
      {secretaria.servicos.length === 0 ? (
        <p>Sem serviços cadastrados.</p>
      ) : (
        <ul>
          {secretaria.servicos.map((servico) => (
            <li key={servico.id} style={{ marginBottom: '10px' }}>
              <strong>{servico.nome}</strong>: {servico.descricao || 'Sem descrição'}
              <div>
                <button onClick={() => { setEditServico(servico); setShowForm(true); }} style={{ marginRight: '10px' }}>
                  Editar
                </button>
                <button onClick={() => handleDeleteServico(servico.id)} style={{ color: 'red' }}>
                  Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SecretariaDetalhe;