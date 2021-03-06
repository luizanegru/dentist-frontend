import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import './login.component.css'


import AuthService from "../services/auth.service";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      password: "",
      loading: false,
      message: ""
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }
//   reloadPage(){
//       window.location.reload();
//   }
  handleLogin(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.login(this.state.username, this.state.password).then(
        () => {
          this.props.history.push("/profile");
          window.location.reload();
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            loading: false,
            message: resMessage
          });
        }
      );
    } else {
      this.setState({
        loading: false
      });
    }
  }

  render() {
      
    return (
    <body>
      <div class="signin">
         <div class="back-img">
            <div class="sign-in-text">
                <h2 class="active">Sign In</h2>
            </div>
            <div class="layer">
            </div>
            <p class="point">&#9650;</p>
        </div>
        <div class="form-section">
          <Form action="#"
            onSubmit={this.handleLogin}
            ref={c => {
              this.form = c;
            }}
          >
            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
              <Input 
                type="text"
                attern=".{8,}" 
                placeholder = "Username"
                class="mdl-textfield__input" 
                id="sample3"
                name="username"
                value={this.state.username}
                onChange={this.onChangeUsername}
                validations={[required]}
              />
            </div>
<br/>
<br/>

            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
              <Input
                type="password"
                attern=".{8,}" 
                class="mdl-textfield__input"
                placeholder = "Password"
                id ="sample3"
                name="password"
                value={this.state.password}
                onChange={this.onChangePassword}
                validations={[required]}
              />
            </div>
        <button
                class="sign-in-btn mdl-button mdl-js-ripple-effect mdl-js-button mdl-button--raised mdl-button--colored"
                disabled={this.state.loading}
              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Login</span>
              </button>
           

            {this.state.message && (
              <div className="sign-in-btn mdl-button mdl-js-ripple-effect mdl-js-button mdl-button--raised mdl-button--colored">
                <div className="alert alert-danger" role="alert">
                  {this.state.message}
                </div>
              </div>
            )}
            
            <CheckButton
            class="sign-in-btn mdl-button mdl-js-ripple-effect mdl-js-button mdl-button--raised mdl-button--colored"
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
             
          </Form>

        </div>
        </div>
    </body>
    );
  }
}