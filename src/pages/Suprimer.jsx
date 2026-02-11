import React from 'react'
import { ajouters, setAjouters } from './ListesClients'
import './Suprimer.css'

function Suprimer ({id}) {

    const ajouterFittres = ajouters.filter(ajouter => ajouter.id !== id);

    setAjouters(ajouterFittres);
  
  return (
    <div>Suprimer</div>
  )
}

export default Suprimer