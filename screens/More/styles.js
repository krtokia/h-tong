const React = require("react-native");
const {Dimensions, Platform} = React;

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export default {
  container: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 20,
  },
  sketch: {
    width:200,
    height:200,
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
  Box2: {
    backgroundColor: '#fff',
    width: deviceWidth,
    alignItems: 'stretch',
    shadowOpacity: 2,
    shadowOffset: { width:2, height:2 },
    shadowRadius: 2,
    elevation: 2,
    justifyContent: 'flex-start',
    padding: 10,
  },
  BoxTitle: {
    marginTop: 5,
    flexDirection: "row",
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  MypageImg: {
    width: 50,
    height: 50,
  },
  MypageText: {

  },
  ColBox: {
    width: (deviceWidth - 20) / 4,
    height: 80,
    padding: 5,
    justifyContent:'flex-start',
    flexDirection:'column',
    alignItems: 'center',
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
  HomeList: {
    width: '100%',
    flexWrap: 'wrap',
    flexDirection: "row",
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  dateBox: {
    width:'90%',
    height:40,
    borderWidth:1,
    borderColor:'#e9e9e9',
    borderRadius:50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10
  },
  contentFooterBox: {
    flex:1,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    paddingVertical:5,
  },
  inviteItem: {
    flexBasis:'50%',
    height:deviceHeight / 5 + 20,
    paddingHorizontal:5,
  },
  inviteImg: {
    width:'100%',
    height: '95%',
    resizeMode:'contain',
    borderRadius: 10,
  },
  inviteTextBox: {
    height:20,
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  myIcon: {
    fontSize: 20,
    color: '#555',
    marginBottom: 5,
    marginHorizontal: 'auto'
  },
  detailImage: {
    width:70,
    marginHorizontal:3,
    height:70,
    resizeMode:'contain',
  },
  addImage: {
    width:70,
    height:70,
    marginHorizontal:3,
    borderWidth:1,
    borderColor:'#e9e9e9',
    justifyContent:'center',
    alignItems:'center'
  },
  paperItems: {
    flexBasis:'50%',
    height: deviceHeight / 5 + 20,
    padding:5,
  },
  grayBottom: {
    borderBottomWidth:1,
    borderBottomColor: '#e9e9e9'
  },
  row: {
    flexDirection:'row'
  },
  center: {
    justifyContent:'center',
    alignItems:'center'
  },
  imageScale: {
    alignSelf: 'stretch',
    width: deviceWidth,
    height: deviceHeight,
    resizeMode: 'contain'
  }
}
