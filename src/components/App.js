import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Storage from "./pages/storage/Storage";
import RecordVideo from "./WebCam/WebCam";
import HomePage from "./WebCam/BxJs";

class App extends Component {
  state = {
    isDesktop: false,
    video: null
  };

  componentDidMount() {
    const OS = this.getOS();
    this.chunks = [];
    if (OS === "Windows" || OS === "Mac OS" || OS === "Linux") {
      this.setState({
        isDesktop: true
      });
    }
  }

  getOS() {
    let userAgent = window.navigator.userAgent,
      platform = window.navigator.platform,
      macosPlatforms = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"],
      windowsPlatforms = ["Win32", "Win64", "Windows", "WinCE"],
      iosPlatforms = ["iPhone", "iPad", "iPod"],
      os = null;

    if (macosPlatforms.indexOf(platform) !== -1) {
      os = "Mac OS";
    } else if (iosPlatforms.indexOf(platform) !== -1) {
      os = "iOS";
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
      os = "Windows";
    } else if (/Android/.test(userAgent)) {
      os = "Android";
    } else if (!os && /Linux/.test(platform)) {
      os = "Linux";
    }

    return os;
  }

  
  handleOnVideoChange = e => {
    if(e.target.value) {
      const blob = new Blob(this.chunks, {type: 'video/mp4'});
      const videoURL = window.URL.createObjectURL(blob);
      this.setState({video: videoURL});
      alert(videoURL);
    }
  };

  getSource() {
    alert(this.state.video);
    return this.state.video;
  }
  render() {
    const { isDesktop, video } = this.state;
    return (
      <>{isDesktop ? 
      <RecordVideo/> : 
      <div>
        <input type="file" accept="video/mp4" onChange={this.handleOnVideoChange}/>
        {
          video &&
          <video src={video} controls>
             Your browser does not support the video tag.
          </video>
        }
      </div>
    }</>
    );
  }
}

export default App;
