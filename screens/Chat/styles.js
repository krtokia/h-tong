const React = require("react-native");
const {Dimensions, Platform} = React;

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export default {
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
  chatList: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: deviceWidth,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 8,
    paddingHorizontal: 15
  },
  chatThumbnail: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    borderRadius: 50,
  },
  chatName: {
    fontWeight: 'bold',
    marginBottom: 2
  },
  chatInfo: {
    fontSize: 12,
    color: '#aaa',
    marginTop: 2
  },
  chatTime: {
    marginLeft: 'auto',
    marginRight: 10,
    height: '100%',
    paddingTop: 5
  },
  chatRoomBG: {
    height: deviceHeight - 200,
  },
  chatBG: {
    flexDirection: 'column-reverse',
    justifyContent: 'flex-end',
  },
  chatBase: {
    flex:1,
    width: deviceWidth,
    flexDirection: 'row',
    marginBottom: 15,
  },
  chatContent: {
    fontSize: 13,
    color: '#555',
    flexWrap: 'wrap',
    flex: 1
  },
  chatBox: {
    backgroundColor:'#eee',
    width:'auto',
    height:'auto',
    padding:5,
    borderWidth:1,
    borderColor:'#eee',
    borderRadius:15,
    marginLeft: -5,
  }
}
