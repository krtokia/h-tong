import React, { Component } from 'react';
import { StyleSheet,Image,TouchableOpacity,ActivityIndicator } from 'react-native';
import {
  View,
  Button,
  Content,
  Container,
  List,
  ListItem,
  Header,
  Left,
  Body,
  Right,
  Thumbnail,
  Text,
  Item,
  Input,
  Icon,
} from 'native-base';

import styles from './styles.js';

import { StoreGlobal } from '../../App';

class FriendDetail extends Component{
  static navigationOptions = ({
    header: null
  });

  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      friendId: this.props.navigation.getParam('friendId'),
      dataSource: null,
      isFriend: false,
      userImgs: null,
      careerSource: null,
    }
  }

  componentDidMount() {
    this.getInfo();
    this.getIsFriend();
    this.getImages()
    this.getCareer()
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.navigation.getParam('refresh') !== prevProps.navigation.getParam('refresh')) {
      this.getInfo();
      this.getIsFriend();
    }
  }

  refresh = refresh => {
    this.setState({refresh})
  }

  getIsFriend = async() => {
    return fetch("http://13.124.127.253/api/results.php?page=isFriend&friendId="+this.state.friendId+"&userId="+StoreGlobal({type:'get',key:'loginId'}))
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson) {
          this.setState({
            isFriend: true,
          })
        } else {
          this.setState({
            isFriend: false,
          })
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  getImages = async() => {
    this.setState({isLoading2:true})
    return fetch("http://13.124.127.253/api/results.php?page=userImage&id=" + this.state.friendId)
      .then((response) => response.json())
      .then((responseJson) => {
        //let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          isLoading2: false,
          userImgs: responseJson,
        });
      })

      .catch((error) => {
        console.error(error);
      });
  }

  getCareer = async() => {
    this.setState({isLoading3:true})
    return fetch("http://13.124.127.253/api/results.php?page=getCareer&id=" + this.state.friendId)
      .then((response) => response.json())
      .then((responseJson) => {
        //let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          isLoading3: false,
          careerSource: responseJson,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getInfo = async() => {
    return fetch("http://13.124.127.253/api/results.php?page=getUser&id="+this.state.friendId)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
  		    dataSource: responseJson[0],
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  updateFriend = () => {
    let apiUrl = 'http://13.124.127.253/api/friend.php';
    const formData = new FormData();

    formData.append('userId', StoreGlobal({type:'get',key:'loginId'}));
    formData.append('friendId', this.state.friendId);
    formData.append('action', this.state.isFriend);
    options = {
      method: 'POST',
      body: formData,
    }

    return fetch(apiUrl, options).then((response) => response.json())
      .then((responseJson)=> {
        if(responseJson === 'succed') {
          // this.setState({
          //   isFriend: !this.state.isFriend
          // })
          this.getIsFriend();
        } else {
          //alert(responseJson);
          console.log(responseJson);
        }
      }).catch((error) => {
        console.log("error::",error)
      });
  }

  _goBack = () => {
    if(this.props.navigation.getParam('prevPage') === 'index') {
      this.props.navigation.navigate('Friends',{refresh:Date(Date.now()).toString()})
    } else if(this.props.navigation.getParam('prevPage') === 'comm') {
      this.props.navigation.navigate('CommunityPeople',{refresh:Date(Date.now()).toString()});
    } else {
      this.props.navigation.navigate('TongPeople',{refresh:Date(Date.now()).toString()});
    }
  }

  render(){
    if(this.state.isLoading) {
      return (
        <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
          <ActivityIndicator />
        </View>
      )
    } else if(this.state.isLoading2) {
      return (
        <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
          <ActivityIndicator />
        </View>
      )
    } else if(this.state.isLoading3) {
      return (
        <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
          <ActivityIndicator />
        </View>
      )
    } else {
      let imgURI = this.state.dataSource.photo ? this.state.dataSource.photo : "profile_no.png"
      let getImages;
      if(this.state.userImgs) {
        getImages = this.state.userImgs.map((val,key) => {
          return <View key={key}>
            <TouchableOpacity>
              <Image style={styles.detailImage} source={{uri: 'http://13.124.127.253/images/userImages/'+val.photo}} />
            </TouchableOpacity>
          </View>
        })
      } else {
        getImages = <View />
      }

      let getCareer;
      if(this.state.careerSource) {
        getCareer = this.state.careerSource.map((val,key) => {
          return <CareerList
                  key={key}
                  dateVal={val.careerDate}
                  infoVal={val.career}
                />
        })
      } else {
        getCareer = <CareerList
                dateVal=""
                infoVal="경력이 없습니다."
              />
      }
      return (
        <Container>
          <Content
            showsVerticalScrollIndicator={false}
            style={{ backgroundColor: "#f4f4f4" }}
          >
            <View style={[styles.Box,{marginTop:0}]}>
              <View style={{borderBottomColor:'#f9f9f9',borderBottomWidth:1,paddingVertical:10}}>
                <View style={{alignSelf:'flex-end'}}>
                  <Button transparent onPress={this._goBack}>
                    <Icon name="remove" type="FontAwesome" style={{color:'#999'}} />
                  </Button>
                </View>
                <View style={{marginTop:-30,marginBottom:10,alignSelf:'center',alignItems:'center'}}>
                  <Image source={{uri: 'http://13.124.127.253/images/userProfile/'+imgURI}} style={{width:150,height:150,resizeMode:'cover',borderRadius:500}} />
                </View>
                <View style={{alignSelf:'center',alignItems:'center',justifyContent:'center'}}>
                  <Text style={{fontWeight:'bold',fontSize:20,marginBottom:5}}>{this.state.dataSource.userNm}</Text>
                  <Text style={{fontSize:11,color:'grey',marginBottom:5}}>{this.state.dataSource.company} / {this.state.dataSource.jobgroup}</Text>
                  <Text>{this.state.dataSource.cellPhone}</Text>
                </View>
              </View>

              <View style={{flexDirection:'row',paddingTop:10,paddingHorizontal:5,alignItems:'center'}}>
                <TouchableOpacity style={{flex:1,justifyContent:'center',alignItems:'center'}}
                  onPress={this.updateFriend}
                >
                    <Icon name="heart" type="FontAwesome" style={this.state.isFriend ? styles.friendIconT : styles.friendIcon} />
                    <Text style={{fontSize:13,color:"#555"}}>관심동료</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{flex:1,justifyContent:'center',alignItems:'center',borderRightWidth:1,borderLeftWidth:1,borderColor:'#f9f9f9'}}
                  onPress={() => this.props.navigation.navigate("ChatRoom",{friendId:this.state.friendId})}
                >
                  <Icon name="comments-o" type="FontAwesome" style={styles.friendIcon} />
                  <Text style={{fontSize:13,color:"#555"}}>1:1 대화</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{flex:1,justifyContent:'center',alignItems:'center'}}
                  onPress={() => this.props.navigation.navigate("FriendPapers",{friendId:this.state.friendId,refresh:this.refresh})}
                >
                  <Icon name="folder-open" type="FontAwesome" style={styles.friendIcon} />
                  <Text style={{fontSize:13,color:"#555"}}>서류보기</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.Box}>
              <View style={{alignItems:'flex-start',paddingBottom:10,borderBottomWidth:1,borderBottomColor:'#f4f4f4'}}>
                <Text style={{color:'#aaa',fontSize:13}}>대표사진</Text>
                <View style={{flexDirection:'row',marginTop:5,}}>
                  {getImages}
                </View>
              </View>
              <View style={{flexDirection:'row',alignItems:'flex-start',marginTop:10}}>
                <Text style={{color:'#aaa',fontSize:13}}>경력</Text>
                <View style={{marginLeft:10}}>
                  {getCareer}
                </View>
              </View>
            </View>
          </Content>
        </Container>
      );
    }
  }
}
export default FriendDetail;

class CareerList extends Component{
  render() {
    return(
      <View style={{flexDirection:'row',marginBottom:12,}}>
        <View style={{width:"30%"}}>
          <Text style={{fontSize:13}}>{this.props.dateVal}</Text>
        </View>
        <View style={{width:"70%"}}>
          <Text style={{fontSize:13}}>{this.props.infoVal}</Text>
        </View>
      </View>
    )
  }
}
