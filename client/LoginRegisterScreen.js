
import React from 'react';
import Ajax from 'simple-ajax';

export default class LoginRegisterScreen extends React.Component {
  state = {
    logging: false
  };

  loginRegister(event) {
    console.log(this.refs.form.inputName.value);
    console.log(this.refs.form.inputPassword.value);


    this.setState({
      logging: true
    });


    var ajax = new Ajax(
      {
        url: '/api/login_register',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
          user: this.refs.form.inputName.value,
          password: this.refs.form.inputPassword.value,
        })
      }
    );

    ajax.on('success', (e) => {
      var res = JSON.parse(e.target.response);
      window.location = '/';
    });

    ajax.on('error', () => {
      this.setState({
        logging: false
      });
    });

    ajax.send();

    event.preventDefault();
  }

  render() {
    return <div>
      <form className="form-horizontal" ref="form" onSubmit={this.loginRegister.bind(this)}>
          <div className="form-group">
              <label htmlFor="inputName" className="col-sm-2 control-label">Name</label>
              <div className="col-sm-10">
                  <input type="text" className="form-control" id="inputName" placeholder="Name" />
              </div>
          </div>
          <div className="form-group">
              <label htmlFor="inputPassword" className="col-sm-2 control-label">Password</label>
              <div className="col-sm-10">
                  <input type="password" className="form-control" id="inputPassword" placeholder="Password" />
              </div>
          </div>
          <div className="form-group">
              <div className="col-sm-offset-2 col-sm-10">
                  <button type="submit" className="btn btn-default">{this.state.logging ? "Please Wait..." : "Sign in / Register"}</button>
              </div>
          </div>
      </form>
    </div>
  }
}