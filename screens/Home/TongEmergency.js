import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  Switch,
  Modal,
  ActivityIndicator,
  Linking
 } from 'react-native';
 import {
   Container,
   Content,
   Text,
   View,
   Header,
   Left,
   Right,
   Body,
   Button,
   Icon,
   Textarea
 } from "native-base";
import { Grid, Col, Row } from "react-native-easy-grid";

import { StoreGlobal } from '../../App';

import styles from './styles.js';

class TongEmergency extends Component{
  constructor(props) {
    super(props);
    this.setState = this.setState.bind(this);
    this.state = {
      modal: false,
      memId: StoreGlobal({type:'get',key:'loginId'}),
      tongnum: StoreGlobal({type:'get',key:'tongnum'}),
      isLoading: true,
      dataSource:null,
      modalData: null,
      admin1: null,
      admin2: null,
      admin3: null,
    }
  }

  getAdmin = async() => {
    const { tongnum } = this.state;
    return fetch("http://13.124.127.253/api/results.php?page=selectAdminList&tongnum=" + tongnum)
      .then((response) => response.json())
      .then((responseJson) => {
        responseJson = responseJson ? responseJson : [];
        for(i=3;i>responseJson.length;i=i-1) {
          responseJson.push({isAdmin:0})
        }
        var admin1 = 0;
        var admin2 = 0;
        var admin3 = 0;
        for(i=0;i<responseJson.length;i++) {
          if(responseJson[i]['isAdmin'] == 1) {
            admin1 = i+1;
          } else if (responseJson[i]['isAdmin'] == 2) {
            admin2 = i+1;
          } else if (responseJson[i]['isAdmin'] == 3) {
            admin3 = i+1;
          }
        }
        this.setState({
          isLoading: false,
          dataSource: responseJson,
          admin1: admin1 > 0 ? responseJson[admin1-1] : null,
          admin2: admin2 > 0 ? responseJson[admin2-1] : null,
          admin3: admin3 > 0 ? responseJson[admin3-1] : null,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentDidMount() {
    this.getAdmin()
  }

  static navigationOptions = ({
      header: null,
    });

  refresh = refresh => {
    this.getAdmin()
    this.setState({refresh})
  }

  createBox(div,val) {
    let adminName;
    switch(div) {
      case 1 : adminName = "안전관리자"; break;
      case 2 : adminName = "현장의료팀"; break;
      case 3 : adminName = "현장소장"; break;
    }
    let uri = val ? val.photo ? val.photo : 'profile_no.png' : 'profile_no.png'
    if(val) { return <View style={[styles.Box,{flex:1}]}>
                      <View style={[styles.grayBottom,styles.row2,{padding:3}]}>
                        <Text>{adminName}</Text>
                      </View>
                      <TouchableOpacity style={{flex:1}}
                        onPress={() => Linking.openURL(`tel:`+val.cellPhone.replace(/-/g,''))}
                      >
                      <View style={[styles.row2,{flex:1,padding:10}]}>
                        <View style={{flex:2}}>
                          <Image source={{uri: 'http://13.124.127.253/images/userProfile/'+uri}} style={{width:'100%',height:'100%',resizeMode:'contain',borderRadius:500}} />
                        </View>
                        <View style={{flex:3,justifyContent:'space-around',paddingLeft:10}}>
                          <Text>이름 : <Text>{val.tongMemNm}</Text></Text>
                          <Text>아이디 : <Text>{val.tongMemId}</Text></Text>
                          <Text>전화번호 : <Text>{val.cellPhone}</Text></Text>
                        </View>
                      </View>
                      </TouchableOpacity>
                    </View>
    } else {
      return <View style={[styles.Box,{flex:1}]}>
              <View style={[styles.grayBottom,styles.row2,{padding:3}]}>
                <Text>{adminName}</Text>
              </View>
              <TouchableOpacity style={{flex:1}}
                onPress={() => {
                  if(StoreGlobal({type:'get',key:'userGrade'} == 0)) {
                    this.props.navigation.navigate('TongAdmin2',{param:div,refresh:this.refresh})
                  } else {
                    Alert.alert('현장통','담당자가 지정되지 않았습니다. 운영자에게 문의하세요.')
                  }
                }}
              >
              <View style={[styles.row2,{flex:1,padding:10}]}>
                <View style={[styles.center,{flex:1}]}>
                  <Text style={{fontSize:17,color:'#db3928'}}>등록되지 않았습니다.</Text>
                  <Text> </Text>
                  <Text style={{fontSize:15,color:'#db3928'}}>터치하여 등록</Text>
                </View>
              </View>
              </TouchableOpacity>
            </View>

    }
  }

  render(){
    if(this.state.isLoading) {
      return <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
              <ActivityIndicator />
             </View>
    } else if(this.state.isLoading2) {
      return <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
              <ActivityIndicator />
             </View>
    } else {
      return (
        <Container>
          <Header style={{height:70,paddingTop:20,backgroundColor:'#db3928',borderBottomWidth:1,borderBottomColor:'#ccc'}}>
            <Left style={{flex:1}}>
              <Button rounded transparent onPress={() => {this.props.navigation.goBack()}}>
                <Icon name="angle-left" type="FontAwesome" />
              </Button>
            </Left>
            <Body style={{flex:5,alignItems:'center'}}>
              <Text style={{textAlign:'center',color:'#fff',fontSize:20}}>긴급전화</Text>
            </Body>
            <Right  style={{flex:1}}>
            </Right>
          </Header>
          <Content
            showsVerticalScrollIndicator={false}
            style={{ backgroundColor: "#f9f9f9" }}
            contentContainerStyle={{flex:1}}
          >
            {this.createBox(1,this.state.admin1)}
            {this.createBox(2,this.state.admin2)}
            {this.createBox(3,this.state.admin3)}
          </Content>
        </Container>
      );
    }
  }
}
export default TongEmergency;
