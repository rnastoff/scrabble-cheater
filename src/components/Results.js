import React from 'react';
import Column from './Column';
import moment from 'moment';

class Results extends React.Component {
    render() {
        return (
            <div className="results">
                <Column
                    confirmedWords={this.props.confirmedWords.slice(0, Math.round(this.props.confirmedWords.length / 2))}
                    key={moment().millisecond(1)}
                />
                <Column
                    confirmedWords={this.props.confirmedWords.slice(Math.round(this.props.confirmedWords.length / 2))}
                    confirmedWordsAll={this.props.confirmedWords}
                    emptyCheck={this.props.confirmedWords.length % 2}
                    key={moment().millisecond(2)}
                />

            </div>
        )
    }
}

export default Results;