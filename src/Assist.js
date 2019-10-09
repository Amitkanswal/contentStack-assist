import React, { Component } from "react";
import axios from "axios";
import auth from "./Auth";
import "./assets.css";
import Popup from "./Popup";
const url = "/user-session";
export default class Assist extends Component {
  constructor(props) {
    super(props);
    this.state = { asset: [], showPopup: false };
    this.logOut = this.logOut.bind(this);
    this.newAsset = this.newAsset.bind(this);
    this.updateDom = this.updateDom.bind(this);
  }
  componentDidMount() {
    console.log("didMount");
    let headers = {
      api_key: "blta0fc4e79722f497c",
      authtoken: document.cookie.split("=")[1].split(";")[0]
    };
    axios
      .get("/assets/images", { headers })
      .then(res => {
        console.log(res.data.assets);
        this.setState({ asset: res.data.assets });
      })
      .catch(e => {
        console.log(e);
      });
  }
  updateDom(images) {
    this.setState({ asset: images });
  }
  newAsset() {
    this.setState({ showPopup: !this.state.showPopup });
  }

  logOut() {
    console.log("log>>", document.cookie.split("=")[1].split(";")[0]);
    try {
      const instance = axios.create({
        baseURL: url,
        headers: {
          authtoken: document.cookie.split("=")[1].split(";")[0]
        }
      });

      instance.delete("").then(() => {
        document.cookie = ";expires=Thu, 01 Jan 2019 00:00:00 GMT";
        document.cookie = "auth=;expires=Thu, 01 Jan 2019 00:00:00 GMT";
        auth.logout(() => {
          console.log("logOut Successfully");
        });
        this.props.history.push("/");
      });
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    return (
      <div>
        <div>
          <button onClick={this.logOut}> logOut </button>
          <h1> Welcome to ContentStack </h1>
        </div>
        <button onClick={this.newAsset}> New Asset</button>
        <div>
          {this.state.showPopup === true ? (
            <Popup
              closePopup={this.newAsset}
              update={this.updateDom}
              Popup={this.newAsset}
            />
          ) : null}
        </div>
        <div>
          {this.state.asset.map((el, i) => (
            <div key={i} className="images">
              <img src={el.url} alt={el.filename} />
              <p>{el.uid}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
