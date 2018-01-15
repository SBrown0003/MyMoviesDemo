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
    const addMovieText = React.createElement('h2', {}, 'Add Movie');
    let movieDraft = {title: ''};
    let handleChange = (event) => {
        movieDraft.title = event.target.value;
        event.preventDefault();
    };
    handleChange = handleChange.bind(this);

    return (
        <div>
            {addMovieText}
            <label>
                <input type="text" onChange={handleChange} />
            </label>

             <Button
                 handleClick={props.handleClick}
                 label="Add"
                 movie={movieDraft}
             />
        </div>
    );
};

let MovieRow = (props) => {
    let movie = props.movie;
    let editable = movie.editable;
    let favorite = movie.favorite;
    let handleChange = (event) => {
        let value = event.target.value;
        movie.title = value ? value : movie.title;
        event.preventDefault();
    };
    handleChange = handleChange.bind(this);

    let editMovie =  () => (
        <div>
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
        </div>
    );

    let staticMovie = () => (
        <div>
            {movie.title}

            {favorite ?
                <Button
                handleClick={props.handlers.handleFavClick}
                label="*"
                movie={movie}
                />
                :
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
        </div>
    );

    return (
        <li key={props.id} className="MovieRow">
            {editable ? editMovie() : staticMovie()}
        </li>
    );
};

let MovieList = (props) => {
    return (
        <ul>
            {props.movies.map((movie) =>
                <MovieRow
                    movie = {movie}
                    handlers = {props.handlers}
                    id = {movie.id}
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
        movie.favorite = !movie.favorite;
        this.updateMovieState(movie);
    }

    handleAddClick(movie) {
        if(!movie.title){
            alert("Title cannot be blank");
            return;
        }

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
        const title = React.createElement('h1', {}, 'My Movies');

        let handlers = {
            handleFavClick: this.handleFavClick.bind(this),
            handleSaveClick: this.handleSaveClick.bind(this),
            handleDeleteClick: this.handleDeleteClick.bind(this),
            handleEditClick: this.handleEditClick.bind(this)
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

// ========================================

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
