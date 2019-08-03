import React, { Component } from "react";
import RecordVideo from "./WebCam/WebCam";
import MobileVideoRecorder from './MobileVideoRecorder/MobileVideoRecorder';
class App extends Component {
  state = {
    isDesktop: false,
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

  render() {
    const { isDesktop } = this.state;
    return (
      <>{isDesktop ? 
      <RecordVideo/> : <MobileVideoRecorder/>
    }</>
    );
  }
}

export default App;
