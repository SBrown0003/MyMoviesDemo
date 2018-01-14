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

let MovieRowEditor = (props) => {
  return (
      <div></div>
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
             handleClick={props.handlers.handleAddClick}
             label="Add"
             movie={movieDraft}
         />]
    );
};

let MovieRow = (props) => {
    let movie = props.movie;
    return (
        <li key={movie.id} className="MovieRow">
            {movie.title}
            <Button
                handleClick={props.handlers.handleFavClick}
                label="*"
                movie={movie}
            />
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
                />
            )}
        </ul>
    );
};

class Container extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            count: 0,
            movies:[],
        }
    }


    handleFavClick(movie) {
        console.log(movie);
        let movies = this.state.movies.map((movie) => movie);
        let index = movies.indexOf(movie);
        movies.splice(index, 1, movie);
        this.setState({movies: movies})
    }

    handleAddClick(movie) {
        let movies = this.state.movies.map((movie) => movie);
        movie.id = this.state.count;
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

    };

    handleDeleteClick() {

    }

    render() {

        let handlers = {
            handleFavClick: this.handleFavClick.bind(this),
            handleAddClick: this.handleAddClick.bind(this),
            handleSaveClick: this.handleSaveClick.bind(this),
            handleDeleteClick: this.handleDeleteClick.bind(this)
        };
        return (

            [<MovieList
                movies = {this.state.movies}
                handlers = {handlers}
            />, <NewMovie handlers = {handlers}/>]

        );
    }
}

// ========================================

ReactDOM.render(
    <Container />,
    document.getElementById('root')
);

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}
