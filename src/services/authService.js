import axios from 'axios';
/**
* Service d'authentification et de gestion du profil utilisateur
* Permet d'interroger l'API d'authentification
*/
// URL de base de l'API
const API_URL = 'http://localhost:3001/api/v1';
// Auth user, Envoie les identifiants à l'API en POST et retourne les données de connexion avec le token ou erreur
export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/user/login`, credentials);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};
// Recupération données user avec le token envoyé à l'API en POST
export const getUserProfile = async (token) => {
  try {
    const response = await axios.post(
      `${API_URL}/user/profile`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};
// Update données user avec le token et les data user envoyé à l'API en POST
export const updateUserProfile = async (token, userData) => {
  try {
    const response = await axios.put(
      `${API_URL}/user/profile`,
      userData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};