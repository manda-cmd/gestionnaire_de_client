import React, { useState, useEffect } from 'react'
import api from '../api/axios'
import Modifier from './Modifier'
import './../App.css'
import './ListesClients.css'

const getInitials = (name) => {
  if (!name) return '?';
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
};

const getCategoryClass = (type) => {
  if (!type) return 'default';
  const lower = type.toLowerCase();
  if (lower.includes('particulier')) return 'particulier';
  if (lower.includes('entreprise')) return 'entreprise';
  return 'default';
};

const ListesClients = () => {
  const [Ajouters, setAjouters] = useState([]);
  const [clientEnEdition, setClientEnEdition] = useState(null);

  useEffect(() => {
    api.get('/Clients').then(response => {
      setAjouters(response.data)
    }).catch(err => {
      console.log('Erreur lors du chargement:', err);
    })
  }, [])

  const handleClientModifie = (clientModifie) => {
    setAjouters(Ajouters.map(client => client.id === clientModifie.id ? clientModifie : client));
    setClientEnEdition(null);
  };

  return (
    <>
      {clientEnEdition && (
        <Modifier
          client={clientEnEdition}
          onUpdate={handleClientModifie}
          onCancel={() => setClientEnEdition(null)}
        />
      )}

      <div className="clients-page">
        <div className="clients-header">
          <div className="clients-header-top">
            <div>
              <h1>Liste des Clients</h1>
              <p className="subtitle">Gérez et consultez tous vos clients enregistrés</p>
            </div>
            <span className="clients-count-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              {Ajouters.length} client{Ajouters.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>

        <div className="table-wrapper">
          {Ajouters.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">👤</div>
              <h3>Aucun client enregistré</h3>
              <p>Commencez par ajouter votre premier client</p>
            </div>
          ) : (
            <table className="clients-table">
              <thead>
                <tr>
                  <th>Nom complet</th>
                  <th>Email</th>
                  <th>Téléphone</th>
                  <th>CNI</th>
                  <th>Catégorie</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {Ajouters.map((Ajouter) => (
                  <tr key={Ajouter.id}>
                    <td>
                      <div className="client-name-cell">
                        <div className="client-avatar">{getInitials(Ajouter.nomComplet)}</div>
                        <span className="client-name-text">{Ajouter.nomComplet}</span>
                      </div>
                    </td>
                    <td>{Ajouter.email}</td>
                    <td>{Ajouter.telephone}</td>
                    <td>{Ajouter.numeroCNI}</td>
                    <td>
                      <span className={`category-badge ${getCategoryClass(Ajouter.categorie?.type)}`}>
                        {Ajouter.categorie?.type || 'N/A'}
                      </span>
                    </td>
                    <td>
                      <div className="actions-cell">
                        <button className="btn-mod" onClick={() => setClientEnEdition(Ajouter)}>Modifier</button>
                        <button className="btn-del" onClick={() => {
                          api.delete('/Clients/' + Ajouter.id).then(() => {
                            setAjouters(prev => prev.filter(res => res.id !== Ajouter.id));
                          }).catch(err => console.log('Erreur suppression:', err));
                        }}>Supprimer</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  )
}

export default ListesClients
