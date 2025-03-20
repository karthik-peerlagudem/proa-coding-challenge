import './index.css';

/**
 * Header Component
 *
 * @component
 * @description Renders the application header with title "Show Me Money"
 *
 */
export const Header = () => {
    return (
        <header className="header">
            <div className="header-container">
                <h1 className="header-title">Proa Solar Farm Map</h1>
            </div>
        </header>
    );
};
