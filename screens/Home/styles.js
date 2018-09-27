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
  },
  HeaderStyle: {
    height:150,
  },
  LeftStyle: {
    width: '100%',
    paddingTop: 25,
    paddingLeft: 10,
  },
  HeaderBody: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  HeaderLogo: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    padding: 10,
  },
  HeaderText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '600',
  },
  ImageHeader: {
    width: deviceWidth,
    height: 150,
    flexDirection:'column',
  },
  TongHeader: {
    flex: 1,
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
  },
  TongTitle: {

  },
  TongSub: {

  },
};
