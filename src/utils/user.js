import {apiGet, apiPut} from './client';
import {getCurrentUserId} from './auth';

/**
 * @typedef {Object} UserProfile
 * @property {number} id
 * @property {string} firstName
 * @property {string} username
 * @property {string} email
 * @property {string} birthday
 * @property {number} level
 * @property {number} xp
 */

/**
 * @returns {Promise<UserProfile>}
 */
export const viewUserProfile = () => {
    const userId = getCurrentUserId();
    return apiGet(`/users/${userId}`);
};

export const updateUserProfile = (profileData) => {
    const userId = getCurrentUserId();
    return apiPut(`/users/${userId}`, profileData);
};