import axios from 'axios';

// Création d'une instance d'axios avec une configuration par défaut
const axiosInstance = axios.create({
  // Définir l'URL de base pour toutes les requêtes de cette instance
  baseURL: 'http://localhost:3001/api/v1',
  // Définir les headers par défaut pour toutes les requêtes de cette instance
  headers: {
    'Content-Type': 'application/json' // Spécifier que le contenu des requêtes sera au format JSON
  }
});

// Ajouter un intercepteur de requête pour inclure le token d'authentification dans les headers
axiosInstance.interceptors.request.use(
  (config) => {
    // Récupérer le token depuis le stockage local (localStorage)
    const token = localStorage.getItem('token');
    // Si un token est présent, l'ajouter aux headers de la requête
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Retourner la configuration de la requête mise à jour
    return config;
  },
  (error) => {
    // En cas d'erreur lors de la configuration de la requête, rejeter la promesse avec l'erreur
    return Promise.reject(error);
  }
);

export default axiosInstance;
