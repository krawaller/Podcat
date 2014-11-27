var Reflux = require('reflux');
var actions = require('./player_actions.js');

var store = Reflux.createStore({
  init: function () {
    this.player = new Audio();
    this.listenToMany(actions);
  },
  onPlay: function (url, autoplay) {
    // Don't change src if current url is already playing
    if (this.player.src === url) {
      this.player.play();
    }
    // Else change, and play unless autoplay is false
    else {
      this.player.src = url;

      if (typeof autoplay === 'undefined' || autoplay === true) {
        this.player.play();
      }
    }

    this.trigger(!this.player.paused);
  },
  onPause: function () {
    this.player.pause();
    this.trigger(false);
  },
  onToggle: function() {
    if (this.player.paused) {
      this.player.play();
    } else {
      this.player.pause();
    }

    this.trigger(!this.player.paused);
  }
});

module.exports = store;