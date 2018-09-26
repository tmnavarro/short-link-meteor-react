import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import {Tracker} from 'meteor/tracker';

import {Links} from '../api/links';
import LinksListItem from './LinksListItem';

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
    return this.state.links.map((link) => {
      const shortUrl = Meteor.absoluteUrl(link._id)
      return <LinksListItem key={link._id} shortUrl={shortUrl} {...link}/>;
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
