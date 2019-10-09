import React from "react";
import "./style.css";
import ImagesUpload from "./imagesUpload";
import axios from"axios"
import "cors";

class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uploading: false,
      showDone: false,
      filesToBeSent: [],
      printcount: 10
    };
    this.uploadAsset = this.uploadAsset.bind(this);
    this.doneUploading=this.doneUploading.bind(this);
  }
   onDrop(e) {
    const files = Array.from(e.target.files);
    this.setState({ filesToBeSent: files });
    // const formData = new FormData();
    // files.forEach((file, i) => {
    //   formData.append("asset[upload]", file, file.name);
    //   console.log("file", formData);
    // });

  }

  uploadAsset() {
    console.log(this.state.filesToBeSent);
    this.setState({ uploading: true, showDone: true });

    //  console.log("file",formData.getAll("asset[upload]"));
    // 
    // })
  }
  doneUploading() {
    let headers ={
      api_key :"blta0fc4e79722f497c",
      authtoken:document.cookie.split('auth')[1].split('=')[1].split(";")[0],
      "Content-Type":"application/json"
    }
    this.setState({uploading: false, showDone: false},()=>{this.props.Popup()
    axios
    .get("/assets/images", { headers })
    .then(res => {
      // console.log(res.data.assets);
      this.props.update(res.data.assets)
      // this.setState({ uploading: false, showDone: false},()=>{this.props.Popup();});
    })
    .catch(e => {
      console.log(e);
    });
  })
  }

  render() {
    // let formData=new FormData();
    return (
      <div className="popup">
        <div className="popupInner">
          <h1 className="dragAndDropMsg">Drag and Drop Your Images Here</h1>
          <button onClick={this.props.closePopup}>close me</button>
          <br />
          <input
            type="file"
            id="file-browser-input"
            name="file-browser-input"
            ref={input => (this.fileInput = input)}
            onDragOver={e => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onDrop={files => this.onDrop(files)}
            onChange={files => this.onDrop(files)}
            accept="image/jpg"
            multiple
          />
          <div className="addImages">
          {/* {console.log(this.state.uploading)} */}
            {this.state.uploading === true 
            
              ? this.state.filesToBeSent.map((file,i) => 
                 <ImagesUpload file={file} key={i}/>  
              )
              : null}
            {this.state.showDone === true ? (
              <button onClick={this.doneUploading}>Done</button>
            ) : (
              <button onClick={this.uploadAsset}>Upload</button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Popup;
