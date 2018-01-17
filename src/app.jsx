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

    render() {
        const title = React.createElement('h1', {}, 'My Movies');

        let handlers = {
            handleFavClick: this.handleFavClick.bind(this),
            handleSaveClick: this.handleSaveClick.bind(this),
            handleDeleteClick: this.handleDeleteClick.bind(this)
        };
        return (
            <div className = "app container">
                {title}
                <MovieList
                    movies = {this.state.movies}
                    handlers = {handlers}
                />

                <hr/>

                <div className="row">
                    <NewMovie handleClick = {this.handleAddClick.bind(this)}/>
                </div>
            </div>
        );
    }
}

export default App;