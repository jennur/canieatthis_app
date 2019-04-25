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
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#001E32"
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
    width: viewportWidth,
    height: viewportHeight,
    backgroundColor: "transparent"
  },
  headline: {
    fontSize: 20,
    textAlign: "left",
    color: "#ec9937"
  },
  button: {
    height: 40,
    paddingHorizontal: 15,
    borderRadius: 3,
    justifyContent: "center",
    color: "#000000",
    backgroundColor: "#9CC66C"
  },
  buttonText: {
    fontSize: 16
  },
  captureButton: {
    alignSelf: "flex-end",
    height: 40,
    paddingHorizontal: 15,
    margin: 20,
    borderRadius: 3,
    justifyContent: "center",
    color: "#000000",
    backgroundColor: "#9CC66C"
  },
  link: {
    color: "#9CC66C",
    padding: 20,
    textDecorationLine: "underline"
  },
  text: {
    color: "#ec9937"
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
