async function fetchData(realm, character, type, namespace, locale) {
    let token = await requestToken();

    console.log('type', type);

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

async function requestToken() {
    let formData = new FormData();
    formData.append('grant_type', 'client_credentials');

    let authorization = btoa(process.env.REACT_APP_CLIENT_ID + ':' + process.env.REACT_APP_CLIENT_SECRET);

    let tokenRequestOptions = {
        method: 'POST',
        headers: {'Authorization': `Basic ${authorization}`},
        body: formData
    };

    let tokenURL = 'https://eu.battle.net/oauth/token';

    let tokenResponse = await fetch(tokenURL, tokenRequestOptions);

    return await tokenResponse.json();
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
        console.error(type, data);

        return null;
    }

    localStorage.setItem(`${requestParameters.type}_data:${requestParameters.realm}:${requestParameters.character}`, JSON.stringify({
        timestamp: new Date().getTime(),
        data: data
    }));

    return data;
}

export {fetchData};