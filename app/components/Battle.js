import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

function PlayerPreview(props) {
  return (
    <div>
      <div className='column'>
        <img
          className='avatar'
          src={props.avatar}
          alt={`Avatar for ${props.username}`}
        />
        <h2 className='username'>@{props.username}</h2>
      </div>
      <button
        className='reset'
        onClick={props.onReset.bind(null, props.id)}>
          Reset
      </button>
    </div>
  );
}

PlayerPreview.propTypes = {
  avatar: propTypes.string.isRequired,
  username: propTypes.string.isRequired,
  id: propTypes.string.isRequired,
  onReset: propTypes.func.isRequired
}

class PlayerInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }
  handleChange(event) {
    const value = event.target.value;

    this.setState(function() {
      return {
        username: value
      }
    });
  }
  handleSubmit(event) {
    event.preventDefault();

    this.props.onSubmit(
      this.props.id,
      this.state.username
    )
  }

  render() {
    return (
      <form className='column' onSubmit={this.handleSubmit}>
        <label className='header' htmlFor='username'>
          {this.props.label}
        </label>
        <input
          id='username'
          placeholder='github username'
          type='text'
          autoComplete='off'
          value={this.state.username}
          onChange={this.handleChange}
        />
        <button
          className='button'
          type='submit'
          disabled={!this.state.username}>
            Submit
        </button>
      </form>
    );
  }
}

PlayerInput.propTypes = {
  id: propTypes.string.isRequired,
  label: propTypes.string.isRequired,
  onSubmit: propTypes.func.isRequired
}

class Battle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playerOneName: '',
      playerTwoName: '',
      playerOneImage: null,
      playerTwoImage: null
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(id, username) {
    this.setState(function() {
      var newState = {};
      newState[id + 'Name'] = username;
      newState[id + 'Image'] = `https://github.com/${username}.png?size=200`;
      return newState;
    });
  }
  handleReset(id) {
    this.setState(function() {
      var newState = {};
      newState[id + 'Name'] = '';
      newState[id + 'Image'] = null;
      return newState;
    });
  }
  render() {
    const match = this.props.match;
    const playerOneName = this.state.playerOneName;
    const playerTwoName = this.state.playerTwoName;
    const playerOneImage = this.state.playerOneImage;
    const playerTwoImage = this.state.playerTwoImage;


    return (
      <div>
        <div className='row'>
        {!playerOneName &&
          <PlayerInput
            id='playerOne'
            label='Player One'
            onSubmit={this.handleSubmit}
            />}

              {playerOneImage !== null &&
                <PlayerPreview
                  avatar={playerOneImage}
                  username={playerOneName}
                  onReset={this.handleReset}
                  id='playerOne'
                />
              }

            {playerTwoImage !== null &&
          <PlayerInput
            id='playerTwo'
            label='Player Two'
            onSubmit={this.handleSubmit}
            />}

            {!playerTwoName &&
              <PlayerPreview
                avatar={playerTwoImage}
                username={playerTwoName}
                onReset={this.handleReset}
                id='playerTwo'
              />
            }
        </div>

        {playerOneImage && playerTwoImage &&
          <Link
          className='button'
          to={{
            pathname: match.url + '/results',
            search: '?playerOneName=' + playerOneName + '&playerTwoName=' + playerTwoName
          }}>
          Battle
          </Link>
        }
      </div>
    );
  }
}

export default Battle;
