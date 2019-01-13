import React from 'react';
import Header from './Header';
import SearchBar from './SearchBar';
import ResultsBar from './ResultsBar';
import ResultsBox from './ResultsBox';
import Footer from './Footer';

import 'normalize.css/normalize.css';
import '../App.css';

import {scrabbleDict} from '../dictionary/scrabble-dictionary.js';

// -The letters are searched
// -Added to tempArray
// -Wrapped into an array of objects
// -Sorted
// -Then set to state
//
// **tempWords is being passed by reference from function to function,
// that's why this works.
//
// -setState for the words only happens once at the very end
// -There's no need to reset the confirmedWords in state,
// because it's completely rewritten every new search



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
        this.compareLetterSection();
    };

    compareLetterSection = () => { //tempWords is being passed by reference to all functions downstream
        let tempWords = [];
        for (let letterSection = 0; letterSection < scrabbleDict.length; letterSection++) {
            let letter = scrabbleDict[letterSection][0][0];
            if (this.state.searchLetters.includes(letter)) {
                this.compareWordsOfSection(letterSection, tempWords);
            }
        }
        this.wrapWords(tempWords);
    };

    compareWordsOfSection = (letterSection, tempWords) => {
        for (let wordIndex = 0; wordIndex < scrabbleDict[letterSection].length; wordIndex++) {
            if (scrabbleDict[letterSection][wordIndex].length <= this.state.searchLetters.length) {
                this.compareLettersOfWord(letterSection, wordIndex, tempWords);
            }
        }
    };

    compareLettersOfWord = (letterSection, wordIndex, tempWords) => {
        let word = scrabbleDict[letterSection][wordIndex];
        let tempLetters = this.state.searchLetters;
        for (let letterIndex = 1; letterIndex < word.length; letterIndex++) {
            let letter = scrabbleDict[letterSection][wordIndex][letterIndex];
            if (!tempLetters.includes(letter)) {
                return;
            }
        }
        if (this.checkForMultipleLetters(word)) {
            tempWords.push(word);
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

    wrapWords = (tempWords) => {
        let wrappedWords = [];
        for (let i=0; i < tempWords.length; i++) {
            let wordObject = {
                word: tempWords[i],
                points: this.getPointsForWord(tempWords[i])
            };
            wrappedWords.push(wordObject);
        }
        this.handleSort(this.state.sortType[0], wrappedWords);
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

    handleSort = (word, wrappedWords) => {
        if (word === "Length") this.sortByLength(wrappedWords);
        else if (word === "Points") this.sortByPoints(wrappedWords);
        else if (word === "Word") this.sortByWord(wrappedWords);
        this.setState({dropdownVisibility: false});
        this.arrangeSortDropdown(word);
    };

    arrangeSortDropdown = (word) => {
        let newSortType = this.state.sortType;
        newSortType.splice(newSortType.indexOf(word), 1);
        newSortType.unshift(word);
        this.setState({sortType: newSortType});
    };

    sortByLength = (wrappedWords) => {
        let wrappedWordsCopy = wrappedWords.slice(0);
        wrappedWordsCopy.sort(function (a, b) {
            return b.word.length - a.word.length;
        });
        this.setState({confirmedWords: wrappedWordsCopy});
    };

    sortByPoints = (wrappedWords) => {
        let wrappedWordsCopy = wrappedWords.slice(0);
        wrappedWordsCopy.sort(function (a, b) {
            return b.points - a.points;
        });
        this.setState({confirmedWords: wrappedWordsCopy});
    };

    sortByWord = (wrappedWords) => {
        let wrappedWordsCopy = wrappedWords.slice(0);
        wrappedWordsCopy.sort((a, b) => {
            if (a.word < b.word) return -1;
            if (a.word > b.word) return 1;
            return 0;
        });
        this.setState({confirmedWords: wrappedWordsCopy});
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
