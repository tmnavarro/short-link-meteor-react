import {Meteor} from 'meteor/meteor';
import React, {Component} from 'react';
import Clipboard from 'clipboard';
import PropTypes from 'prop-types';

export default class LinksListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      justCopied: false
    };
  }
  componentDidMount() {
    this.clipboard = new Clipboard(this.refs.copy);

    this.clipboard.on('success', () => {
      this.setState({ justCopied: true });
      setTimeout(() => {
        this.setState({ justCopied: false });
      },1000);
    }).on('error', () => {
      console.log('Erro ao copiar');
    });
  }
  componentWillUnmount() {
    this.clipboard.destroy();
  }
  render() {
    return (
      <div>
        <h3>{this.props.url}</h3>
        <a target="_blank" href={this.props._id}>{this.props.shortUrl}<br/></a>
        <span>{!this.props.visible}</span>
        <span>{this.props.lastVisitedAt}</span><br/>
        <span>Número de visitas: {this.props.visitedCount}</span><br/>
        <button ref="copy" data-clipboard-text={this.props.shortUrl}>
          {this.state.justCopied ? 'Copied' : 'Copy'}
        </button>
        <button onClick={() => Meteor.call('links.setVisibility', this.props._id, !this.props.visible) }>
          {this.props.visible ? 'Hide' : 'Unhide'}
        </button>
      </div>
    )
  }
}

LinksListItem.propTypes = {
  _id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  shortUrl: PropTypes.string.isRequired,
  visitedCount: PropTypes.number.isRequired
}
