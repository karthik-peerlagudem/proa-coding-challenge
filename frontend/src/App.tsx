import { useState } from 'react';
import './App.css';

import { Header } from './components/header';
import LoadGoogleMap from './components/load-google-map';
import SideNav from './components/side-nav';

function App() {
    const [selectedState, setSelectedState] = useState('All');

    const handleStateChange = (state: string) => {
        setSelectedState(state);
    };
    return (
        <div className="app-container">
            <Header />
            <div className="content-wrapper">
                <SideNav
                    selectedState={selectedState}
                    onStateChange={handleStateChange}
                />
                <main className="main-content">
                    <LoadGoogleMap selectedState={selectedState} />
                </main>
            </div>
        </div>
    );
}

export default App;
