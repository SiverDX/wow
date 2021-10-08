import {requestToken} from "./fetchToken";

async function fetchCollection(realm, character, type, namespace, locale) {
    let token = await requestToken();

    let baseURL = 'https://eu.api.blizzard.com';
    let apiURL = baseURL + `/profile/wow/character/${realm}/${character}/collections/${type}?namespace=${namespace}&locale=${locale}`;

    let requestParameters = {
        token: token,
        realm: realm,
        character: character,
        type: type,
        apiURL: apiURL
    }

    return requestData(requestParameters);
}

async function requestData(requestParameters) {
    let cache = localStorage.getItem(`${requestParameters.type}Data:${requestParameters.realm}:${requestParameters.character}`);

    if (cache) {
        return JSON.parse(cache);
    }

    let requestOptions = {
        method: 'GET',
        headers: {'Authorization': `Bearer ${requestParameters.token.access_token}`}
    };

    let response = await fetch(requestParameters.apiURL, requestOptions)
    let data = await response.json();

    if (data.code) {
        console.error(`request to API (${requestParameters.apiURL}) failed: ${data}`);

        return null;
    }

    localStorage.setItem(`${requestParameters.type}_data:${requestParameters.realm}:${requestParameters.character}`, JSON.stringify({
        timestamp: new Date().getTime(),
        data: data
    }));

    return data;
}

export {fetchCollection};