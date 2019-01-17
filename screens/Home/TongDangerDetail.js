import React, { Component } from 'react';
import {
  ActionSheet,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  ImageBackground,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Alert,
  TextInput,
  Picker,
  ScrollView,
  ToastAndroid
 } from 'react-native';
 import {
   Container,
   Content,
   Text,
   View,
   Button,
   Icon,
   Accordion,
   Header,
   Left,
   Right,
   Body,
   Form,
   Textarea,
   Footer,
   FooterTab
 } from "native-base";

import { StoreGlobal } from '../../App';

import styles from './styles.js';
import pickableImage from "../common.js"

class TongDangerDetail extends pickableImage{
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      modalData: null,
      isLoading: true,
      memId: StoreGlobal({type:'get',key:'loginId'}),
      tongnum: StoreGlobal({type:'get',key:'tongnum'}),
      dataSource: null,
      imageSource: null,
      buttonAction: true,
    }
  }

  getDanger = async() => {
      return fetch("http://13.124.127.253/api/results.php?page=tongDanger&tongnum=" + this.state.tongnum + "&seq=" + this.props.navigation.getParam('dangerData'))
            .then((response) => response.json())
            .then((responseJson) => {
              //let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
              this.setState({
                isLoading: false,
                dataSource: responseJson[0],
              });
            })
            .catch((error) => {
              console.error(error);
            });
  }
  componentDidMount() {
    this.getDanger()
  }

  dangerSolve = () => {
    this.setState({buttonAction:false})
    const { dataSource, afterContent, imageSource, memId } = this.state;
    let apiUrl = 'http://13.124.127.253/api/tongDanger.php?';

    const formData = new FormData();

    formData.append('div', 'solve');
    formData.append('solveId', memId);
    formData.append('seq', this.props.navigation.getParam('dangerData'));
    formData.append('afterContent', afterContent);

    if (imageSource) {
      uri = imageSource;
      uriParts = uri.split('.');
      fileType = uriParts[uriParts.length - 1];

      formData.append('photo', {
        uri,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
      });
    }
    if (imageSource) {
      options = {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      };
    } else {
      options = {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      }
    }

    return fetch(apiUrl, options).then((response) => response.json())
      .then((responseJson)=> {
        if(responseJson === 'succed') {
          ToastAndroid.show("저장 되었습니다.", ToastAndroid.BOTTOM)
          this.setState({buttonAction:true})
          this._goBack();
        } else {
          //alert(responseJson);
          console.log(responseJson)
        }
      }).catch((error) => {
        console.log(error)
      });
  }

  dangerDel = () => {
    this.setState({modal:false})
    const { content, memId } = this.state;
    let apiUrl = 'http://13.124.127.253/api/tongDanger.php?';

    const formData = new FormData();

    formData.append('div', 'reject');
    formData.append('solveId', memId);
    formData.append('seq', this.props.navigation.getParam('dangerData'));
    formData.append('reject', content);
    options = {
      method: 'POST',
      body: formData,
      headers: { Accept: 'application/json' },
    }

    return fetch(apiUrl, options).then((response) => response.json())
      .then((responseJson)=> {
        if(responseJson === 'succed') {
          ToastAndroid.show("저장 되었습니다.", ToastAndroid.BOTTOM)
          this._goBack();
        } else {
          //alert(responseJson);
          console.log(responseJson)
        }
      }).catch((error) => {
        console.log(error)
      });
  }

  _goBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
    navigation.state.params.refresh({ refresh: Date(Date.now()).toString() })
  }
  render(){
    if (this.state.isLoading) {
      return (
        <View Style={{flex:1, paddingTop:20}}>
          <ActivityIndicator />
        </View>
      )
    } else {
      const { dataSource } = this.state;
      return (
        <Container>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modal}
            onRequestClose={() => {
              this.setState({modal:!this.state.modal});
            }}>
            <TouchableWithoutFeedback onPress={() => console.log('onPress')} style={[{flex:1}]}>
            <View style={[styles.center,{flex:1,backgroundColor:'#0008'}]}>
              <View style={[styles.row2]}>
                <View style={[styles.row2,{width:'70%',backgroundColor:'#fff',padding:10,alignItems:'center',borderRadius:10}]}>
                  <Text style={{fontSize:13}}>삭제 사유 : </Text>
                  <TextInput
                    underlineColorAndroid="transparent"
                    style={{backgroundColor:'#0001',width:'70%'}}
                    multiline={true}
                    numberOfLines={4}
                    onChangeText={(content) => {
                      this.setState({content})
                    }}
                  />
                </View>
              </View>
              <View style={{alignSelf:'center',width:'50%',marginTop:10}}>
                <Button
                  style={{backgroundColor:'#db3928'}}
                  rounded
                  block
                  iconLeft
                  small
                  onPress={this.dangerDel}
                >
                  <Icon type="FontAwesome" name="exclamation-circle" />
                  <Text>위험 삭제</Text>
                </Button>
              </View>
            </View>
            </TouchableWithoutFeedback>
          </Modal>
          <Header style={{height:70,paddingTop:20,backgroundColor:'#db3928',borderBottomWidth:1,borderBottomColor:'#ccc'}}>
            <Left style={{flex:1}}>
              <TouchableOpacity style={{padding:10}}
                onPress={this._goBack}
              >
                <Icon name="angle-left" type="FontAwesome" style={{color:'#fff'}}/>
              </TouchableOpacity>
            </Left>
            <Body style={{flex:1,alignItems:'center'}}>
              <Text style={{textAlign:'center',color:'#fff',fontSize:20}}>위험치워줘</Text>
            </Body>
            <Right  style={{flex:1}}>
            </Right>
          </Header>
          <Content
            showsVerticalScrollIndicator={false}
            style={{ backgroundColor: "#f4f4f4" }}
            contentContainerStyle={{flex:1}}
          >
            <View style={[styles.Box,styles.row2,{height:70,marginBottom:10}]}>
              <View style={{width:50,height:50,borderWidth:1,borderRadius:40,borderColor:'#999',padding:2}}>
                <Image source={{uri: 'http://13.124.127.253/images/userProfile/'+dataSource.userImg}}
                  style={{flex:1,borderRadius:40}}
                />
              </View>
              <View style={{flex:3,justifyContent:'space-between',paddingLeft:30}}>
                <Text style={{fontWeight:'bold',fontSize:12}}>{dataSource.userNm}</Text>
                <Text style={{fontSize:11,color:'#999'}}>{dataSource.company} / {dataSource.jobGrade}</Text>
                <Text style={{fontSize:11,color:'#999'}}>{dataSource.cellPhone}</Text>
              </View>
            </View>
            {/* 처리 전 */}
            <View style={[styles.Box,{flex:1}]}>
              <View style={{height:30}}>
              <Text style={{fontSize:15,color:'#db3928',position:'absolute',top:5,left:5}}>처리 전</Text>
              </View>
              <View style={{flex:1}}>
                <View style={{flex:1}}>
                  <Image source={{uri: 'http://13.124.127.253/images/danger/'+dataSource.beforeImg}}
                    style={{flex:1}}
                    resizeMode="contain" />
                </View>
                <View style={[styles.row2,{marginTop:3,width:'80%',alignSelf:'center'}]}>
                  <View style={styles.center}>
                    <Text style={{fontSize:13,color:'#666'}}>내용 :</Text>
                  </View>
                  <View style={[styles.grayBottom,{flex:1}]}>
                    <TextInput style={{fontSize:13}}
                      underlineColorAndroid="transparent"
                      editable={false}
                      value={dataSource.beforeContent}
                      onChangeText={(content) => {
                        this.setState({beforeContent: content})
                      }}
                    />
                  </View>
                </View>
              </View>
            </View>
            {/* 처리 후 */}
            <View style={[styles.Box,{flex:1}]}>
              <Text style={{fontSize:15,color:'#2e6d02',position:'absolute',top:5,left:5}}>처리 후</Text>
              <View style={{flex:1}}>
                <View style={{flex:1}}>
                  <TouchableOpacity style={{width:'100%',height:'100%'}}
                    onPress={StoreGlobal({type:'get',key:'isAdmin'}) == 1 ? this._pickImage2 : () => ToastAndroid.show("안전 관리자만 등록 가능합니다.", ToastAndroid.BOTTOM)}
                  >
                    { this.state.imageSource ? (
                      <Image source={{uri: this.state.imageSource}}
                        style={{flex:1}}
                        resizeMode="contain"
                      />
                    ) : (
                      <View style={[styles.center,{flex:1}]}>
                        <View style={[styles.center,{width:'50%',height:'100%',borderWidth:1,borderColor:'#666',borderRadius:10}]}>
                          <Icon name="camera" type="FontAwesome" style={{color:'#666',marginBottom:10}} />
                          <Text style={{color:'#666'}}>사진 올리기</Text>
                        </View>
                      </View>
                    )}
                  </TouchableOpacity>
                </View>
                <View style={[styles.row2,{marginTop:3,width:'80%',alignSelf:'center'}]}>
                  <View style={styles.center}>
                    <Text style={{fontSize:13,color:'#666'}}>내용 :</Text>
                  </View>
                  <View style={[styles.grayBottom,{flex:1}]}>
                    <TextInput style={{fontSize:13}}
                      underlineColorAndroid="transparent"
                      editable={StoreGlobal({type:'get',key:'isAdmin'}) == 1 ? true : false }
                      value={this.state.afterContent}
                      onChangeText={(content) => {
                        this.setState({afterContent: content})
                      }}
                    />
                  </View>
                </View>
              </View>
            </View>
            {/* 버튼 */}
            {StoreGlobal({type:'get',key:'isAdmin'}) == 1 &&
            <View style={[styles.row2,{height:40,padding:5}]}>
              <View style={{flex:1,paddingHorizontal:30}}>
              <Button
                rounded
                block
                iconLeft
                success
                small
                onPress={this.state.buttonAction && this.dangerSolve}
              >
                <Icon name="check" type="FontAwesome" />
                <Text>완료</Text>
              </Button>
              </View>
              <View style={{flex:1,paddingHorizontal:30}}>
              <Button
                rounded
                block
                iconLeft
                danger
                small
                onPress={() => this.setState({modal:!this.state.modal})}
              >
                <Icon name="close" type="FontAwesome"/>
                <Text>삭제</Text>
              </Button>
              </View>
            </View>
            }
          </Content>
        </Container>
      );
    }
  }
}
export default TongDangerDetail;

class ModalOut extends Component {
  render() {
    return(
      <View style={{flex:1}}>
        <TouchableWithoutFeedback onPress={() => {this.props.closeModal(false)}}>
          <View style={{flex:1}} />
        </TouchableWithoutFeedback>
      </View>
    )
  }
}
