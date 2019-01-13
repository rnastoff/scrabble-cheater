import React from 'react';
import ResultsCategoryBox from './ResultsCategoryBox';
import Results from './Results';

class ResultsBox extends React.Component {
    render() {
        return (
            <div className="results-box">
                <ResultsCategoryBox />
                <Results
                    confirmedWords={this.props.confirmedWords}
                />
            </div>
        )
    }
}

export default ResultsBox;