import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import MovieRow from './movie_row';
import 'bootstrap/dist/css/bootstrap.css';


let MovieList = (props) => {
    return (
        <ListGroup>
            {props.movies.map((movie) =>
                <ListGroupItem key = {movie.id} className="row">
                    <MovieRow
                        movie={movie}
                        handlers={props.handlers}
                        id={movie.id}
                    />
                </ListGroupItem>
            )}
        </ListGroup>
    )
};

export default MovieList;