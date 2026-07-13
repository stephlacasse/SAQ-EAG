import axios from 'axios';
 
// Base API URL
const API_BASE_URL = import.meta.env.VITE_API_URL;
 
// Axios instance with default configurations
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
 
// Utility to set Authorization Token
export const setAuthToken = (token) => {
  if (token) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common['Authorization'];
  }
};
 
// API Functions
 
/**
 * Get a single centre by ID
 * @param {string} key - The ID of the centre to retrieve
 * @returns {Promise} - API response
 */
export const getCentre = async (key) => {
  try {
    const response = await apiClient.post(`/center`, {
      name: key,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching the centre:', error);
    throw error;
  }
};
 
/**
 * Create a new message.
 * @param {string} name - The name identifier used in the DynamoDB table name.
 * @param {object} payload - The message payload. Can be { message: string } or { message_fr: string, message_en: string }.
 * @returns {Promise} - API response
 */
export const createMessage = async (name, payload) => {
  try {
    const response = await apiClient.post(`/messages`, {
      name: name,
      action: 'create',
      ...payload, // Spread the payload object here
    });
    return response.data;
  } catch (error) {
    console.error('Error creating the message:', error);
    throw error;
  }
};
 
/**
 * Toggle the 'actif' status of a message by ID.
 * @param {string} name - The name identifier used in the DynamoDB table name.
 * @param {string} id - The ID of the message to toggle.
 * @returns {Promise} - API response
 */
export const toggleMessage = async (name, id) => {
  try {
    const response = await apiClient.post(`/messages`, {
      name: name,
      action: 'toggle',
      id: id,
    });
    return response.data;
  } catch (error) {
    console.error('Error toggling the message:', error);
    throw error;
  }
};
 
/**
 * Delete a message by ID.
 * @param {string} name - The name identifier used in the DynamoDB table name.
 * @param {string} id - The ID of the message to delete.
 * @returns {Promise} - API response
 */
export const deleteMessage = async (name, id) => {
  try {
    const response = await apiClient.post(`/messages`, {
      name: name,
      action: 'delete',
      id: id,
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting the message:', error);
    throw error;
  }
};
 
/**
 * Create a new ferie date.
 * @param {string} name - The name identifier used in the DynamoDB table name.
 * @param {string} date - The date to be added to the list.
 * @returns {Promise} - API response
 */
export const createFerie = async (name, date) => {
  try {
    const response = await apiClient.post(`/ferie`, {
      name: name,
      action: 'create',
      date: date,
    });
    return response.data;
  } catch (error) {
    console.error('Error creating the ferie date:', error);
    throw error;
  }
};
 
/**
 * Delete a ferie date.
 * @param {string} name - The name identifier used in the DynamoDB table name.
 * @param {string} date - The date to be removed from the list.
 * @returns {Promise} - API response
 */
export const deleteFerie = async (name, date) => {
  try {
    const response = await apiClient.post(`/ferie`, {
      name: name,
      action: 'delete',
      date: date,
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting the ferie date:', error);
    throw error;
  }
};
 
// --- Messages Fermeture Functions ---
 
/**
 * Create a new fermeture message.
 * @param {string} name - The name identifier used in the DynamoDB table name.
 * @param {object} payload - The message payload. Can be { message: string } or { message_fr: string, message_en: string }.
 * @returns {Promise} - API response
 */
export const createMessageFermeture = async (name, payload) => {
  try {
    const response = await apiClient.post(`/messages-fermeture`, { // Assuming new endpoint
      name: name,
      action: 'create',
      ...payload, // Spread the payload object
    });
    return response.data;
  } catch (error) {
    console.error('Error creating the fermeture message:', error);
    throw error;
  }
};
 
/**
 * Toggle the 'actif' status of a fermeture message by ID.
 * @param {string} name - The name identifier used in the DynamoDB table name.
 * @param {string} id - The ID of the message to toggle.
 * @returns {Promise} - API response
 */
export const toggleMessageFermeture = async (name, id) => {
  try {
    const response = await apiClient.post(`/messages-fermeture`, { // Assuming new endpoint
      name: name,
      action: 'toggle',
      id: id,
    });
    return response.data;
  } catch (error) {
    console.error('Error toggling the fermeture message:', error);
    throw error;
  }
};
 
/**
 * Delete a fermeture message by ID.
 * @param {string} name - The name identifier used in the DynamoDB table name.
 * @param {string} id - The ID of the message to delete.
 * @returns {Promise} - API response
 */
export const deleteMessageFermeture = async (name, id) => {
  try {
    const response = await apiClient.post(`/messages-fermeture`, { // Assuming new endpoint
      name: name,
      action: 'delete',
      id: id,
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting the fermeture message:', error);
    throw error;
  }
};
 
// --- End Messages Fermeture Functions ---

// --- Messages Attente Functions ---

/**
 * Create a new wait-line message.
 * @param {string} name - The name identifier used in the DynamoDB table name.
 * @param {object} payload - The message payload. Can be { message: string } or { message_fr: string, message_en: string }.
 * @returns {Promise} - API response
 */
export const createMessageAttente = async (name, payload) => {
  try {
    const response = await apiClient.post(`/messages-attente`, {
      name: name,
      action: 'create',
      ...payload,
    });
    return response.data;
  } catch (error) {
    console.error('Error creating the wait-line message:', error);
    throw error;
  }
};

/**
 * Toggle the 'actif' status of a wait-line message by ID.
 * @param {string} name - The name identifier used in the DynamoDB table name.
 * @param {string} id - The ID of the message to toggle.
 * @returns {Promise} - API response
 */
export const toggleMessageAttente = async (name, id) => {
  try {
    const response = await apiClient.post(`/messages-attente`, {
      name: name,
      action: 'toggle',
      id: id,
    });
    return response.data;
  } catch (error) {
    console.error('Error toggling the wait-line message:', error);
    throw error;
  }
};

/**
 * Delete a wait-line message by ID.
 * @param {string} name - The name identifier used in the DynamoDB table name.
 * @param {string} id - The ID of the message to delete.
 * @returns {Promise} - API response
 */
export const deleteMessageAttente = async (name, id) => {
  try {
    const response = await apiClient.post(`/messages-attente`, {
      name: name,
      action: 'delete',
      id: id,
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting the wait-line message:', error);
    throw error;
  }
};

// --- End Messages Attente Functions ---

// --- Fermeture Temporaire Functions ---

/**
 * Toggle the temporary closure status for a center.
 * @param {string} name - The center name identifier.
 * @returns {Promise} - API response
 */
export const toggleFermetureTemporaire = async (name) => {
  try {
    const response = await apiClient.post(`/fermeture-temporaire`, {
      name: name,
      action: 'toggle'
    });
    return response.data;
  } catch (error) {
    console.error('Error toggling temporary closure status:', error);
    throw error;
  }
};

/**
 * Update the temporary closure message for a center.
 * @param {string} name - The center name identifier.
 * @param {object} payload - The message payload. Can be { message: string } or { message_fr: string, message_en: string }.
 * @returns {Promise} - API response
 */
export const updateFermetureTemporaireMessage = async (name, payload) => {
  try {
    const response = await apiClient.post(`/fermeture-temporaire`, {
      name: name,
      action: 'update',
      ...payload
    });
    return response.data;
  } catch (error) {
    console.error('Error updating temporary closure message:', error);
    throw error;
  }
};

// --- End Fermeture Temporaire Functions ---