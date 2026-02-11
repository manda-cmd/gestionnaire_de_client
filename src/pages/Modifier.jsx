import React from 'react'
import { useState, useEffect } from 'react'
import api from '../api/axios'
import './Modifier.css'

function Modifier ({client, onUpdate, onCancel}) {
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
    if (nomComplet === '' || email === '' || telephone === '' || numeroCNI === '') {
      alert('Veuillez remplir tous les champs');
      return;
    }

    api.patch(`/Clients/${client.id}`, {
      nomComplet: nomComplet,
      email: email,
      telephone: telephone,
      numeroCNI: numeroCNI,
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
    <div >
      <div >
        <h2>Modifier Client</h2>
        
        <div>
          <label><strong>Nom Complet</strong></label>
          <input 
            type="text" 
            placeholder='Nom Complet' 
            value={nomComplet}
            onChange={(e) => setNomComplet(e.target.value)}
            
          />
        </div>

        <div>
          <label><strong>Email</strong></label>
          <input 
            type="email" 
            placeholder='Email' 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
           
          />
        </div>

        <div>
          <label><strong>Téléphone</strong></label>
          <input 
            type="text" 
            placeholder='Téléphone' 
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
           
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label><strong>Numéro CNI</strong></label>
          <input 
            type="text" 
            placeholder='Numéro CNI' 
            value={numeroCNI}
            onChange={(e) => setNumeroCNI(e.target.value)}
           
          />
        </div>

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          <button 
            onClick={onCancel}
           
          >
            Annuler
          </button>
          <button 
            onClick={handleSave}
            
          >
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modifier