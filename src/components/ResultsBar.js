import React from 'react';

class ResultsBar extends React.Component {

    render() {
        return (
            <div className="result-bar" id="result-bar">
                <div className="result-bar-text">{this.props.confirmedWords.length} RESULTS</div>
                <div className="sort-by">SORT BY:</div>
                <div className="result-bar-sort">
                    <div className="sort-top" onClick={this.props.toggleDropdownVisibility}>

                        <span className="sort-One">{this.props.sortType[0]}</span>
                        <svg className="" viewBox="0 0 15 7" width="12" height="12" fill="currentColor" onClick={this.onSortClick}>
                            <path d="M13.974.132a.614.614 0 0 0-.762 0L7.17 5.341 1.12.132C.916-.044.563-.037.376.125a.398.398 0 0 0-.167.332c0 .058.012.116.036.17a.385.385 0 0 0 .12.155l6.427 5.54a.568.568 0 0 0 .378.135.568.568 0 0 0 .377-.135l6.427-5.54a.422.422 0 0 0 .156-.325.42.42 0 0 0-.156-.325z"></path>
                            <path d="M13.974.132a.614.614 0 0 0-.762 0L7.17 5.341 1.12.132C.916-.044.563-.037.376.125a.398.398 0 0 0-.167.332c0 .058.012.116.036.17a.385.385 0 0 0 .12.155l6.427 5.54a.568.568 0 0 0 .378.135.568.568 0 0 0 .377-.135l6.427-5.54a.422.422 0 0 0 .156-.325.42.42 0 0 0-.156-.325z"></path>
                        </svg>


                </div>
                    {this.props.dropdownVisibility &&
                        <div className="sort-dropdown">
                            <div className="sort-Two sortButton">
                                <button onClick={() => this.props.handleSort(this.props.sortType[1], this.props.confirmedWords)}>
                                    {this.props.sortType[1]}
                                </button>
                            </div>
                            <div className="sort-Three sortButton">
                                <button onClick={() => this.props.handleSort(this.props.sortType[2], this.props.confirmedWords)}>
                                    {this.props.sortType[2]}
                                </button>
                            </div>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default ResultsBar;