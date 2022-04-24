import hostname from '../utils/hostname.js';

/**
 * 
 * @param {string} path url path 
 * @returns {Promise<T>}
 */

export default async function fetchData<T>(
  path: string, init: RequestInit = null
): Promise<T> {
  return fetch(`${hostname}${path}`, init)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json() as Promise<T>
    })
    .catch(error => {
      console.error(error);
      throw error;
    });
}
