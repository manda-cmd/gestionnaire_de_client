import React from 'react'
import { useState } from 'react'
import api from '../api/axios'
import './Ajouter.css'

const Ajouter = () => {
  const CATEGORIES = [
    { id: 1, type: 'Client Particulier' },
    { id: 2, type: 'Client Entreprise' }
  ]

  const[nomComplet, setNomComplet] = useState('');
  const[email, setEmail] = useState('');
  const[telephone, setTelephone] = useState('');
  const[numeroCNI, setNumeroCNI] = useState('');
  const[categorieId, setCategorieId] = useState('');
  const [ajouters, setAjouters] = useState([]);



  function inscriptionClient({nomComplet, email, telephone, numeroCNI, categorie}) {
    let inscription = {
      id: Date.now(),
      nomComplet: nomComplet,
      email: email,
      telephone: telephone,
      numeroCNI: numeroCNI,
      categorie: CATEGORIES.find(cat => cat.id == categorie)
    };
    setAjouters([...ajouters, inscription]);
  }
 
 
  return (
    <>

 <div>

<div className='ajouter'>
  <label htmlFor=""></label>
  <input type="text" placeholder='Nom Complet' onChange={(e) => setNomComplet (e.target.value)} />
 </div>

  <div>
    <label htmlFor=""></label>
    <input type="email" placeholder='Email' onChange={(e) => setEmail (e.target.value)} />
  </div>
  
  <div>
    <label htmlFor=""></label>
    <input type="text" placeholder='Téléphone' onChange={(e) => setTelephone (e.target.value)} />
  </div>

  <div>
    <label htmlFor=""></label>
    <input type="text" placeholder='Numéro CNI' onChange={(e) => setNumeroCNI (e.target.value)} />
  </div>



  <div>
    <label htmlFor=""></label>
    <select id='categorie' value={categorieId} onChange={(e) => setCategorieId(e.target.value)}>
      <option value="">--Sélectionner une catégorie--</option>

      {

        CATEGORIES.map((categorie) => (
          <option  value={categorie.id}>
            {categorie.type}
          </option>
        ))
      }
      </select>
  </div>

  <div>
 
 <button onClick={()=>{if(nomComplet == ""  || email == "" || telephone == "" || numeroCNI == "" || categorieId == ""){
  alert('veiller entrer tous les champs');
  return;
 }
 api.post('/Clients', {
  nomComplet: nomComplet,
  email: email,
  telephone: telephone,
  numeroCNI: numeroCNI,
  categorie: CATEGORIES.find(cat => cat.id == categorieId)
 }).then (response =>{
  setAjouters([...ajouters, response.data]);
  setNomComplet('');
  setEmail('');
  setTelephone('');
  setNumeroCNI('');
  setCategorieId('');
  alert('Client ajouté avec succès !');
 }).catch(err => {
  console.log('Erreur:', err);
  alert('Erreur lors de l\'ajout du client');
 });
}}>
    Ajouter Client

 </button>


  </div>

 </div>

    </>
  )
}

export default Ajouter