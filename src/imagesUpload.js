import React, { Component } from "react";
import axios from "axios";
export default class ImagesUpload extends Component {
  render() {
    console.log("rendering...");

    let headers = {
      api_key: "blta0fc4e79722f497c",
      authtoken: document.cookie
        .split("auth")[1]
        .split("=")[1]
        .split(";")[0],
      "Content-Type": "application/json"
    };
    const formData = new FormData();
    formData.append("asset[upload]:", this.props.file, this.props.file.name);

    axios({
      method: "post",
      url:
        "https://stag-new-api.contentstack.io/v3/assets?relative_urls={false}",
      headers: headers,
      data: formData,
      onUploadProgress: progressEvent => {
        console.log(
          Math.round((progressEvent.loaded / progressEvent.total) * 100) + "%"
        );
      }
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
    return <div></div>;
  }
}
