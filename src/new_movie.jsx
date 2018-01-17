import React from 'react';
import { Alert, Input, Button, ListGroup, ListGroupItem } from 'reactstrap';

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
            <div className="col new-movie-row">
                {addMovieText}
                <ListGroup>
                    <ListGroupItem>
                        <label>
                            <Input type="text" value={this.state.movieTextValue} onChange={handleChange}/>
                        </label>

                        <Button onClick={(e) => this.handleAdd(this.state.movieDraft, e)}>
                            Add
                        </Button>
                    </ListGroupItem>
                </ListGroup>

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