import React from "react";
import Mounts from "./Mounts";

export default class Characters extends React.Component {
    constructor(props) {
        super(props);

        let apiURL = 'https://de.api.blizzard.com/profile/wow/character/Thrall/Nadare/collections';

        fetch(apiURL, {
            method: 'GET',
            headers: {
                'namespace': 'profile-eu',
                'locale': 'de_de',
                'access_token': ''
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