import React from 'react';

class SearchBar extends React.Component {

    onSearch = (e) => {
        e.preventDefault();
        this.props.searchDictionary();
    };

    render() {
        return (
            <div className="search-bar">
                <form id="form">
                    <input
                        type="text"
                        name="letters"
                        placeholder="Enter letters"
                        id="input"
                        value={this.props.searchLetters}
                        onChange={this.props.onLettersChange}
                    />
                    <input
                        type="submit"
                        value="SEARCH"
                        id="search"
                        onClick={this.onSearch}
                    />
                </form>
                <div className="search-criteria">Up to 9 Letters. No commas, no spaces.</div>
            </div>
        )
    }
}

export default SearchBar;