import axios from 'axios'

// Configuration par défaut d'Axios

// Création d'une instance d'Axios avec la configuration par défaut
const instanceProd = axios.create({
  baseURL: 'http://0.0.0.0/api', // URL de base de l'API
  timeout: 5000, // Délai d'expiration de la requête (en millisecondes)
  headers: {
    'Content-Type': 'application/json', // Type de contenu des requêtes
    'Accept-Language': 'fr-FR' // Langue préférée pour les réponses
  }
})

// Création d'une instance d'Axios avec la configuration par défaut
const instanceDev = axios.create({
  baseURL: 'http://localhost:80/api', // URL de base de l'API
  timeout: 5000, // Délai d'expiration de la requête (en millisecondes)
  headers: {
    'Content-Type': 'application/json', // Type de contenu des requêtes
    'Accept-Language': 'fr-FR' // Langue préférée pour les réponses
  }
})

export default instanceDev