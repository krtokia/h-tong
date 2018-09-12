const React = require("react-native");
const {Dimensions, Platform} = React;

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export default {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    color: "#fff",
    marginBottom: 10,
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.8)",
    borderWidth: 0,
  },
  background: {
  width: '100%',
  height: '100%',
  backgroundColor: "rgba(0,0,0,0.1)"
  },
  logo: {
  resizeMode: "contain",
  height:deviceHeight/4,
  alignSelf: "center",
  marginTop: 80,
  marginBottom: 50,
  },
  inputBoxes: {

  },
  btnBoxes: {

  }
}
