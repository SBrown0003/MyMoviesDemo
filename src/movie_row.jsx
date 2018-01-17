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
            <div className="row">
                <div className="col-3">
                    <label>
                        <input
                            type="text"
                            placeholder={movie.title}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div className="col">
                    <Button onClick={(e) => this.handleSaveClick(movie, e)}>save</Button>
                    <Button onClick={(e) => this.props.handlers.handleDeleteClick(movie,e)}> delete </Button>
                </div>
            </div>
        );
    };

    staticMovie = (movie) => {
        let favorite = movie.favorite;
        let title = movie.title;
        let starClassName = favorite ? "fa fa-star fa-lg" : "fa fa-star-o fa-lg";

        return (
            <div className="row">
                <div className="col-3"> {title} </div>

                <div className="col">
                    <a onClick={(e) => this.handleEditClick(movie, e)}>
                        <i className="fa fa-pencil fa-lg" aria-hidden="true"></i>
                    </a>

                    <a onClick={(e) => this.props.handlers.handleFavClick(movie, e)}>
                        <i className={starClassName}/>
                    </a>
                </div>
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