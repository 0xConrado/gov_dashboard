import React, { useEffect, useState } from 'react';
import SecretariaDetalhe from './SecretariaDetalhe';
import SecretariaForm from './SecretariaForm';

function App() {
  const [secretarias, setSecretarias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);

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

  const handleAdd = (novaSecretaria) => {
    setSecretarias([...secretarias, novaSecretaria]);
    setShowForm(false);
    setEditData(null);
  };

  const handleUpdate = (secretariaAtualizada) => {
    setSecretarias(secretarias.map(s => s.id === secretariaAtualizada.id ? secretariaAtualizada : s));
    setShowForm(false);
    setEditData(null);
  };

  const handleDelete = (id) => {
    if (!window.confirm('Confirma exclusão da secretaria?')) return;

    fetch(`http://127.0.0.1:8000/api/secretarias/${id}/`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (res.ok) {
          setSecretarias(secretarias.filter(s => s.id !== id));
        } else {
          alert('Erro ao excluir secretaria');
        }
      });
  };

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
      {!showForm && (
        <button
          onClick={() => {
            setShowForm(true);
            setEditData(null);
          }}
          style={{ marginBottom: '20px', padding: '8px 16px' }}
        >
          Adicionar Secretaria
        </button>
      )}
      {showForm && (
        <SecretariaForm
          onAdd={handleAdd}
          onCancel={() => {
            setShowForm(false);
            setEditData(null);
          }}
          onUpdate={handleUpdate}
          initialData={editData}
        />
      )}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {secretarias.map((sec) => (
          <div
            key={sec.id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '16px',
              width: '250px',
              boxShadow: '2px 2px 6px rgba(0,0,0,0.1)',
              position: 'relative',
            }}
          >
            <h2
              style={{ cursor: 'pointer' }}
              onClick={() => setSelectedId(sec.id)}
            >
              {sec.nome}
            </h2>
            <p>Serviços: {sec.servicos.length}</p>
            <button
              onClick={() => {
                setEditData(sec);
                setShowForm(true);
              }}
              style={{ marginRight: '10px' }}
            >
              Editar
            </button>
            <button
              onClick={() => handleDelete(sec.id)}
              style={{ color: 'red' }}
            >
              Excluir
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;