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
  MypageImg: {
    width: 50,
    height: 50,
  },
  MypageText: {

  },
  ColBox: {
    width: (deviceWidth - 40) / 4,
    height: (deviceWidth - 40) / 4,
    padding: 5,
    justifyContent:'flex-start',
    flexDirection:'column',
    alignItems: 'center'
  },
  MoreItems: {
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
  }
}
