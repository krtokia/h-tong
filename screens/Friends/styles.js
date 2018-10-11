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
  friendList: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: deviceWidth,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 5,
    paddingLeft: 10,
  },
  friendThumbnail: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    borderRadius: 50,
  },
  friendName: {
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  friendInfo: {
    fontSize: 12,
    color: '#aaa',
  },
  friendChatBtn: {
    marginRight: 30,
    marginLeft: 'auto'
  },
  friendChat: {
    color: '#aaa',
  },
  detailImage: {
    flex:1,
    marginHorizontal:3,
    height:70,
    resizeMode:'contain',
  },
  friendIcon: {
    fontSize: 20,
    color: '#555',
    marginBottom: 5
  }
}
