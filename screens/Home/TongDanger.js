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
  ScrollView
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

class TongDanger extends pickableImage{
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      modalData: null,
      memId: StoreGlobal({type:'get',key:'loginId'}),
      tongnum: StoreGlobal({type:'get',key:'tongnum'}),
    }
  }

  getNoti = async() => {
      return fetch("http://13.124.127.253/api/results.php?page=selectNotice&tongnum=" + this.state.tongnum)
            .then((response) => response.json())
            .then((responseJson) => {
              //let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
              this.setState({
                isLoading: false,
                DataSource: responseJson,
              });
            })
            .catch((error) => {
              console.error(error);
            });
  }
  componentDidMount() {
  }

  dangerReg = () => {
    this.setState({modal:false})
  }

  refresh = refresh => {
    this.setState({refresh})
  }
  _goBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
    navigation.state.params.refresh({ refresh: Date(Date.now()).toString() })
  }
  onPageLayout = (event) => {
    const { width, height } = event.nativeEvent.layout;
    this.setState({width,height})
  }
  render(){
    const { modalData } = this.state;
    if (this.state.isLoading) {
      return (
        <View Style={{flex:1, paddingTop:20}}>
          <ActivityIndicator />
        </View>
      )
    } else {
      return (
        <Container>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modal}
            onRequestClose={() => {
              this.setState({modal:!this.state.modal});
            }}>
            <View style={[{flex:1,backgroundColor:'#0008'}]}>
              <ModalOut closeModal={(modal) => this.setState({modal})} />
              <View style={[styles.row2,{flex:1}]}>
                <ModalOut closeModal={(modal) => this.setState({modal})} />
                <View style={[styles.center,{flex:5,padding:10}]}>
                  <TouchableOpacity style={{width:'100%',height:'100%'}}
                    onPress={this._pickImage2}
                  >
                    { this.state.imageSource ? (
                      <View style={[{flex:1}]}>
                        <Image source={{uri: this.state.imageSource}}
                          resizeMode="contain"
                          style={{flex:1,borderRadius:10}}
                        />
                      </View>
                    ) : (
                      <View style={[styles.center,{flex:1,backgroundColor:'#fff',borderRadius:10}]}>
                        <Icon name="camera" type="FontAwesome" style={{color:'#999'}}/>
                        <Text style={{color:'#999'}}>사진 올리기</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                </View>
                <ModalOut closeModal={(modal) => this.setState({modal})} />
              </View>
              <View style={[styles.row2]}>
                <ModalOut closeModal={(modal) => this.setState({modal})} />
                <View style={[styles.row2,{width:'70%',backgroundColor:'#fff',padding:10,alignItems:'center',borderRadius:10}]}>
                  <Text style={{fontSize:13}}>내용입력 : </Text>
                  <TextInput
                    underlineColorAndroid="transparent"
                    style={{backgroundColor:'#0001',width:'70%'}} />
                </View>
                <ModalOut closeModal={(modal) => this.setState({modal})} />
              </View>
              <View style={{alignSelf:'center',width:'50%',marginTop:10}}>
                <Button
                  style={{backgroundColor:'#db3928'}}
                  rounded
                  block
                  iconLeft
                  small
                  onPress={this.dangerReg}
                >
                  <Icon type="FontAwesome" name="exclamation-circle" />
                  <Text>위험 등록</Text>
                </Button>
              </View>
              <ModalOut closeModal={(modal) => this.setState({modal})} />
            </View>
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
          >
            <View style={{padding:5,marginLeft:10}}>
              <Text style={{fontSize:12}}>담당자 정보</Text>
            </View>
            <View style={[styles.Box,styles.row2,{height:70,marginBottom:10}]}>
              <View style={{width:50,height:50,borderWidth:1,borderRadius:40,borderColor:'#999',padding:2}}>
                <Image source={{uri: 'http://13.124.127.253/images/tongHead/photo_3.jpg'}}
                  style={{flex:1,borderRadius:40}}
                />
              </View>
              <View style={{flex:3,justifyContent:'space-between',paddingLeft:30}}>
                <Text style={{fontWeight:'bold',fontSize:12}}>담당자</Text>
                <Text style={{fontSize:11,color:'#999'}}>어디회사 / 직급</Text>
                <Text style={{fontSize:11,color:'#999'}}>010-1111-1111</Text>
              </View>
              <View style={{flex:1.5,justifyContent:'center'}}>
                <Button
                  rounded
                  small
                  style={{backgroundColor:'#db3928'}}
                  onPress={() => this.setState({modal:!this.state.modal})}
                >
                  <Text style={{fontSize:12,}}>
                  <Icon name="plus-circle" type="FontAwesome" style={{color:'#fff',fontSize:14}} />
                   {` `}작성</Text>
                </Button>
              </View>
            </View>
            <DangerList
              detail={(data) => this.props.navigation.navigate("TongDangerDetail",{dangerData:data,refresh:this.refresh})}
            />
            <DangerList
              detail={(data) => this.props.navigation.navigate("TongDangerDetail",{dangerData:data,refresh:this.refresh})}
            />
            <DangerList
              detail={(data) => this.props.navigation.navigate("TongDangerDetail",{dangerData:data,refresh:this.refresh})}
            />
            <DangerList
              detail={(data) => this.props.navigation.navigate("TongDangerDetail",{dangerData:data,refresh:this.refresh})}
            />
          </Content>
          <View style={{position:'absolute',bottom:8,right:8}}>
            <Button
              rounded
              small
              style={{backgroundColor:'#db3928'}}
              onPress={() => this.setState({modal:!this.state.modal})}
            >
              <Text style={{fontSize:12,}}>
              <Icon name="plus-circle" type="FontAwesome" style={{color:'#fff',fontSize:14}} />
               {` `}작성</Text>
            </Button>
          </View>
        </Container>
      );
    }
  }
}
export default TongDanger;

class DangerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      i:0,
      dot:".",
    }
  }
  componentWillUnmount() {
    clearInterval(this.delay)
  }
  delay = setInterval(() => {
    const { i } = this.state
    if(i < 5) {
      this.setState({dot:this.state.dot+".",i:this.state.i+1})
    } else {
      this.setState({dot:".",i:0})
    }
  },2000)
  render() {
    const { complete, detail } = this.props;
    return (
      <View style={styles.dangerBox}>
        <TouchableOpacity style={[{width:'100%',height:'100%'}]}
          onPress={() => detail("null!!!!")}
        >
          <View style={{paddingLeft:20,paddingVertical:3,justifyContent:'center'}}>
            <Text style={{fontSize:10,color:'#666'}}>등록일시 : 2018-11-11 11:11:11</Text>
          </View>
          <View style={[styles.row2,{flex:1}]}>
            <View style={{flex:1,padding:5}}>
              <View style={{flex:3}}>
                <Image source={{uri: 'http://13.124.127.253/images/tongHead/photo_3.jpg'}}
                  style={{flex:1}} />
              </View>
              <View style={{flex:1,marginTop:3}}>
                <Text style={{fontSize:11}}>내용</Text>
              </View>
            </View>
            <View style={{flex:1.5}}>
              { this.props.complete ? (
                <View style={[styles.row2,{flex:1}]}>
                  <View style={{flex:2,padding:5}}>
                    <View style={{flex:3}}>
                      <Image source={{uri: 'http://13.124.127.253/images/tongHead/photo_3.jpg'}}
                        style={{flex:1}} />
                    </View>
                    <View style={{flex:1,marginTop:3}}>
                      <Text style={{fontSize:11}}>내용</Text>
                    </View>
                  </View>
                  <View style={[styles.center,{flex:1,paddingBottom:30}]}>
                    <Text style={{fontWeight:'bold',color:'#db3928'}}>처리</Text>
                    <Text style={{fontWeight:'bold',color:'#db3928'}}>완료</Text>
                  </View>
                </View>
              ) : (
                <View style={[styles.row2,{flex:1,alignItems:'center'}]}>
                  <Text style={{textAlign:'right',fontSize:20,fontWeight:'bold',flex:1}}>
                    처리중
                  </Text>
                  <Text style={{fontSize:20,fontWeight:'bold',flex:1}}>
                    {this.state.dot}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

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
