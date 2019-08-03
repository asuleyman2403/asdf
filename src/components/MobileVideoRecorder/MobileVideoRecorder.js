import React from "react";
import "./MobileVideoRecorder.css";
class MobileVideoRecorder extends React.Component {
  state = {
    video: null
  };

  handleOnVideoChange = e => {
    if (e.target.value) {
      console.log(e.target.files[0]);
      const blob = new Blob([e.target.files[0]], { type: "video/mp4" });
      const videoURL = window.URL.createObjectURL(blob);
      this.setState({ video: videoURL });
      console.log(videoURL);
      console.log(blob.type);
    }
  };

  render() {
    const { video } = this.state;
    return (<>
      <div>
        <div className="video__input-wrapper">
            <input
            type="file"
            accept="video/mp4"
            onChange={this.handleOnVideoChange}
            className="video__input"
            />
        </div>
        {video && (
          <video src={video} controls="true"  type='video/mp4' className="mobile-recorder__video">
            Your browser does not support the video tag.
          </video>
        )}
      </div>
    </>);
  }
}

export default MobileVideoRecorder;
