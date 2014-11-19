/** @jsx React.DOM */

var React = require('react');
var Reflux = require('reflux');
var actions = require('../playlist_actions.js');
var storage = require('../playlist_storage.js');

var Player = React.createClass({
  mixins: [Reflux.ListenerMixin],
  getInitialState: function () {
    return {
      image: '',
      title: ''
    };
  },
  componentDidMount: function () {
    this.audio = new Audio();
    this.listenTo(actions.play, this.onPlay);

    // Load first episode from saved playlist
    storage.all(function (result) {
      this.setState({
        title: result[0].title,
        image: result[0].image
      });
      this.audio.src = result[0].audio_url;
    }.bind(this));
  },
  onPlay: function (episode) {
    this.audio.src = episode.audio_url;
    this.audio.play();
    this.setState({
      title: episode.title,
      image: episode.image
    });
  },
  clickPlay: function (e) {
    this.audio.play();
    e.preventDefault();
  },
  clickPause: function (e) {
    this.audio.pause();
    e.preventDefault();
  },
  render: function () {
    return (
        <div id="player">
          <div className="image"><img src={this.state.image} /></div>
          <div className="title">{this.state.title}</div>
          <div className="controlls">
            <a href="#" onClick={this.clickPlay}>Play</a> :
            : <a href="#" onClick={this.clickPause}>Pause</a>
          </div>
        </div>
        );
  }
});

module.exports = Player;