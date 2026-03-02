import React, { useState } from 'react'
import api from '../api/axios'
import './Ajouter.css'

const Ajouter = () => {
  const CATEGORIES = [
    { id: 1, type: 'Client Particulier' },
    { id: 2, type: 'Client Entreprise' }
  ]

  const [nomComplet, setNomComplet] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [numeroCNI, setNumeroCNI] = useState('');
  const [categorieId, setCategorieId] = useState('');
  const [ajouters, setAjouters] = useState([]);

  const resetForm = () => {
    setNomComplet('');
    setEmail('');
    setTelephone('');
    setNumeroCNI('');
    setCategorieId('');
  }

  return (
    <div className="ajouter-page">
      <div className="ajouter-card">
        <div className="ajouter-card-header">
          <h2>Ajouter un Client</h2>
          <p>Renseignez les informations du nouveau client</p>
        </div>
        <div className="ajouter-divider" />

        <div className="ajouter-form">
          <div className="ajouter-form-group">
            <label>Nom Complet</label>
            <input type="text" placeholder="nom et prenom" value={nomComplet} onChange={(e) => setNomComplet(e.target.value)} />
          </div>

          <div className="ajouter-form-group">
            <label>Adresse Email</label>
            <input type="email" placeholder="votre email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="ajouter-form-group">
            <label>Téléphone</label>
            <input type="text" placeholder="numéro de téléphone" value={telephone} onChange={(e) => setTelephone(e.target.value)} />
          </div>

          <div className="ajouter-form-group">
            <label>Numéro CNI</label>
            <input type="text" placeholder="Numéro de carte nationale d'identité" value={numeroCNI} onChange={(e) => setNumeroCNI(e.target.value)} />
          </div>

          <div className="ajouter-form-group">
            <label>Catégorie</label>
            <select value={categorieId} onChange={(e) => setCategorieId(e.target.value)}>
              <option value="">— Sélectionner une catégorie —</option>
              {CATEGORIES.map((categorie) => (
                <option key={categorie.id} value={categorie.id}>{categorie.type}</option>
              ))}
            </select>
          </div>

          <div className="ajouter-actions">
            <button className="btn-ajouter-reset" onClick={resetForm}>Réinitialiser</button>
            <button className="btn-ajouter-submit" onClick={() => {
              if (!nomComplet || !email || !telephone || !numeroCNI || !categorieId) {
                alert('Veuillez remplir tous les champs');
                return;
              }
              api.post('/Clients', {
                nomComplet, email, telephone, numeroCNI,
                categorie: CATEGORIES.find(cat => cat.id == categorieId)
              }).then(response => {
                setAjouters([...ajouters, response.data]);
                resetForm();
                alert('Client ajouté avec succès !');
              }).catch(err => {
                console.log('Erreur:', err);
                alert("Erreur lors de l'ajout du client");
              });
            }}>
              + Ajouter le Client
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Ajouter
