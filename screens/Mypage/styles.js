const React = require("react-native");
const {Dimensions, Platform} = React;

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export default {
  InviteText: {
    marginLeft: 20,
    marginRight:'auto',
    fontSize: 20,
  },
  contentHeader: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
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
  BoxTitle: {
    width: deviceWidth,
    marginTop: 10,
    alignItems: 'stretch',
    shadowOpacity: 5,
    shadowOffset: { width:5, height:5 },
    shadowRadius: 5,
    elevation: 5,
    justifyContent: 'flex-start',
    paddingLeft:10,
    marginBottom:5
  },
  itemBox: {
    borderBottomWidth:1,
    borderColor:'#e9e9e9',
    flexDirection:'row',
    justifyContent:'space-between',
    paddingHorizontal:10,
    paddingVertical:10
  },
  itemTitle: {
    fontSize: 14,
  },
  itemContent: {
    fontSize: 12,
    color: '#777',
  },
  itemInput: {
    height:'auto',
    fontSize:12,
  },
}
