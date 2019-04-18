import {createStackNavigator, createAppContainer} from 'react-navigation';
import Home from './screens/Home';
import CameraView from './screens/Camera';

const MainNavigator = createStackNavigator({
  'Home': {screen: Home},
  'Camera': {screen: CameraView},
});

const App = createAppContainer(MainNavigator);

export default App;