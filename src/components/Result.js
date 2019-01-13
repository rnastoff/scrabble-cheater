import React from 'react';

class Result extends React.Component {

    render() {
        return (
            <div>
                <div className="result">
                    <div className="word">{this.props.word}</div>
                    <div className="score">{this.props.points}</div>
                </div>

            </div>
        )
    }
}

export default Result;