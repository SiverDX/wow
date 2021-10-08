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

export {requestToken};