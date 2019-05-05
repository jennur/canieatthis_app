import { StyleSheet, Dimensions } from "react-native";
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);

export const spacing = {
  xs: 5,
  sm: 10,
  md: 15,
  lg: 20
};

export const base = StyleSheet.create({
  homeContainer: {
    width: viewportWidth,
    height: viewportHeight,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#001E32"
  },
  container: {
    width: viewportWidth,
    height: viewportHeight,
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "#001E32"
  },
  maxWidthContainer: {
    width: viewportWidth
  },
  camera: {
    flex: 1,
    width: viewportWidth,
    height: viewportHeight
  },
  cameraView: {
    width: viewportWidth,
    height: viewportHeight,
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "column"
  },
  welcome: {
    fontSize: 40,
    textAlign: "center",
    margin: spacing.md,
    paddingHorizontal: spacing.md,
    fontFamily: "PacificoRegular",
    color: "#ec9937"
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "transparent"
  },
  image: {
    width: viewportWidth,
    position: "absolute",
    top: 0,
    left: 0
  },
  headline: {
    fontSize: 25,
    textAlign: "left",
    color: "#ec9937",
    fontFamily: "QuicksandRegular",
    margin: 20
  },
  button: {
    height: 40,
    paddingHorizontal: 15,
    borderRadius: 3,
    justifyContent: "center",
    alignSelf: "center",
    color: "#000000",
    backgroundColor: "#9CC66C",
    margin: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 3
  },
  buttonText: {
    fontSize: 16,
    fontFamily: "QuicksandRegular"
  },
  buttonBottomScreen: {
    position: "absolute",
    bottom: 0,
    height: 40,
    paddingHorizontal: 15,
    margin: 20,
    borderRadius: 3,
    justifyContent: "center",
    alignSelf: "center",
    color: "#000000",
    fontFamily: "QuicksandRegular",
    backgroundColor: "#9CC66C",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3
  },
  link: {
    color: "#9CC66C",
    padding: 20,
    textDecorationLine: "underline",
    fontFamily: "QuicksandRegular"
  },
  text: {
    color: "#ec9937",
    fontFamily: "QuicksandRegular"
  },
  allergenText: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    fontFamily: "QuicksandRegular",
    color: "#ec9937",
    marginLeft: 20
  },
  allergyIcon: {
    width: 30,
    height: 30
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  capture: {
    flex: 0,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: "center",
    margin: 20
  }
});
