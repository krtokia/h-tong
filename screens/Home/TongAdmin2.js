import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  Switch,
  Modal,
  ActivityIndicator
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

class TongAdmin2 extends Component{
  constructor(props) {
    super(props);
    this.setState = this.setState.bind(this);
    this.state = {
      modal: false,
      memId: StoreGlobal({type:'get',key:'loginId'}),
      tongnum: StoreGlobal({type:'get',key:'tongnum'}),
      isLoading: true,
      isLoading2: true,
      modalData: null,
      dataSource2:this.props.navigation.getParam('dataSource2'),
      adminDiv:this.props.navigation.getParam('param'),
    }
  }

  getFriend = async() => {
    const { tongnum } = this.state;
    return fetch("http://13.124.127.253/api/results.php?page=selectMembers&tongnum=" + tongnum)
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson) {
          this.setState({
            isLoading: false,
            dataSource: responseJson,
            count: Object.keys(responseJson).length,
          });
        } else {
          this.setState({
            isLoading: false,
          })
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentDidMount() {
    this.getFriend()

  }

  _goBack = () => {
    const { navigation } = this.props;
//    navigation.navigate('TongInvite',{refresh: new Date(Date.now()).toString()});
    navigation.goBack();
    navigation.state.params.refresh({ refresh: Date(Date.now()).toString() })
  }

  static navigationOptions = ({
      header: null,
    });

    acceptInvite = (data) => {
      this.setState({modal:!this.state.modal,modalData:null})
      let apiUrl = 'http://13.124.127.253/api/tongMembers.php?action=setAdmin';

      options = {
        method: 'POST',
        headers: {
          'Accept' : 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tongMemId: data.tongMemId,
          tongnum: data.tongnum,
          isAdmin: this.state.adminDiv
        })
      }
      return fetch(apiUrl, options).then((response) => response.json())
        .then((responseJson)=> {
          if(responseJson === 'succed') {
            Alert.alert(
              "현장통",
              "수정되었습니다.");
            this._goBack();
          } else {
            console.log(responseJson);
          }
        }).catch((error) => {
          console.log(error)
        });
    }

  render(){
    if(this.state.isLoading) {
      return <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
              <ActivityIndicator />
             </View>
    } else if(this.state.isLoading3) {
      return <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
              <ActivityIndicator />
             </View>
    } else {
      const TongType = StoreGlobal({type:'get',key:'tType'});
      let fvalue = this.state.dataSource.map((data, key) => {
        return (
          <View key={key}>
            <TongFriendList
              name={data.tongMemNm}
              type={data.jobgroup}
              data={data}
              detailHref={(modalData) => {this.setState({modalData:modalData,modal:true})}}
            />
          </View>
        )
      })
      let imageUri = 'profile_no.png';
      if(this.state.modalData) {
        if(this.state.modalData.photo) {
          imageUri = this.state.modalData.photo
        }
      }
      switch(this.state.adminDiv) {
        case 1 : titleName = "안전관리자"; break;
        case 2 : titleName = "현장의료팀"; break;
        case 3 : titleName = "현장소장"; break;
      }
      return (
        <Container>
          <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.modal}
            onRequestClose={() => {
              this.setState({modal:!this.state.modal,modalData:null});
            }}>
            <View style={[styles.center,{flex:1,backgroundColor:'#0006'}]}>
              <View style={{width:'60%',height:'60%',backgroundColor:'#fff'}}>
                <View style={[styles.center,{backgroundColor:'#db3928',flex:0.5}]}>
                  <Text style={{color:'#fff',fontWeight:'bold'}}>동료 정보</Text>
                </View>
                <View style={{flex:5}}>
                  <View style={[styles.center,{width:'100%',height:'50%'}]}>
                    <Image
                      style={[styles.tongImage2]}
                      source={{uri: 'http://13.124.127.253/images/userProfile/'+imageUri}}
                    />
                  </View>
                  <View style={[styles.row2,{padding:10}]}>
                    <View style={{flex:1,borderColor:'#aaa',borderRightWidth:1,alignItems:'center'}}>
                      <Text>아이디</Text>
                    </View>
                    <View style={{flex:1.5,paddingLeft:10,alignItems:'center'}}>
                      <Text>{this.state.modalData && this.state.modalData.tongMemId}</Text>
                    </View>
                  </View>
                  <View style={[styles.row2,{padding:10}]}>
                    <View style={{flex:1,borderColor:'#aaa',borderRightWidth:1,alignItems:'center'}}>
                      <Text>이름</Text>
                    </View>
                    <View style={{flex:1.5,paddingLeft:10,alignItems:'center'}}>
                      <Text>{this.state.modalData && this.state.modalData.tongMemNm}</Text>
                    </View>
                  </View>
                  <View style={[styles.row2,{padding:10}]}>
                    <View style={{flex:1,borderColor:'#aaa',borderRightWidth:1,alignItems:'center'}}>
                      <Text>직급</Text>
                    </View>
                    <View style={{flex:1.5,paddingLeft:10,alignItems:'center'}}>
                      <Text>{this.state.modalData && this.state.modalData.jobGrade}</Text>
                    </View>
                  </View>
                  <View style={[styles.row2,{flex:1}]}>
                    <TouchableOpacity style={[styles.center,{flex:1,backgroundColor:'#db3029'}]}
                      onPress={() => this.acceptInvite(this.state.modalData)}
                    >
                      <Text style={{fontSize:15,color:'#fff'}}>저장</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.center,{flex:1,backgroundColor:'#ddd'}]}
                      onPress={() => this.setState({modal:!this.state.modal,modalData:null})}
                    >
                      <Text style={{fontSize:15}}>취소</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
          <Header style={{height:70,paddingTop:20,backgroundColor:'#db3928',borderBottomWidth:1,borderBottomColor:'#ccc'}}>
            <Left style={{flex:1}}>
              <Button rounded transparent onPress={this._goBack}>
                <Icon name="angle-left" type="FontAwesome" />
              </Button>
            </Left>
            <Body style={{flex:5,alignItems:'center'}}>
              <Text style={{textAlign:'center',color:'#fff',fontSize:20}}>{titleName} 설정</Text>
            </Body>
            <Right  style={{flex:1}}>
            </Right>
          </Header>
          <Content
            showsVerticalScrollIndicator={false}
            style={{ backgroundColor: "#f9f9f9" }}
          >
            <View style={{paddingBottom:10}}>
              <View style={styles.Box}>
                {this.state.dataSource2 ? (
                  <Text>현재 관리자 : {this.state.dataSource2['tongMemNm']}</Text>
                ) : (
                  <Text style={{color:'#db3928'}}>관리자를 등록하세요.</Text>
                )}
              </View>
              <View style={{padding:10}}>
                <Text style={{fontSize:11}}>관리자 변경</Text>
              </View>
              <View style={styles.Box}>
                {fvalue}
              </View>
            </View>
          </Content>
        </Container>
      );
    }
  }
}
export default TongAdmin2;

class TongFriendList extends Component{
  render() {
    return(
      <TouchableOpacity onPress={() => this.props.detailHref(this.props.data)}>
        <View style={styles.friendList}>
          <View style={{flexDirection:'row',alignItems:'center'}}>
            <Image source={require('../../assets/images/profile_no.png')} style={styles.friendThumbnail} />
            <Text style={styles.friendName}>{this.props.name}</Text>
            <Text style={styles.friendInfo}>{this.props.type}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}
