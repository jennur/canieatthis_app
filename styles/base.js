import { StyleSheet} from 'react-native';

export const spacing = {
  xs: 5,
  sm: 10,
  md: 15,
  lg: 20,
}


export const base = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#212c2e',
  },
  welcome: {
    fontSize: 40,
    textAlign: 'center',
    margin: spacing.md,
    fontFamily: 'PacificoRegular',
    color: '#ec9937',
  },
  button: {
    color: '#7d9c51',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
})