const React = require("react-native");
const {Dimensions, Platform} = React;

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export default {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  tongContent : {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tongName: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  tongNew: {
    color: '#db3928',
    fontSize: 10,
    alignSelf: 'center',
    textDecorationLine:'underline'
  },
  tongImage : {
    height: 140,
    width: 150,
    borderRadius: 20,
  },
  tongView: {
    marginTop: 10,
    height: 160,
    flexBasis: '40%',
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: 10,
  },
  BoxTitle: {
    marginTop: 20,
    flexDirection: "row",
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  HomeList: {
    width: '100%',
    flexDirection: "row",
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  HeaderStyle: {
    height: deviceHeight / 3,
    shadowOpacity: 5,
    shadowOffset: { width:5, height:5 },
    shadowRadius: 5,
    elevation: 5,
  },
  LeftStyle: {
    width: '100%',
    paddingTop: 35,
    paddingLeft: 10,
    flex: 3,
  },
  BodyStyle: {
    flex: 2,
    backgroundColor: '#fff8',
  },
  ImageHeader: {
    width: deviceWidth,
    height: deviceHeight / 3,
    flexDirection:'column',
  },
  TongHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  TongSubs: {
    marginTop:10,
    width: '95%',
    flexDirection:'row',
    justifyContent:'space-between',
    flexWrap: 'nowrap'
  },
  TongInvite: {
    color: '#db3928',
    marginLeft: 10,
  },
  TongContentBox: {
    width: deviceWidth,
    height: deviceHeight / 4,
    marginTop: 8,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 10,
    shadowOpacity: 5,
    shadowOffset: { width:5, height:5 },
    shadowRadius: 5,
    elevation: 5,
  },
  TongContentHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ContentHeaderImg: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    borderRadius: 50,
  },
  TongContentImgs: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  ContentImg: {
    flexBasis: '23%',
    resizeMode: 'contain',
    marginLeft: 3,
    marginRight: 3,
  },
  TongContentReply: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  ContentReply: {
    color: '#db3928',
  },
  CreateTongLogo: {
    resizeMode: 'contain',
    width: 100,
    height: 100
  },
  Box: {
    backgroundColor: '#fff',
    width: deviceWidth,
    marginBottom: 5,
    alignItems: 'stretch',
    shadowOpacity: 5,
    shadowOffset: { width:5, height:5 },
    shadowRadius: 5,
    elevation: 5,
    justifyContent: 'flex-start',
    padding: 10,
  },
  InviteText: {
    marginLeft: 20,
    marginRight:'auto',
    fontSize: 20,
  },
  contentHeader: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
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
    color: '#555',
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
  },
  paperListBox: {
    borderBottomWidth:1,
    borderColor:'#e9e9e9',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    padding:15,
  },
  grayBottom: {
    borderBottomWidth:1,
    borderColor: '#e9e9e9'
  },
  Row: {
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'center',
  }
};
