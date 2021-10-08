import React from "react";

export default class Mounts extends React.Component {
    render() {
        return (
            <div>
                <h1>Mounts ({this.props.data.mounts.length})</h1>
            </div>
        )
    }
}