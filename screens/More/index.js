import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  DatePickerAndroid,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Modal
 } from 'react-native';
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
 } from "native-base";
import { Grid, Col, Row } from "react-native-easy-grid";

import { StoreGlobal } from '../../App';
import styles from './styles.js';
import pickableImage from "../common.js";

class More extends pickableImage{

  constructor(props) {
    super(props);

    this.state={
      isLoading: true,
      isLoading2: true,
      isLoading3: true,
      dataSource: null,
      id: StoreGlobal({type:'get',key:'loginId'}),
      userImgs: null,
      isLoading2: true,
      openInput: false,
      career: "",
      careerSource: null,
      modal: false,
      modalImg: null
    }
  }

  getUser = async() => {
    this.setState({isLoading:true})
    return fetch("http://13.124.127.253/api/results.php?page=setting&id=" + this.state.id)
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

  getImages = async() => {
    this.setState({isLoading2:true})
    return fetch("http://13.124.127.253/api/results.php?page=userImage&id=" + this.state.id)
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
    return fetch("http://13.124.127.253/api/results.php?page=getCareer&id=" + this.state.id)
      .then((response) => response.json())
      .then((responseJson) => {
        //let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          isLoading3: false,
          careerSource: responseJson,
          openInput: false,
          career: "",
          selectedDate: "",
        });
      })

      .catch((error) => {
        console.error(error);
      });
  }
  componentDidMount() {
    //console.log("START componentDidMount");
    this.getUser()
    this.getImages()
    this.getCareer()
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.navigation.getParam('refresh') !== prevProps.navigation.getParam('refresh')) {
      this.getUser();
    }
    if(this.state.imageSource !== prevState.imageSource) {
      this.uploadImg()
    }
  }

  uploadImg() {
    const { imageSource, id, dataSource } = this.state;
    let apiUrl = 'http://13.124.127.253/api/userUpdate.php?action=imgUpload';
    uri = imageSource;
    uriParts = uri.split('.');
    fileType = uriParts[uriParts.length - 1];

    const formData = new FormData();

    formData.append('userId', id);
    formData.append('photo', {
      uri,
      name: `photo.${fileType}`,
      type: `image/${fileType}`,
    });

    options = {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    };
    return fetch(apiUrl, options).then((response) => response.json())
      .then((responseJson)=> {
        if(responseJson === 'succed') {
          this.getImages()
        }
      }).catch((error) => {
        console.log("error::",error)
      });
  }

  showPicker = async (stateKey, options) => {
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({
        // Use `new Date()` for current date.
        // May 25 2020. Month 0 is January.
        date: new Date(Date.now())
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        this.setState({
          selectedDate: year+"."+(month+1)+"."+day,
          openInput: true,
        })
      }
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }
  }

  insertCareer = () => {
    const { selectedDate, career, id } = this.state;
    let apiUrl = 'http://13.124.127.253/api/userUpdate.php?action=career';
    const formData = new FormData();

    formData.append('userId', id);
    formData.append('careerDate', selectedDate);
    formData.append('career', career);
    options = {
      method: 'POST',
      body: formData
    }
    return fetch(apiUrl, options).then((response) => response.json())
      .then((responseJson)=> {
        if(responseJson === 'succed') {
          this.getCareer()
        } else {
          console.log(responseJson);
        }
      }).catch((error) => {
        console.log("error::",error)
      });
  }

  imageView = (data) => {
    this.setState({modal:!this.state.modal,modalImg:data})
  }

  render(){
    if(this.state.isLoading) {
      return (
        <View style={{justifyContent:'center',alignItems:'center',flex:1}}>
          <ActivityIndicator />
        </View>
      )
    } else if(this.state.isLoading2) {
      return (
        <View style={{justifyContent:'center',alignItems:'center',flex:1}}>
          <ActivityIndicator />
        </View>
      )
    } else if(this.state.isLoading3) {
      return (
        <View style={{justifyContent:'center',alignItems:'center',flex:1}}>
          <ActivityIndicator />
        </View>
      )
    } else {
      let userImg = this.state.dataSource.photo ? this.state.dataSource.photo : "profile_no.png"
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
                  photoVal={val.photo}
                  imgMethod={(data) => this.imageView(data)}
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
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modal}
          onRequestClose={() => {
            this.setState({modal: false, modalImg:null});
          }}>
          <View style={[styles.center,{flex:1,backgroundColor:'#0008'}]}>
            { this.state.modalImg && (
              <TouchableWithoutFeedback onPress={() => this.setState({modal:false,modalImg:null})}>
              <Image source={{uri: `http://13.124.127.253/images/workList/`+this.state.modalImg}}
                style={styles.imageScale}
              />
              </TouchableWithoutFeedback>
            )}
          </View>
        </Modal>
        <Content
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: "#f4f4f4" }}
        >
        <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={100} enabled>
          <View style={[styles.Box,{marginTop:0,paddingTop:30}]}>
            <View style={{flexDirection:'row',borderColor:'#e9e9e9',borderBottomWidth:1}}>
              <View style={{marginBottom:10,alignSelf:'center',alignItems:'center'}}>
                <Image source={{uri: 'http://13.124.127.253/images/userProfile/'+userImg}} style={{width:130,height:130,resizeMode:'cover',borderRadius:500}} />
              </View>
              <View style={{justifyContent:'flex-end',padding:20}}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                  <Text style={{fontWeight:'bold',fontSize:23,marginBottom:8}}>{this.state.dataSource.userNm} </Text>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('Mypage')}>
                  <View style={{flexDirection:'row'}}>
                  <Icon name="edit" type="FontAwesome" style={{fontSize:13,color:'#db3928'}} />
                  <Text style={{fontSize:13,color:'#db3928'}}> 수정</Text>
                  </View>
                  </TouchableOpacity>
                </View>
                <Text style={{fontSize:13,color:'grey',marginBottom:8}}>{this.state.dataSource.company} / {this.state.dataSource.jobgroup}</Text>
                <Text style={{fontSize:15}}>{this.state.dataSource.cellPhone}</Text>
              </View>
            </View>

            <View style={{flexDirection:'row',paddingTop:10,paddingHorizontal:5,alignItems:'center'}}>
              <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <TouchableOpacity style={{justifyContent:'center',alignItems:'center'}} onPress={() => {this.props.navigation.navigate('Papers')}}>
                  <Icon name="upload" type="FontAwesome" style={styles.myIcon} />
                  <Text style={{fontSize:13,color:"#555"}}>서류 등록</Text>
                </TouchableOpacity>
              </View>
              <View style={{flex:1,justifyContent:'center',alignItems:'center',borderRightWidth:1,borderLeftWidth:1,borderColor:'#e9e9e9'}}>
                <TouchableOpacity style={{justifyContent:'center',alignItems:'center'}} onPress={() => {this.props.navigation.navigate('Signature')}}>
                  <Icon name="pencil-square-o" type="FontAwesome" style={styles.myIcon} />
                  <Text style={{fontSize:13,color:"#555"}}>전자 서명</Text>
                </TouchableOpacity>
              </View>
              <View style={{flex:1,justifyContent:'center',alignItems:'center',borderRightWidth:1,borderLeftWidth:1,borderColor:'#e9e9e9'}}>
                <TouchableOpacity style={{justifyContent:'center',alignItems:'center'}} onPress={() => {this.props.navigation.navigate('Settings')}}>
                  <Icon name="folder-open" type="FontAwesome" style={styles.myIcon} />
                  <Text style={{fontSize:13,color:"#555"}}>설정</Text>
                </TouchableOpacity>
              </View>
              <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <TouchableOpacity style={{justifyContent:'center',alignItems:'center'}} onPress={() => {this.props.navigation.navigate('Login')}}>
                  <Icon name="power-off" type="FontAwesome" style={[styles.myIcon,{color:'#db3928'}]} />
                  <Text style={{fontSize:13,color:"#db3928"}}>로그아웃</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.Box}>
            <View style={{alignItems:'flex-start',paddingBottom:10,borderBottomWidth:1,borderBottomColor:'#f4f4f4'}}>
              <Text style={{color:'#aaa',fontSize:13}}>대표사진</Text>
              <ScrollView horizontal={true}>
                <View style={{flexDirection:'row',marginTop:5,justifyContent:'flex-start'}}>
                  {getImages}
                  <TouchableOpacity style={[styles.addImage]} onPress={this._pickImage}>
                    <Icon name="plus" type="FontAwesome" style={{fontSize:30,color:'#999'}} />
                    <Text style={{fontSize:15,color:'#999'}}>추가</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
            <View style={{flexDirection:'row',alignItems:'flex-start',marginTop:10}}>
              <Text style={{color:'#aaa',fontSize:13}}>경력</Text>
              <View style={{marginLeft:10}}>
                {getCareer}
{/*                { this.state.openInput &&
                  <View>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                      <View style={{width:'30%'}}>
                        <TouchableOpacity onPress={this.showPicker.bind(this)}>
                          <Text style={{fontSize:13}}>{this.state.selectedDate}</Text>
                        </TouchableOpacity>
                      </View>
                      <View style={{width:'65%'}}>
                        <TextInput
                          onChangeText={(career) => this.setState({ career })}
                          underlineColorAndroid="transparent"
                          placeholder="경력 입력"
                          style={{fontSize:13}}
                          />
                      </View>
                    </View>
                  </View>
                }
                { this.state.openInput ? (
                  <TouchableOpacity style={[styles.center,styles.row]} onPress={this.insertCareer}>
                    <Icon name="pencil" type="FontAwesome" style={{color:'#db3928',fontSize:15}} />
                    <Text style={{color:'#db3928',fontSize:15}}> 입력</Text>
                  </TouchableOpacity>
                  ) : (
                    <TouchableOpacity style={[styles.center,styles.row]} onPress={this.showPicker.bind(this)}>
                      <Icon name="plus" type="FontAwesome" style={{color:'#999',fontSize:15}} />
                      <Text style={{color:'#999',fontSize:15}}> 추가</Text>
                    </TouchableOpacity>
                  )
                }
*/}
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
        </Content>
      </Container>
    );
  }
  }
}
export default More;

class CareerList extends Component{
  render() {
    return(
      <View style={{flexDirection:'row',marginBottom:12}}>
        <View style={{width:"20%",alignSelf:'center'}}>
          <Text style={{fontSize:11}}>{this.props.dateVal}</Text>
        </View>
        <View style={{width:"50%",alignSelf:'center'}}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={{fontSize:13}}>{this.props.infoVal}</Text>
        </View>
        <View style={{width:"30%",height:50,paddingRight:10}}>
        { this.props.photoVal && (
          <TouchableWithoutFeedback onPress={() => this.props.imgMethod(this.props.photoVal)}>
            <Image source={{uri: `http://13.124.127.253/images/workList/`+this.props.photoVal}}
              style={{width:"100%", height:"100%", resizeMode:'contain'}}
            />
          </TouchableWithoutFeedback>
        )}
        </View>
      </View>
    )
  }
}

const style = StyleSheet.create({

})
