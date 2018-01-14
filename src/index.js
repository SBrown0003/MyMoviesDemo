import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

let Button = (props) => {
    return (
        <button
            className="btn btn-default"
            onClick={(e) => props.handleClick(props.movie, e)}
        >
            {props.label}
        </button>
    );
};

let NewMovie = (props) => {
    let movieDraft = {title: ''};
    let handleChange = (event) => {
        movieDraft.title = event.target.value;
        event.preventDefault();
    };
    handleChange = handleChange.bind(this);


    return (
        [<label>
            Add Movie:
            <input type="text" onChange={handleChange} />
        </label>,
         <Button
             handleClick={props.handleClick}
             label="Add"
             movie={movieDraft}
         />]
    );
};

let MovieRow = (props) => {
    let movie = props.movie;
    let editable = movie.editable;
    let favorite = movie.favorite;
    let handleChange = (event) => {
        movie.title = event.target.value;
        console.log(event.target);
        event.preventDefault();
    };
    handleChange = handleChange.bind(this);

    let editMovie =  () => (
        <li key={movie.id} className="MovieRow">
            <label>
                <input
                    type="text"
                    placeholder={movie.title}
                    onChange={handleChange}
                />
            </label>
            <Button
                handleClick={props.handlers.handleSaveClick}
                label="save"
                movie={movie}
            />
            <Button
                handleClick={props.handlers.handleDeleteClick}
                label="delete"
                movie={movie}
            />
        </li>
    );

    let staticMovie = () => (
        <li key={movie.id} className="MovieRow">
            {movie.title}

            {favorite ?
                <Button
                handleClick={props.handlers.handleFavClick}
                label="*"
                movie={movie}
                /> :
                <Button
                    handleClick={props.handlers.handleFavClick}
                    label="-"
                    movie={movie}
                />}

            <Button
                handleClick={props.handlers.handleEditClick}
                label="edit"
                movie={movie}
            />
        </li>
    );

    return (
        <div>
            {editable ? editMovie() : staticMovie()}
        </div>
    );
};

let MovieList = (props) => {
    return (
        <ul>
            {props.movies.map((movie) =>
                <MovieRow
                    movie = {movie}
                    handlers = {props.handlers}
                />
            )}
        </ul>
    );
};

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

    handleEditClick(movie) {
        this.toggleEditableState(movie);
    };

    handleSaveClick(movie) {
        this.toggleEditableState(movie);
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

        let handlers = {
            handleFavClick: this.handleFavClick.bind(this),
            handleSaveClick: this.handleSaveClick.bind(this),
            handleDeleteClick: this.handleDeleteClick.bind(this),
            handleEditClick: this.handleEditClick.bind(this)
        };
        return (

            [<MovieList
                movies = {this.state.movies}
                handlers = {handlers}
            />, <NewMovie handleClick = {this.handleAddClick.bind(this)}/>]

        );
    }
}

// ========================================

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
