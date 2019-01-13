import React from 'react';
import Header from './Header';
import SearchBar from './SearchBar';
import ResultsBar from './ResultsBar';
import ResultsBox from './ResultsBox';
import Footer from './Footer';

import 'normalize.css/normalize.css';
import '../App.css';

import {scrabbleDict} from '../dictionary/scrabble-dictionary.js';

class ScrabbleCheater extends React.Component {

    constructor() {
        super();
        this.state = {
            searchLetters: "",
            maxLength: 9,
            tempWords: [],
            confirmedWords: [],
            sortType: ["Word", "Points", "Length"],
            dropdownVisibility: false
        };
    }

    onLettersChange = (e) => {
        let letters = e.target.value.substr(0, this.state.maxLength);
        if (!letters || letters.match(/^[a-zA-Z]+$/)) {
            this.setState({searchLetters: letters.toLowerCase()});
        }
    };

    searchDictionary = () => {
        this.setState({confirmedWords: []}, () => {
            this.compareLetterSection();
        });
    };

    compareLetterSection = () => {
        for (let letterSection = 0; letterSection < scrabbleDict.length; letterSection++) {
            let letter = scrabbleDict[letterSection][0][0];
            if (this.state.searchLetters.includes(letter)) {
                this.compareWordsOfSection(letterSection);
            }
        }
    };

    compareWordsOfSection = (letterSection) => {
        for (let wordIndex = 0; wordIndex < scrabbleDict[letterSection].length; wordIndex++) {
            if (scrabbleDict[letterSection][wordIndex].length <= this.state.searchLetters.length) {
                this.compareLettersOfWord(letterSection, wordIndex);
            }
        }
    };

    compareLettersOfWord = (letterSection, wordIndex) => {
        let word = scrabbleDict[letterSection][wordIndex];
        let tempLetters = this.state.searchLetters;
        for (let letterIndex = 1; letterIndex < word.length; letterIndex++) {
            let letter = scrabbleDict[letterSection][wordIndex][letterIndex];
            if (!tempLetters.includes(letter)) {
                return;
            }
        }
        if (this.checkForMultipleLetters(word)) {
            this.addToConfirmedWords(word);
        }
    };


    checkForMultipleLetters = (word) => {
        let testLetters = this.state.searchLetters;
        for (let i = 0; i < word.length; i++) {
            let letter = word[i];
            let letterIndex = testLetters.indexOf(letter);
            if (letterIndex >= 0) {
                testLetters = testLetters.slice(0, letterIndex) + testLetters.slice(letterIndex + 1);
                if (i === word.length - 1) {
                    return true;
                }
            }
            else {
                return false;
            }
        }
    };

    addToConfirmedWords = (word) => {
        let points = this.getPointsForWord(word);
        let wordObject = {
            word: word,
            points: points
        };
        this.setState(prevState => ({
            confirmedWords: [...prevState.confirmedWords, wordObject]
        }), () => {
            this.handleSort(this.state.sortType[0]);
        });
    };

    getPointsForWord = (word) => {
        let points = 0;
        let letters = [
            ["eaionrtlsu", 1],
            ["dg", 2],
            ["bcmp", 3],
            ["fhvwy", 4],
            ["k", 5],
            ["jx", 8],
            ["qz", 10]
        ];

        for (let i = 0; i < word.length; i++) {
            for (let j = 0; j < letters.length; j++) {
                if (letters[j][0].includes(word[i])) {
                    points += letters[j][1];
                }
            }
        }
        return points;
    };


    //SORTING
    toggleDropdownVisibility = () => {
        this.setState({dropdownVisibility: !this.state.dropdownVisibility});
    };

    handleSort = (word) => {
        if (word === "Length") this.sortByLength();
        else if (word === "Points") this.sortByPoints();
        else if (word === "Word") this.sortByWord();
        this.setState({dropdownVisibility: false});
        this.arrangeSortDropdown(word);
    };

    arrangeSortDropdown = (word) => {
        let newSortType = this.state.sortType;
        newSortType.splice(newSortType.indexOf(word), 1);
        newSortType.unshift(word);
        this.setState({sortType: newSortType});
    };

    sortByLength = () => {
        let sorted = this.state.confirmedWords;
        sorted.sort(function (a, b) {
            return b.word.length - a.word.length;
        });
        this.setState({confirmedWords: sorted});
    };

    sortByPoints = () => {
        let sorted = this.state.confirmedWords;
        sorted.sort(function (a, b) {
            return b.points - a.points;
        });
        this.setState({confirmedWords: sorted});
    };

    sortByWord = () => {
        let sorted = this.state.confirmedWords;
        sorted.sort((a, b) => {
            if (a.word < b.word) return -1;
            if (a.word > b.word) return 1;
            return 0;
        });
        this.setState({confirmedWords: sorted});
    };


    //RENDER
    render() {
        return (
            <div>
                <Header/>
                <SearchBar
                    searchDictionary={this.searchDictionary}
                    searchLetters={this.state.searchLetters}
                    onLettersChange={this.onLettersChange}
                />
                <ResultsBar
                    confirmedWords={this.state.confirmedWords}
                    sortType={this.state.sortType}
                    toggleDropdownVisibility={this.toggleDropdownVisibility}
                    dropdownVisibility={this.state.dropdownVisibility}
                    handleSort={this.handleSort}
                />
                <ResultsBox
                    confirmedWords={this.state.confirmedWords}
                />
                <Footer/>
            </div>
        )
    }
}

export default ScrabbleCheater;
