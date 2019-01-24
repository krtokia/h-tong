const React = require("react-native");
const {Dimensions, Platform} = React;

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export default {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputBox: {
    flex:1,
    flexDirection:'row',
    padding:5,
    justifyContent:'center',
  },
  inputBox2: {

  },
  input: {
    width:'100%',
    height:'100%',
    backgroundColor: "rgba(255,255,255,0.8)",
    padding:10
  },
  background: {
  width:'100%',
  height:'100%',
  backgroundColor: "rgba(0,0,0,0.1)"
  },
  agree: {
    width:'100%',
    flex:1,
    padding:10,
    borderBottomWidth:1,
    borderBottomColor:'#666',
    justifyContent:'center',
    alignItems:'flex-start'
  },
  agreeText: {
    fontSize: 10,
    color:'#333'
  },
  agreeIcon: {
    fontSize:15,
    color:'#333'
  }
}
