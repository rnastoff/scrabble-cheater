import React from 'react';

class ResultsCategoryBox extends React.Component {
    render() {
        return (
            <div className="results-category-box">
                <div className="results-category">
                    <div className="results-category-word">WORD</div>
                    <div className="results-category-points">POINTS</div>
                </div>
                <div className="results-category">
                    <div className="results-category-word">WORD</div>
                    <div className="results-category-points">POINTS</div>
                </div>
            </div>
        )
    }
}

export default ResultsCategoryBox;