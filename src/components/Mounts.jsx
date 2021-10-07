import React from "react";

export default class Mounts extends React.Component {
    render() {
        return (
            <ol>
                {this.props.data.mounts.map(function (item, index) {
                    return <li key={index}>{item.mount.name}</li>;
                })}
            </ol>
        )
    }
}