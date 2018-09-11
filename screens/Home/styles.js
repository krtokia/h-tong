const React = require("react-native");
const {Dimensions, Platform} = React;

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export default {
  container: {
    flex: 1,
    width: null,
    height: null,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    width: deviceWidth / 1.1,
    margin: 10,
    marginBottom: 40,
  },
  logoHeader: {
    width: 20,
    height: 28,
    alignSelf: "center"
  },
  header: {
    width: Dimensions.get("window").width,
    flexDirection: "row",
    paddingLeft: 15,
    paddingRight: 15,
    marginLeft: Platform.OS === "ios" ? undefined : -30
  },
  imageHeader: {
    height: 25,
    width: 95,
    resizeMode: "contain"
  },
  indexLogoBox: {
    flex: 1,
    height: deviceHeight / 4,
    width: deviceWidth,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  indexLogo: {
    height: deviceHeight / 4.5,
    resizeMode: 'contain'
  },
  indexTextBox: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyBox: {
    flex: 1,
    height: 50,
  },
  items: {
    width: deviceWidth,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  itemTitle: {
    fontWeight: 'bold'
  },
  itemSub: {
    fontSize: 10,
  },
  itemText: {

  },
  itemLogo: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 10,
  },
  spotHeader: {
    flexDirection: "row",
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  spotTitle: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  spotMore: {
    marginLeft:'auto',
    fontSize:13,
    textAlignVertical: 'bottom'
  },
  spotList: {
    height: deviceHeight / 1.5,
  },
  itemImage: {
    width:'100%',
    height:'100%',
  },
  itemTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 0,
  },
  itemSub: {
    fontSize: 14,
  },
  itemIcon: {
    alignSelf: "flex-end",
    marginRight: 5,
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
