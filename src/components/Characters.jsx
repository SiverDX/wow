import React from "react";

export default class Characters extends React.Component {
    constructor(props) {
        super(props);

        this.state = {mounts: []};
    }

    render() {
        return (
            <div>
                <input id='realmInput' placeholder='Realm'/>
                <input id='characterNameInput' placeholder='Character Name'/>
                <button onClick={this.fetchMounts}>Get Mounts</button>
                {/* only render when the api has loaded the mounts */}
                {this.state.mounts.length > 0 &&
                <ul>
                    {this.state.mounts.map(function (mount, index) {
                        return <li key={index}>{mount.mount.name}</li>;
                    })}
                </ul>
                }
                {/*<Mounts apiURL={this.state.mounts.apiURL}/>*/}
            </div>
        )
    }

    /* todo :: keep in mind -> arrow function required to bind 'this' */
    fetchMounts = () => {
        let tokenURL = 'https://eu.battle.net/oauth/token';

        let authorization = btoa(process.env.REACT_APP_CLIENT_ID + ':' + process.env.REACT_APP_CLIENT_SECRET);

        let formData = new FormData();
        formData.append('grant_type', 'client_credentials');

        let options = {method: 'POST', headers: {'Authorization': 'Basic ' + authorization}, body: formData};

        let realm = document.getElementById('realmInput').value.toLowerCase();
        let character = document.getElementById('characterNameInput').value.toLowerCase();
        let apiURL = 'https://eu.api.blizzard.com/profile/wow/character/' + realm + "/" + character + "/collections/mounts?namespace=profile-eu&locale=de_de";

        fetch(tokenURL, options).then(response => response.json()).then(data => {
            console.log(data)

            fetch(apiURL, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + data.access_token
                }
            }).then(response => response.json()).then(data => {
                console.log(data);

                /* code only gets set if an error occurs */
                if (!data.code) {
                    this.setState({mounts: data.mounts});
                }
            }).catch(reason => console.error(reason));
        }).catch(reason => console.error(reason));
    }
}