import React from 'react';
import NewMovie from './new_movie';
import MovieList from './movie_list';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            count: 0,
            movies:[],
        }
    }

    handleFavClick(movie) {
        console.log(movie);
        movie.favorite = !movie.favorite;
        this.updateMovieState(movie);
    }

    handleAddClick(movie) {
        if(!movie.title){
            return;
        }

        //create new movie with default values
        let movies = this.state.movies.map((movie) => movie);
        movie.id = this.state.count;
        movie.editable = false;
        movie.favorite = false;
        movies.push(movie);
        this.setState(
            {
                count: (this.state.count + 1),
                movies: movies
            }
        );
    }
    handleEditBlur(movie) {
        this.toggleEditableState(movie);
    }

    handleEditClick(movie) {
        this.toggleEditableState(movie);
    };

    handleSaveClick(movie) {
        this.updateMovieState(movie);
    };

    handleDeleteClick(movie) {
        let movies = this.state.movies.map((movie) => movie);
        let index = movies.indexOf(movie);
        movies.splice(index, 1);
        this.setState({movies: movies});
    }

    updateMovieState (movie) {
        let movies = this.state.movies.map((movie) => movie);
        let index = movies.indexOf(movie);
        movies.splice(index, 1, movie);
        this.setState({movies: movies});
    }

    toggleEditableState(movie){
        movie.editable = !movie.editable;
        this.updateMovieState(movie);
    }

    render() {
        const title = React.createElement('h1', {}, 'My Movies');

        let handlers = {
            handleFavClick: this.handleFavClick.bind(this),
            handleSaveClick: this.handleSaveClick.bind(this),
            handleDeleteClick: this.handleDeleteClick.bind(this),
            handleEditClick: this.handleEditClick.bind(this),
            handleEditBlur: this.handleEditBlur.bind(this)
        };
        return (
            <div>
                {title}
                <MovieList
                    movies = {this.state.movies}
                    handlers = {handlers}
                />
                <NewMovie handleClick = {this.handleAddClick.bind(this)}/>
            </div>

        );
    }
}

export default App;