const React = require("react-native");
const {Dimensions, Platform} = React;

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export default {
  Box: {
    backgroundColor: '#fff',
    width: deviceWidth,
    marginTop: 10,
    alignItems: 'stretch',
    shadowOpacity: 5,
    shadowOffset: { width:5, height:5 },
    shadowRadius: 5,
    elevation: 5,
    justifyContent: 'flex-start',
    padding: 10,
  },
  smallText: {
    fontSize: 11,
    marginBottom: 5
  },
  red: {
    color: 'red'
  },
  blue: {
    color: 'blue'
  }
}
