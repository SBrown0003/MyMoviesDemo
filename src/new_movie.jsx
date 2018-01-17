import React from 'react';
import { Alert, Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';


class NewMovie extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            movieTextValue: '',
            movieDraft:  {title: ''},
            showEmptyError: false,
        };
    }
    handleAdd = (movie) => {
        this.errorOnlyIfEmpty(movie);
        this.props.handleClick(movie);
        this.resetLocalState();
    };
    resetLocalState = () => {
        this.setState({movieTextValue:''});
        this.setState({movieDraft: {title: ''}});
        this.setState({showEmptyError: false});
    };
    errorOnlyIfEmpty = (movie) => {
        if(movie.title) {
            this.setState({showEmptyError: false});
            return;
        }
        this.setState({showEmptyError: true});
    };


    render() {
        const addMovieText = React.createElement('h4', {}, 'Add Movie');
        let movieDraft = this.state.movieDraft;
        let showEmptyError = this.state.showEmptyError;
        let handleChange = (event) => {
            movieDraft.title = event.target.value;
            this.setState({movieDraft: movieDraft});
            this.setState({movieTextValue: this.state.movieDraft.title});
            event.preventDefault();
        };
        handleChange = handleChange.bind(this);

        return (
            <div>
                {addMovieText}
                <label>
                    <Input type="text" value={this.state.movieTextValue} onChange={handleChange}/>
                </label>

                <a onClick={(e) => this.handleAdd(this.state.movieDraft, e)}>
                    <i className="far fa-plus-square fa-2x"></i>
                </a>
                {showEmptyError ?
                    <Alert color="danger">
                        Title cannot be blank.
                    </Alert>
                    :
                    null
                }
            </div>
        );
    };
}

export default NewMovie;