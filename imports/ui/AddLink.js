import {Meteor} from 'meteor/meteor';
import Modal from 'react-modal';
import React, {Component} from 'react';

export default class AddLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      idOpen: false,
      error: ''
    }
  }
  onSubmit(e) {
    e.preventDefault();
    const url = this.state.url;
    Meteor.call('links.insert', url, (error, res) => {
      if (!error) {
        this.handleModalClose();
      } else {
        this.setState({error: error.reason})
      }
    });
  }
  onChange(e) {
    this.setState({
      url: e.target.value.trim()
    });
  }
  handleModalClose() {
    this.setState({isOpen: false, url: '', error: ''})
  }
  render() {
    return (
      <div>
        <button onClick={() => this.setState({isOpen: true})}>+ Add Link</button>
        <Modal
          isOpen={this.state.isOpen}
          contentLabel="Add Link"
          onAfterOpen={() => this.refs.url.focus()}
          onRequesClose={this.handleModalClose.bind(this)}
          ariaHideApp={false}>
          <p>Adicionar novo link</p>
          {!!this.state.error ? <p>{this.state.error}</p> : null}
          <form onSubmit={this.onSubmit.bind(this)}>
            <input
              type="text"
              placeholder="URL"
              ref="url"
              value={this.state.url}
              onChange={this.onChange.bind(this)}/>
            <button>Add Link</button>
          </form>
          <button onClick={this.handleModalClose.bind(this)}>Cancel</button>
        </Modal>
      </div>
    )
  }
}
