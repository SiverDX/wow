import React from "react";

export default class Characters extends React.Component {
    constructor(props) {
        super(props);

        let apiURL = 'https://eu.api.blizzard.com/profile/wow/character/Thrall/Nadare/collections';
        let tokenURL = 'https://eu.battle.net/oauth/token';

        let authorization = btoa(process.env.REACT_APP_CLIENT_ID + ':' + process.env.REACT_APP_CLIENT_SECRET);

        let formData = new FormData();
        formData.append('grant_type', 'client_credentials');

        let options = {method: 'POST', headers: {'Authorization': 'Basic ' + authorization}, body: formData};

        fetch(tokenURL, options).then(response => response.json()).then(data => {
            console.log(data)

            fetch(apiURL, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + data.access_token,
                    'namespace': 'profile-eu',
                    'locale': 'de_de',
                }
            }).then(response => {console.log(response); return response.json();}).then(data => {
                console.log(data);
                this.state = {mounts: {apiURL: data.mounts.href}};
            }).catch(reason => console.error(reason));
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