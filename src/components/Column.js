import React from 'react';
import Result from './Result';
import moment from 'moment';


class Column extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            width: props.width
        };
    }

    componentWillMount(){
        this.setState({width: window.innerWidth});
    }

    render() {
        return (
            <div className="column">
                {this.props.confirmedWords.map((element, index) =>
                    <Result word={element.word} points={element.points} confirmedWords={this.props.confirmedWords} key={index + moment().millisecond} />
                )}
                {!this.props.confirmedWords.length % 2 === 0 && this.props.emptyCheck > 0 && this.state.width >= 1000 ?
                    <div className="result" key={moment().millisecond}><div className="word">&nbsp;</div><div className="score">&nbsp;</div></div>
                    : false}
            </div>
        )
    }
}

export default Column;