import React from "react";

export default class Characters extends React.Component {
    constructor(props) {
        super(props);

        let apiURL = 'https://de.api.blizzard.com/profile/wow/character/Thrall/Nadare/collections';
        let tokenURL = 'https://eu.battle.net/oauth/authorize';

        fetch(tokenURL, {
            method: 'GET',
            mode: 'no-cors',
            headers: {
                'region': 'eu',
                'reponse_type': 'code',
                'client_id': process.env.REACT_APP_CLIENT_ID,
                'redirect_uri': 'http://localost:3000',
                'scope': 'wow',
                'state': 'test'
            }
        }).then(response => response.json()).then(data => {
            console.log(data)
        }).catch(reason => console.error(reason));

        fetch(apiURL, {
            method: 'GET',
            mode: 'no-cors',
            headers: {
                'namespace': 'profile-eu',
                'locale': 'de_de',
                'access_token': process.env.REACT_APP_CLIENT_SECRET
            }
        }).then(response => {console.log(response); return response.json();}).then(data => {
            console.log(data);
            this.state = {mounts: {apiURL: data.mounts.href}};
        }).catch(reason => console.error(reason));
    }

    render() {
        return (
            <div>
                <h1>Hello there, {this.props.name} </h1>
                {/*<Mounts apiURL={this.state.mounts.apiURL}/>*/}
            </div>
        )
    }
}