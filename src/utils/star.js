import {apiGet, apiPut, apiPost, apiDelete} from './client';

export const createStar = (StarData) => {
    return apiPost('/star/new', StarData);
}

export const viewAllStars = () => {
    return apiGet('/star/view/all');
}

export const viewStarById = (StarId) => {
    return apiGet(`/star/view/id/${StarId}`);
}

export const viewStarByName = (StarName) => {
    return apiGet(`/star/view/name/${StarName}`);
}

export const viewStarByConstellation = (ConstellationId) => {
    return apiGet(`/star/view/constellation/${StarName}`);
}

export const filterStarByStatus = (StarStatus) => {
    return apiGet(`/star/view/status/${StarStatus}`);
}

export const updateStar = (StarId, StarData) => {
    return apiPut(`/star/update/${StarId}`, StarData);
}

export const deleteStarById = (StarId) => {
    return apiDelete(`/star/delete/id/${StarId}`);
}

export const deleteStarByName = (StarName) => {
    return apiDelete(`/star/delete/name/${StarName}`);
}