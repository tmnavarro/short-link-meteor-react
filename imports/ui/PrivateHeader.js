import {Meteor} from 'meteor/meteor';
import React from 'react';
//
// export default class PrivateHeader extends Component {
//   onLogout() {
//     Accounts.logout();
//   }
//   render() {
//     return (
//       <div>
//         <h1>{this.props.title}</h1>
//         <button onClick={this.onLogout}>Sair</button>
//       </div>
//     );
//   }
// }

const PrivateHeader = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
      <button onClick={() => Accounts.logout()}>Sair</button>
    </div>
  );
};

export default PrivateHeader;
