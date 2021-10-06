import React from "react";

export default class Mounts extends React.Component {
    componentDidMount() {
        fetch(this.props.apiURL, {
            // fixme :: pass as props
            method: 'GET',
            headers: {
                'namespace': 'profile-eu',
                'locale': 'de_de',
                'access_token': ''
            }
        }).then(response => response.json()).then(data => {
            console.log(data);
        }).catch(reason => console.error(reason));
    }

    render() {
        return (
            <div />
        )
    }
}