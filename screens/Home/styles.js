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
    height: deviceHeight / 4,
    flexDirection:'column',
    padding:0
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
  TongContents: {
    paddingVertical:10,
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
  },
  TongContentImgs: {
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
  TongContentImgList: {
    width: 70,
    height: 70,
    marginRight: 3,
  },
  TongContentReply: {
    marginTop:5
  },
  ContentReplyF: {
    color: '#db3928',
    fontSize:13
  },
  ContentReplyT: {
    color: '#999',
    fontSize:13
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
    justifyContent: 'space-between',
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
  friendChat: {
    color: '#555',
  },
  friendChatBtn: {

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
  },
  createModalStyleLeft: {
    flex:1,
    backgroundColor:'#5553',
    alignItems:'flex-end',
    padding:10,
    marginRight:10,
    justifyContent:'space-between',
    height: deviceHeight / 2
  },
  createModalStyleRight: {
    flex:3,
    backgroundColor:'#0000',
    alignItems:'flex-start',
    justifyContent:'space-between',
    height: deviceHeight / 2,
  },
  modalInput: {
    width: '100%',
    fontSize: 11
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#db3928',
    overflow: 'hidden',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  fullScreen: {
    width: deviceWidth,
    height: deviceHeight
  },
  workListBox: {
    width: deviceWidth / 4 - 20,
    height: deviceWidth / 4 - 20,
    borderWidth: 1,
    marginHorizontal: 5,
    marginBottom: 5,
    borderColor: '#999'
  },
  opacityBox: {
    backgroundColor: '#fff8',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    zIndex:1,
    paddingHorizontal: 10,
  },
  tongBackBtn: {
    fontSize:28,
    textShadowOffset:{width:1,height:1},
    textShadowColor:'#888'
  },
  tongBox: {
    flexDirection:'row',
    backgroundColor:'#f4f4f4',
    marginBottom:5,
  },
  tongInnerBox: {
    backgroundColor: '#fff',
    shadowOpacity: 3,
    shadowOffset: { width:3, height:3 },
    shadowRadius: 3,
    elevation: 3,
    padding: 10
  },
  boxTitle: {
    fontSize: 12,
    fontWeight: 'bold'
  },
  boxSub: {
    fontSize: 9,
    color: '#db3928',
  },
  innerContent: {
    fontSize: 11,
    color: '#999',
  },
  innerBoxTitle: {
    width:'100%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
  mainWorkImg: {
    width: 76,
    height: 76,
    resizeMode: 'center',
    marginHorizontal: 3
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
  inviteBox: {
    height:120,
    width:'100%',
    padding:10,
    backgroundColor:'#fff',
    shadowOpacity: 3,
    shadowOffset: { width:3, height:3 },
    shadowRadius: 3,
    elevation: 3,
    marginBottom:10
  },
  inviteInnerBox: {
    flex:3,
    flexDirection:'row',
  },
  inviteHeader: {
    flex:1,
    borderWidth:1
  },
  inviteContent: {

  },
  inviteDetailItem: {
    width:'100%',
    paddingBottom:3,
    paddingHorizontal:30,
    marginBottom:10,
    flexDirection:'row',
    alignItems: 'center',
    borderBottomWidth:1,
    borderColor: '#e9e9e9'
  },
  inviteDetailTitle: {
    fontSize:13,
    flex:1
  },
  inviteDetailText: {
    fontSize:12,
    color:'#999',
    flex:1
  },
  row2: {
    flexDirection:'row'
  },
  dangerBox: {
    alignSelf:'center',
    width:'99%',
    height:150,
    backgroundColor:'#fff',
    marginBottom:10,
    shadowOpacity: 3,
    shadowOffset: { width:3, height:3 },
    shadowRadius: 3,
    elevation: 3,
  },
  tongImage2 : {
    height: 130,
    width: 130,
    borderRadius: 100,
  }
};
