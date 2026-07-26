import {apiGet, apiPut, apiPost, apiDelete} from './client';

export const createConstellation = (constellationData) => {
    return apiPost('/constellation/new', constellationData);
}

export const viewAllConstellations = () => {
    return apiGet('/constellation/view/all');
}

export const viewConstellationById = (constellationId) => {
    return apiGet(`/constellation/view/id/${constellationId}`);
}

export const viewConstellationByName = (constellationName) => {
    return apiGet(`/constellation/view/name/${constellationName}`);
}

export const updateConstellation = (constellationId, constellationData) => {
    return apiPut(`/constellation/update/${constellationId}`, constellationData);
}

export const deleteConstellation = (constellationId) => {
    return apiDelete(`/constellation/delete/${constellationId}`);
}