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
  },
  modalContainer: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#0003'
  },
  modalOther: {
    flex: 1,
    width: deviceWidth,
  },
  modalContent: {
    flex:4,
    width: deviceWidth / 1.5,
    backgroundColor:'#fff'
  },
  modalHeader: {
    height: 30,
    backgroundColor: '#db3928',
    flexDirection:'row',
    shadowOpacity: 5,
    shadowOffset: { width:5, height:5 },
    shadowRadius: 5,
    elevation: 5,
    alignItems:'center'
  },
  modalInner: {
    flex:1,
    backgroundColor:'#fff',
    alignItems: 'center',
    padding:10,
  },
  Row: {
    flexDirection:'row'
  },
  grayUnderline: {
    borderBottomWidth: 1,
    borderColor: '#e9e9e9',
    marginBottom: 10,
  }
}
