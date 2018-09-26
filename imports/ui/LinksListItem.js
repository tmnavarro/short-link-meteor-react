import React, {Component} from 'react';
import Clipboard from 'clipboard';

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
        <a href={this.props._id}>{this.props.shortUrl}<br/></a>
        <button ref="copy" data-clipboard-text={this.props.shortUrl}>
          {this.state.justCopied ? 'Copied' : 'Copy'}
        </button>
      </div>
    )
  }
}
