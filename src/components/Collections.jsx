import React from "react";
import Mounts from "./Mounts";
import Pets from "./Pets";

export default class Collections extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mounts: null,
            pets: null
        };
    }

    render() {
        return (
            <div>
                <input id='realmInput' placeholder='Realm'/>
                <input id='characterNameInput' placeholder='Character Name'/>
                <button onClick={this.fetchData}>Get Mounts</button>
                {this.state.mounts &&
                <Mounts data={this.state.mounts}/>
                }
                {this.state.pets &&
                <Pets data={this.state.pets}/>
                }
            </div>
        )
    }

    fetchData = async () => {
        let realm = document.getElementById('realmInput').value.toLowerCase();
        let character = document.getElementById('characterNameInput').value.toLowerCase();

        let token = await this.requestToken();

        let mounts = await this.requestData(token, realm, character, 'mounts');
        let pets = await this.requestData(token, realm, character, 'pets');

        this.setState({mounts: mounts, pets: pets});
    }

    requestToken = async () => {
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

    requestData = async (token, realm, character, type) => {
        let cache = localStorage.getItem(`${type}Data:${realm}:${character}`);

        if (cache) {
            return JSON.parse(cache);
        }

        let requestOptions = {
            method: 'GET',
            headers: {'Authorization': `Bearer ${token.access_token}`}
        };

        let apiURL = `https://eu.api.blizzard.com/profile/wow/character/${realm}/${character}/collections/${type}?namespace=${this.props.namespace}&locale=${this.props.locale}`;

        let response = await fetch(apiURL, requestOptions)
        let data = await response.json();

        if (data.code) {
            console.error(type, data);

            return null;
        }

        localStorage.setItem(`${type}_data:${realm}:${character}`, JSON.stringify({
            timestamp: new Date().getTime(),
            data: data
        }));

        return data;
    }
}