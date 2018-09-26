import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import {Tracker} from 'meteor/tracker';

import {Links} from '../api/links';

export default class LinksList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      links: []
    }
  }
  componentDidMount() {
    this.linksTracker = Tracker.autorun(() => {
      Meteor.subscribe('links');
      const links = Links.find().fetch();
      this.setState({
        links
      });
    });
  }
  componentWillUnmount() {
    this.linksTracker.stop();
  }
  renderLinksListItens() {
    return this.state.links.map((link, key) => {
      return <p key={key}>{link.url}</p>;
    })
  }
  render() {
    return (
      <div>
        <h2>Lista de links</h2>
        <div>
          {this.renderLinksListItens()}
        </div>
      </div>
    );
  }
}
