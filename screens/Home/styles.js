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
    color: '#cc0404',
    fontSize: 10,
    alignSelf: 'center',
    textDecorationLine:'underline'
  },
  tongImage : {
    height: 150,
    width: deviceWidth / 2 - 20,
    borderRadius: 20,
  },
  tongView: {
    marginTop: 10,
    height: 180,
    flexBasis: '50%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  BoxTitle: {
    marginTop: 30,
    flexDirection: "row",
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  HomeList: {
    width: '100%',
    flexWrap: 'wrap',
    flexDirection: "row",
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  HeaderStyle: {
    height:170,
  },
  LeftStyle: {
    width: '100%',
    paddingTop: 25,
    paddingLeft: 10,
  },
  ImageHeader: {
    width: deviceWidth,
    height: 170,
    flexDirection:'column',
  },
  TongHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
  },
  TongSubs: {
    marginTop:5,
    width: '100%',
    flexDirection:'row',
    justifyContent:'space-between',
    flexWrap: 'nowrap'
  },
  TongInvite: {
    color: '#cc0404'
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
    color: '#cc0404',
  }
};
