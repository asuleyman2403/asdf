import React from 'react';

class MobileVideoRecorder extends React.Component {
    handleVideoChange = event => {
        console.log(event.target.files[0]);
    };
    render() {
        <>  
            <input type="file" accept="video/*" onChange={this.handleVideoChange}/>
        </>
    }
}

export default MobileVideoRecorder;