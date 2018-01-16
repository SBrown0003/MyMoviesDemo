import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { Button, ListGroup, ListGroupItem } from 'reactstrap';
import './index.css';

// let Button = (props) => {
//     return (
//         <button
//             className="btn btn-default"
//             onClick={(e) => props.handleClick(props.movie, e)}
//         >
//             {props.label}
//         </button>
//     );
// };

let NewMovie = (props) => {
    const addMovieText = React.createElement('h2', {}, 'Add Movie');
    let movieDraft = {title: ''};
    let handleChange = (event) => {
        movieDraft.title = event.target.value;
        event.preventDefault();
    };
    let handleClick = () => {
        props.handleClick(movieDraft);
    };
    handleClick = handleClick.bind(this);

    let handleBlur = (event) => event.target.value = '';
    handleBlur = handleBlur.bind(this);
    handleChange = handleChange.bind(this);

    return (
        <div>
            {addMovieText}
            <label>
                <input type="text" onChange={handleChange} onBlur={handleBlur}/>
            </label>

             <Button onClick={(e) => props.handleClick(movieDraft, e)} color ="primary">
                 Add
             </Button>
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
    //
    // let handleBlur = (event) => {
    //     event.target.value = movie.title;
    //     return props.handlers.handleEditBlur;
    // };
    // handleBlur = handleBlur.bind(this);
    handleChange = handleChange.bind(this);

    let editMovie = () => (
        <div>
            <label>
                <input
                    type="text"
                    placeholder={movie.title}
                    onChange={handleChange}
                    // onBlur={}
                />
            </label>
            <Button onClick={(e) => props.handlers.handleSaveClick(movie, e)}>save</Button>
            <Button onClick={(e) => props.handlers.handleDeleteClick(movie,e)}> delete </Button>
        </div>
    );

    let staticMovie = () => (
        <div>
            {movie.title}

            {favorite ?
                <Button onClick={(e) => props.handlers.handleFavClick(movie, e)}>*</Button>
                :
                <Button onClick={(e) => props.handlers.handleFavClick(movie, e)}>-</Button>
            }

            <Button onClick={(e) => props.handlers.handleEditClick(movie, e)}>edit</Button>
        </div>
    );

    return (
        <div>{editable ? editMovie() : staticMovie()}</div>
    );
};

let MovieList = (props) => {

    return (
        <ListGroup>
            {props.movies.map((movie) =>
                <ListGroupItem key = {movie.id}>

                <MovieRow
                movie={movie}
                handlers={props.handlers}
                id={movie.id}
                />
                </ListGroupItem>
            )}
        </ListGroup>
    )};

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
    handleEditBlur(movie) {
        this.toggleEditableState(movie);
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

// ========================================

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
