import './index.css';

interface SideNavProps {
    selectedState: string;
    onStateChange: (state: string) => void;
}

const SideNav = ({ selectedState, onStateChange }: SideNavProps) => {
    const states = ['All', 'VIC', 'NSW', 'SA', 'QLD'];

    return (
        <div className="sidenav">
            <div className="filter-section">
                <h3>Filter Stations</h3>
                <div className="filter-group">
                    <label htmlFor="state-filter">State:</label>
                    <select
                        id="state-filter"
                        value={selectedState}
                        onChange={(e) => onStateChange(e.target.value)}
                    >
                        {states.map((state) => (
                            <option key={state} value={state}>
                                {state}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default SideNav;
