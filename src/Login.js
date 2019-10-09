import React, { Component } from "react";
import axios from "axios";
import Auth from "./Auth";
const url = "/user-session";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);
  }

  async login(evt) {
    evt.preventDefault();
    try {
      if (this.state.email === "" && this.state.password === "") {
        alert("Field Can't be empty");
        throw new Error("Field Can't be empty");
      } else {
        try {
          let body = {
            user: {
              email: this.state.email,
              password: this.state.password
            }
          };
          const res = await axios.post(url, body);
          console.log(res);
          const auth = res.data.user.authtoken;

          document.cookie = `auth=${auth}`;
          Auth.login(() => {
            this.props.history.push(`/contentstack/${res.data.user.uid}`);
          });
        } catch (e) {
          if (e.response.status ===503) {
            alert(`${e.response.statusText}`)
          }
          else{
            alert(`${e.response.data.error_message}`);
          }
          // alert(`${e.response.statusText}`)
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  render() {
    return (
      <div>
        <form>
          <label htmlFor="email">Email ID</label>
          <input
            type="email"
            name="email"
            onChange={this.handleChange}
            value={this.state.email}
            required={true}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            onChange={this.handleChange}
            value={this.state.password}
            required={true}
          />
          <button onClick={this.login}>Login</button>
        </form>
      </div>
    );
  }
}
