import React, {Component} from 'react';
import {Link} from 'react-router';
import {Accounts} from 'meteor/accounts-base';

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ''
    }
  }
  onSubmit(e) {
    e.preventDefault();

    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();

    Accounts.createUser({email, password}, (err) => {
      if (err) {
        this.setState({
          error: err.reason
        });
      } else {
        this.setState({
          error: ''
        });
      }
    });
  }
  render() {
    return (
      <div>
        <h1>Crie uma conta</h1>
        {this.state.error ? <p>{this.state.error}</p> : undefined}
        <form onSubmit={this.onSubmit.bind(this)} noValidate>
          <input type="email" ref="email" name="email" placeholder="Email"/>
          <input type="password" ref="password" namep="password" placeholder="Senha"/>
          <button>Criar conta</button>
        </form>
        <Link to="/">Já possuí uma conta?</Link>
      </div>
    );
  }
}
