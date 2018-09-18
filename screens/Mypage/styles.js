const React = require("react-native");
const {Dimensions, Platform} = React;

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export default {
  container: {
    flex: 1,
    alignItems: 'center',
//    justifyContent: 'center',
    marginBottom: 20,
  },
  Box: {
    backgroundColor: '#fff',
    width: deviceWidth - 20,
    marginTop: 10,
    alignItems: 'stretch',
    shadowOpacity: 5,
    shadowOffset: { width:5, height:5 },
    shadowRadius: 5,
    elevation: 5,
    justifyContent: 'flex-start',
    padding: 10,
  },
  ListItems: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 1,
    paddingLeft: 10,
  },
  TextBox: {
    fontSize: 20,
    marginLeft:20,
  },
  SignBox: {
    width: deviceWidth - 20,
    height: 200,
    backgroundColor: '#eee',
    borderWidth: 1,
    borderColor: '#aaa',
  },
  input: {
    width: deviceWidth - 20,
    height: 40,
    padding: 10,
    borderWidth: 1,
    color: "#000",
    marginBottom: 10,
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.8)",
  },
}
