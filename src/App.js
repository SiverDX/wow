import './App.css';
import Collections from "./components/Collections.jsx";
import React from "react";

function App() {
    return (
        <div className="App">
            <Collections namespace='profile-eu' locale='de_de'/>
        </div>
    );
}

export default App;
