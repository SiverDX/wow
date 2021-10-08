import React from "react";
import Mounts from "./Mounts";
import Pets from "./Pets";
import {fetchData} from "../api/collections/fetchData";

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
                <input id='characterInput' placeholder='Character Name'/>
                <button onClick={this.requestData}>Request Data</button>
                {this.state.mounts &&
                <Mounts data={this.state.mounts}/>
                }
                {this.state.pets &&
                <Pets data={this.state.pets}/>
                }
            </div>
        )
    }

    requestData = async () => {
        let realm = document.getElementById('realmInput').value.toLowerCase();
        let character = document.getElementById('characterInput').value.toLowerCase();

        if (!(realm && character)) {
            console.warn(`realm (${realm}) and / or character (${realm}) not set`);

            return;
        }

        let mounts = await fetchData(realm, character, 'mounts', this.props.namespace, this.props.locale);
        let pets = await fetchData(realm, character, 'pets', this.props.namespace, this.props.locale);

        this.setState({mounts: mounts, pets: pets});
    }
}