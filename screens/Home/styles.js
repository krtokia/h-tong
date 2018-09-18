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
  tongName : {
    width: deviceWidth - 10,
    height: deviceHeight / 6,
  },
  tongImage : {
    width: deviceWidth / 2,
    height: deviceWidth / 2,
  },
  tongView: {
    width: '48%',
    height: '60%',
    margin: '1%',
  },
  HomeHeader: {
    marginTop: 10,
    flexDirection: "row",
    paddingLeft: 10,
    paddingRight: 10,
  },
  HomeList: {
    width: '100%',
    height: deviceHeight / 2,
    flexWrap: 'wrap',
    flexDirection: "row",
    paddingTop: 20,
  },
  SmallList: {
    width: deviceWidth - 10,
    height: deviceHeight / 3.4,
    paddingTop: 20,
  },
  TextList: {
    width: deviceWidth - 10,
    height: deviceHeight / 3.4,
    
    paddingTop: 20,
  },
  BigList: {
    width: deviceWidth - 10,
    minHeight: deviceHeight,
    paddingTop: 20,
  },
  HomeItems: {
    padding: 5,
    margin: 5,
    borderWidth: 1,
    borderColor: '#888888'
  },
  SubItems: {
    margin: 1,
  },
  itemImage: {
    flex: 1,
    width:'100%',
    height:'100%',
  },
  itemIcon: {
    alignSelf: "flex-end",
    marginRight: 5,
  },
  hItemTitle: {
    fontWeight: 'bold'
  },
  hItemSub: {
    fontSize: 10,
  },
  rItemTitle: {
    fontWeight: 'bold',
    fontSize: 10,
  },
  SmallText: {
    fontSize: 10,
  },
  itemLogo: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 10,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  subMore: {
    marginLeft:'auto',
    fontSize:13,
    textAlignVertical: 'bottom'
  },
  spotList: {
    height: deviceHeight / 1.5,
  },
  itemTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 0,
  },
  itemSub: {
    fontSize: 14,
  },
  spotSubBox: {
    paddingBottom: 50,
  },
  spotSub: {
    width: deviceWidth / 1.2,
    flexDirection: "row",
    paddingBottom: 10,
    paddingTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#aaaaaa"
  }
};
