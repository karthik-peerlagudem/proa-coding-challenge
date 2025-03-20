import { Header } from './components/header';
import LoadGoogleMap from './components/load-google-map';
import './App.css';

function App() {
    return (
        <div className="app-container">
            <Header />
            <main className="main-content">
                <LoadGoogleMap />
            </main>
        </div>
    );
}

export default App;
