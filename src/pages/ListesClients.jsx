import React from 'react'
import { useState, useEffect } from 'react'
import api from '../api/axios'
import Modifier from './Modifier'
import './../App.css'
import './ListesClients.css'


const ListesClients = () => {
  const [Ajouters, setAjouters] = useState([]);
  const [clientEnEdition, setClientEnEdition] = useState(null);

  useEffect(() => {
    api.get('/Clients').then(response => {
      console.log(response)
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
   

    <div>Listes des Clients</div>

    {clientEnEdition && (
      <Modifier 
        client={clientEnEdition} 
        onUpdate={handleClientModifie}
        onCancel={() => setClientEnEdition(null)}
      />
    )}
    
<div className="Ajouters-list">
        {
          Ajouters.map ((Ajouter)=>{

          return (
            <div className="Ajouter">
              <h3>{Ajouter.nomComplet}</h3>
              <p><strong>Email:</strong> {Ajouter.email}</p>
              <p><strong>Téléphone:</strong> {Ajouter.telephone}</p>
              <p><strong>CNI:</strong> {Ajouter.numeroCNI}</p>
              <p><strong>Catégorie:</strong> {Ajouter.categorie?.type || 'N/A'}</p>

          <div className='btn-bas'>
                  <button onClick={() => {
                    setClientEnEdition(Ajouter);
                  }}>Modifier</button>

                  <button onClick={() => {
                            api.delete('/Clients/' + Ajouter.id).then(()=>{
                              setAjouters(Ajouters =>Ajouters.filter(res => res.id !== Ajouter.id));
                            });
                  }}> Supprimer</button>
          </div>

            </div>
          )
          })
          }
</div>


   
   </>
    
  )
}

export default ListesClients
