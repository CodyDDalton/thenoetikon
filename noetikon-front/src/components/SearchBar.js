import MagnifyingGlass from '../images/magnifier.png';
import DropDown from '../images/down-chevron.png';

const SearchBar = () => {
    return(
        <div id="search-section">
            <div id="bar-section">
                <h2 id="search-label">Search</h2>
                <div id="search-bar">
                    <input type="text" id="search-input" required></input>
                    <button id="search-button"><img src={MagnifyingGlass} alt="search button" id="search-logo" /></button>
                </div>
            </div>
            <div id="filter-section">
                <button id="filter-button"><img src={DropDown} alt="choose filters" id="filter-logo" /><p id="filter-label">Filters</p></button>
            </div>
        </div>
    )
}

export default SearchBar;