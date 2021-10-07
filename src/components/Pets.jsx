import React from "react";

export default class Pets extends React.Component {
    render() {
        return (
            <ol>
                {this.props.data.pets.map(function (item, index) {
                    return <li key={index}>{item.species.name}</li>;
                })}
            </ol>
        )
    }
}