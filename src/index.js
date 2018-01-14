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
        movie.favorite = !movie.favorite;
        let index = movies.indexOf(movie);
        movies.splice(index, 1, movie);
        // movies = this.deleteMovie(movies, movie);
        // movies.push(movie);
        this.setState({movies: movies})

        // let movies = this.state.movies.map((movie) => movie);
        // let originalMovie = this.getMovie(movie.id);
        // movie.favorite = !originalMovie.favorite;
        // this.deleteMovie(originalMovie.id);
        // movie.id = originalMovie.id;
        // movies.push(movie);
        // this.setState({movies: movies})
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
        console.log(this.state.count);
    }

    handleSaveClick(movie) {

    };

    handleDeleteClick() {

    }

    deleteMovie(movies, movie){
        // let movies = this.state.movies.map((movie) => movie);
        let index = movies.indexOf(movie);
        console.log(index);
        movies.splice(index, 1);
        return movies;

        // movies.forEach((movie) => {
        //     if(movie.id == originalMovie.id){
        //         delete movie;
        //     }
        //     return movies;
        // });
        // this.setState({movies: movies});
    }

    getMovie(key) {
        let movies = this.state.movies.map((movie) => movie);
        return movies.find((movie) => movie.id === key);
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

// function Square(props){
//     return (
//         <button className="square" onClick={props.onClick}>
//             {props.value}
//         </button>
//     );
// }

// class Board extends React.Component {
//     renderSquare(i) {
//         return (
//             <Square
//                 value={this.props.squares[i]}
//                 onClick={() => this.props.onClick(i)}
//             />
//         );
//     }
//
//     render() {
//         return (
//             <div>
//                 <div className="board-row">
//                     {this.renderSquare(0)}
//                     {this.renderSquare(1)}
//                     {this.renderSquare(2)}
//                 </div>
//                 <div className="board-row">
//                     {this.renderSquare(3)}
//                     {this.renderSquare(4)}
//                     {this.renderSquare(5)}
//                 </div>
//                 <div className="board-row">
//                     {this.renderSquare(6)}
//                     {this.renderSquare(7)}
//                     {this.renderSquare(8)}
//                 </div>
//             </div>
//         );
//     }
// }

// class Game extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             history: [{
//                 squares: Array(9).fill(null),
//             }],
//             stepNumber: 0,
//             xIsNext: true,
//         };
//     }
//
//     handleClick(i) {
//         const history = this.state.history.slice(0, this.state.stepNumber + 1);
//         const current = history[history.length - 1];
//         const squares = current.squares.slice();
//         if (calculateWinner(squares) || squares[i]) {
//             return;
//         }
//         squares[i] = this.state.xIsNext ? 'X' : 'O';
//         this.setState({
//             history: history.concat([{
//                 squares: squares,
//             }]),
//             stepNumber: history.length,
//             xIsNext: !this.state.xIsNext,
//         });
//     }
//
//     jumpTo(step) {
//         this.setState({
//             stepNumber: step,
//             xIsNext: (step % 2) === 0,
//         });
//     }
//
//     render() {
//         const history = this.state.history;
//         const current = history[this.state.stepNumber];
//         const winner = calculateWinner(current.squares);
//
//         const moves = history.map((step, move) => {
//             const desc = move ?
//                 'Go to move #' + move :
//                 'Go to game start';
//             return (
//                 <li key={move}>
//                     <button onClick={() => this.jumpTo(move)}>{desc}</button>
//                 </li>
//             );
//         });
//
//         let status;
//         if (winner) {
//             status = 'Winner: ' + winner;
//         } else {
//             status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
//         }
//         return (
//             <div className="game">
//                 <div className="game-board">
//                     <Board
//                         squares={current.squares}
//                         onClick={(i) => this.handleClick(i)}
//                     />
//                 </div>
//                 <div className="game-info">
//                     <div>{status}</div>
//                     <ol>{moves}</ol>
//                 </div>
//             </div>
//         );
//     }
// }

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
