import React, { Component } from 'react';
import { ActivityIndicator, Alert, Image, TextInput, ImageBackground, TouchableOpacity, Modal } from 'react-native';
import {
  Text,
  Container,
  Content,
  View,
  H1,
  H3,
  Button,
  Icon as NBIcon,
  Header,
  Left,
  Body,
  Right,
  Input
} from "native-base";

import Icon  from 'react-native-vector-icons/FontAwesome';

import { StoreGlobal } from '../../App';

import pickableImage from "../common.js"

import styles from "./styles";

class Papers extends pickableImage{
  constructor(props) {
    super(props);

    this.setModalVisible = this.setModalVisible.bind(this);

    this.state = {
      modalVisible: false,
      modalname: null,
      memId: 'SID',
      isLoading: true,
      pfData: null,
      modalArray: null,
    };
  }
  setModalVisible(visible,childProps) {
    this.setState({
      modalVisible: visible,
      modalArray: childProps,
      modalname: childProps ? childProps.name : null,
      modalImage: childProps ? childProps.hasPaper ? `http://13.124.127.253/images/userPaper/`+childProps.hasPaper : null : null,
    });
  }

  resetState() {
    this.setState({
      modalVisible: false,
      modalname: null,
      memId: 'SID',
      isLoading: true,
      pfData: null,
      modalArray: null,
      imageSource: null,
      imgresult: null
    });
  }

  getProfile = async() => {
      return fetch("http://13.124.127.253/api/results.php?page=getUserPaper&seq=" + this.state.memId)
            .then((response) => response.json())
            .then((responseJson) => {
              //let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
              this.resetState();
              this.setState({
                isLoading: false,
                pfData: responseJson,
              })
            })
            .catch((error) => {
              console.error(error);
            });
  }

  componentDidMount() {
    this.getProfile();
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.imageSource !== prevState.imageSource) {
      this.setState({modalImage: this.state.imageSource})
    }
  }

  imgUpload() {
    const { modalArray, memId, imageSource } = this.state;

    let apiUrl = 'http://13.124.127.253/api/paperReg.php';

    const formData = new FormData();

    formData.append('userId', memId);
    formData.append('columnName', modalArray.columnName);

    if (imageSource) {
      uri = imageSource;
      uriParts = uri.split('.');
      fileType = uriParts[uriParts.length - 1];

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
    } else {

      options = {
        method: 'POST',
        body: formData,
      }

    }

    return fetch(apiUrl, options).then((response) => response.json())
      .then((responseJson)=> {
        if(responseJson === 'succed') {
          console.log(responseJson);
          this.getProfile();
        } else {
          //alert(responseJson);
          Alert.alert(
            '현장통',
            responseJson
          )
        }
      }).catch((error) => {
        console.log(error)
      });
  }

  setPaper() {
    if(this.state.imageSource) {
      Alert.alert(
        "서류등록",
        "이 서류를 등록 하시겠습니까?",
        [
          {text: "예", onPress: () => {this.imgUpload()}},
          {text: "아니오", onPress: () => {console.log("서류등록 취소"),this.setState({modalVisible:false})}}
        ],
        { cancelable: false }
      )
    } else {
      this.getProfile()
    }
  }

  static navigationOptions = ({
    header: null
  });
  render(){
    if (this.state.isLoading) {
      return (
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <ActivityIndicator />
        </View>
      )
    } else {
      let userPaper = this.state.pfData.map((val, key) => {
        return <View style={styles.Box} key={key}>
          <PaperList2
            name="안전교육증"
            columnName="safe"
            hasPaper={val.safe}
            setModalVisibleParent={this.setModalVisible}
          />
          <PaperList2
            name="신분증"
            columnName="idcard"
            hasPaper={val.idcard}
            setModalVisibleParent={this.setModalVisible}
          />
          <PaperList2
            name="통장사본"
            columnName="bankbook"
            hasPaper={val.bankbook}
            setModalVisibleParent={this.setModalVisible}
          />
          <PaperList2
            name="자격증"
            columnName="cert"
            hasPaper={val.cert}
            setModalVisibleParent={this.setModalVisible}
          />
          <PaperList2
            name="장비등록증"
            columnName="machine"
            hasPaper={val.machine}
            setModalVisibleParent={this.setModalVisible}
          />
          <PaperList2
            name="장비검사증"
            columnName="insp"
            hasPaper={val.insp}
            setModalVisibleParent={this.setModalVisible}
          />
          <PaperList2
            name="장비보험증"
            columnName="insurance"
            hasPaper={val.insurance}
            setModalVisibleParent={this.setModalVisible}
          />
          <PaperList2
            name="사업자등록증"
            columnName="business"
            hasPaper={val.business}
            setModalVisibleParent={this.setModalVisible}
          />
          <PaperList2
            name="자동차등록증"
            columnName="car"
            hasPaper={val.car}
            setModalVisibleParent={this.setModalVisible}
          />
        </View>
      })
      return (
        <Container>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              this.setModalVisible(!this.state.modalVisible);
            }}>
            <View style={{flex:1,alignItems:'center',backgroundColor:'#0009'}}>
              <TouchableOpacity style={{flex:3,width:'100%'}}
              onPress={() => {this.setModalVisible(!this.state.modalVisible);}} />
              <View style={{flex:4,width:'100%',justifyContent:'center',alignItems:'center'}}>
                <View style={{backgroundColor:'#fff',width:150,height:150,borderRadius:10,borderWidth:3,borderColor:'#ddd',justifyContent:'center',alignItems:'center'}}>
                  <TouchableOpacity style={{justifyContent:'center',alignItems:'center'}}
                    onPress={this._pickImage.bind(this)}
                  >
                  { this.state.modalImage ? (
                      <Image
                        source={{uri: this.state.modalImage }}
                        style={{resizeMode:"contain", width:150, height:150}}
                      />
                    ) : (
                      <View style={{justifyContent:'center',alignItems:'center'}}>
                      <NBIcon name="camera" type="FontAwesome" style={{fontSize:35,color:'#999'}} />
                      <Text style={{color:'#999',marginTop:20,fontSize:15}}>서류 사진 추가</Text>
                      </View>
                    )
                  }
                  </TouchableOpacity>
                </View>
                <View style={{width:'40%',flex:1,alignItems:'center',marginTop:20}}>
                  <Text style={{color:'#fff'}}>{this.state.modalname}</Text>
                  <View style={{width:'100%',marginTop:20}}>
                    <Button transparent rounded block
                      style={{backgroundColor:'#db3928'}}
                      onPress={() => {this.setPaper()}}
                    >
                      <Text style={{color:'#fff'}}>완료</Text>
                    </Button>
                  </View>
                </View>
              </View>
              <TouchableOpacity style={{flex:3,width:'100%'}}
              onPress={() => {this.setModalVisible(!this.state.modalVisible);}} />
            </View>
          </Modal>

          <Header style={{backgroundColor:'#db3928',justifyContent:'space-between'}}>
            <Left style={{flex:1}} />
            <Body style={{justifyContent:'center',alignItems:'center',alignSelf:'flex-end',paddingBottom:10}}>
              <Text style={{fontSize:20,color:'#fff'}}>서류등록</Text>
            </Body>
            <Right style={{alignSelf:'flex-end',flex:1}}>
              <Button transparent rounded onPress={() => {this.props.navigation.navigate('Main')}}>
                <NBIcon name="close" style={{color:'#fff'}} />
              </Button>
            </Right>
          </Header>
          <Content
            showsVerticalScrollIndicator={false}
            style={{ backgroundColor: "#f9f9f9" }}
            contentContainerStyle={{flex:1}}
          >
            {userPaper}
          </Content>
        </Container>
      );
    }
  }
}

export default Papers;

class PaperList2 extends Component{
  render() {
    const fontS = 14;
    return(
      <TouchableOpacity style={[styles.grayBottom,styles.row,{justifyContent:'space-between',padding:13,paddingBottom:8}]}
        onPress={() => this.props.setModalVisibleParent(true,this.props)}
      >
        <View style={[styles.row,]}>
          <NBIcon name="file-text-o" type="FontAwesome" style={{fontSize:fontS,marginRight:5}} />
          <Text style={{fontSize:fontS}}>{this.props.name}</Text>
          { !this.props.hasPaper &&
            <NBIcon name='primitive-dot' type='Octicons' style={{color:'#db3928',fontSize:12,marginLeft:5}} />
          }
        </View>
        <View>
          <Text style={{fontSize:12,color:this.props.hasPaper ? '#666' : '#db3928'}}>{this.props.hasPaper ? "보기" : "등록"}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

class PaperList extends Component{
  render() {
    return(
      <View style={styles.paperItems}>
        <View style={{flex:2,flexDirection:'row',justifyContent:'space-between'}}>
          <View style={{flexDirection:'row',alignItems:'center'}}>
            {this.props.icons}
            <Text style={{marginLeft:0,}}>{this.props.title}</Text>
          </View>
          <View style={{flexDirection:'row',alignItems:'flex-end'}}>
            <Icon name="edit" type="FontAwesome" style={{color:'#db3928'}} />
            <Text style={{fontSize:12,color:'#db3928'}}> 수정</Text>
          </View>
        </View>
        <View style={{flex:8,borderWidth:5,borderColor:'#e9e9e9',borderRadius:10,padding:5,justifyContent:'center',alignItems:'center'}}>
          {this.props.image}
        </View>
      </View>
    )
  }
}
