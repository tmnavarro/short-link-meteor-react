import {Meteor} from 'meteor/meteor';
import React, {Component} from 'react';

export default class AddLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: ''
    }
  }
  onSubmit(e) {
    e.preventDefault();
    const url = this.state.url;
    if (url) {
      Meteor.call('links.insert', url, (error, res) => {
        if (!error) {
          this.setState({
            url: ''
          });
        }
      });
    }
  }
  onChange(e) {
    this.setState({
      url: e.target.value.trim()
    });
  }
  render() {
    return (
      <div>
        <p>Adicionar novo link</p>
        <form onSubmit={this.onSubmit.bind(this)}>
          <input
            type="text"
            placeholder="URL"
            value={this.state.url}
            onChange={this.onChange.bind(this)}/>
          <button>Add Link</button>
        </form>
      </div>
    )
  }
}
