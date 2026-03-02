import React, { useState, useEffect } from 'react'
import api from '../api/axios'
import './Modifier.css'

function Modifier({ client, onUpdate, onCancel }) {
  const [nomComplet, setNomComplet] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [numeroCNI, setNumeroCNI] = useState('');

  useEffect(() => {
    if (client) {
      setNomComplet(client.nomComplet);
      setEmail(client.email);
      setTelephone(client.telephone);
      setNumeroCNI(client.numeroCNI);
    }
  }, [client]);

  const handleSave = () => {
    if (!nomComplet || !email || !telephone || !numeroCNI) {
      alert('Veuillez remplir tous les champs');
      return;
    }
    api.patch(`/Clients/${client.id}`, {
      nomComplet, email, telephone, numeroCNI,
      categorie: client.categorie
    }).then(response => {
      alert('Client modifié avec succès !');
      onUpdate(response.data);
    }).catch(err => {
      console.log('Erreur:', err);
      alert('Erreur lors de la modification');
    });
  };

  return (
    <div className="modifier-modal-overlay">
      <div className="modifier-modal">
        <div className="modifier-header">
          <div>
            <h2>Modifier le Client</h2>
            <p className="modifier-header-sub">Mettez à jour les informations de {client?.nomComplet}</p>
          </div>
        </div>
        <div className="modifier-divider" />

        <div className="modifier-form">
          <div className="modifier-form-group">
            <label>Nom Complet</label>
            <input type="text" placeholder="Nom Complet" value={nomComplet} onChange={(e) => setNomComplet(e.target.value)} />
          </div>
          <div className="modifier-form-group">
            <label>Adresse Email</label>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="modifier-form-group">
            <label>Téléphone</label>
            <input type="text" placeholder="Téléphone" value={telephone} onChange={(e) => setTelephone(e.target.value)} />
          </div>
          <div className="modifier-form-group">
            <label>Numéro CNI</label>
            <input type="text" placeholder="Numéro CNI" value={numeroCNI} onChange={(e) => setNumeroCNI(e.target.value)} />
          </div>

          <div className="modifier-actions">
            <button className="btn-cancel-modal" onClick={onCancel}>Annuler</button>
            <button className="btn-save" onClick={handleSave}>Enregistrer</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modifier
