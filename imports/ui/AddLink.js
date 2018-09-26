import {Meteor} from 'meteor/meteor';
import React, {Component} from 'react';

export default class AddLink extends Component {
  onSubmit(e) {
    const url = this.refs.url.value.trim();
    e.preventDefault();

    if (url) {
      Meteor.call('links.insert', url);
      this.refs.url.value = '';
    }
  }
  render() {
    return (
      <div>
        <p>Adicionar novo link</p>
        <form onSubmit={this.onSubmit.bind(this)}>
          <input type="text" ref="url" placeholder="URL"/>
          <button>Add Link</button>
        </form>
      </div>
    )
  }
}
