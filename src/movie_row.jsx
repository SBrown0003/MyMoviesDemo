import React from 'react';
import { Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';

class MovieRow extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            movie: Object.assign({}, this.props.movie),
            editable: false
        }
    }

    handleEditClick = () => {
        this.toggleEditableState();
    };
    handleSaveClick = () => {
        this.toggleEditableState();
        return this.props.handlers.handleSaveClick;
    };

    toggleEditableState = () => this.setState({editable : !this.state.editable});

    editStateMovie = (movie) => {
        let handleChange = (event) => {
            let value = event.target.value;
            movie.title = value ? value : movie.title;
            event.preventDefault();
        };
        handleChange = handleChange.bind(this);

        return (
            <div>
                <label>
                    <input
                        type="text"
                        placeholder={movie.title}
                        onChange={handleChange}
                    />
                </label>
                <Button onClick={(e) => this.handleSaveClick(movie, e)}>save</Button>
                <Button onClick={(e) => this.props.handlers.handleDeleteClick(movie,e)}> delete </Button>
            </div>
        );
    };

    staticMovie = (movie) => {
        let favorite = movie.favorite;
        let title = movie.title;

        return (
            <div>
                {title}
                <a onClick={(e) => this.handleEditClick(movie, e)}>
                    <i className="fas fa-pencil-alt"/></a>

                {favorite ?
                    <a onClick={(e) => this.props.handlers.handleFavClick(movie, e)}>
                        <i className="fas fa-star fa-2x"/>
                    </a>
                    :
                    <a onClick={(e) => this.props.handlers.handleFavClick(movie, e)}>
                        <i className="far fa-star"/>
                    </a>
                }
            </div>
        );
    };

    render() {
        let movie = this.state.movie;
        let editable = this.state.editable;

        return (
            <div>{editable ? this.editStateMovie(movie) : this.staticMovie(movie)}</div>
        );
    };
}

export default MovieRow;