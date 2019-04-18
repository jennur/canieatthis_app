import React from 'react';
import { Camera, Permissions } from 'expo';
import { base } from '../styles/base';

export default class CameraView extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }
  render(){
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    else {
      return(
      <View style={ base.container }>
        <Camera type={this.state.type}>
          <View 
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              flexDirection: 'row',
            }}></View>
        </Camera>
      </View>
      );
    }
      
   
  }
}