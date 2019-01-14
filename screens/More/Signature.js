import React, { Component } from 'react';
import {Alert, Image, TextInput, ImageBackground, TouchableOpacity, Modal, View as RNView } from 'react-native';
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

import { ImagePicker } from 'expo';
import styles from "./styles";

import SignaturePad from 'react-native-signature-pad';
import axios from 'axios';
import pickableImage from "../common.js";
import { StoreGlobal } from '../../App';

class Signature extends Component{

  constructor(props) {
      super(props);
      this.state = {
        memId: StoreGlobal({type:'get',key:'loginId'}),
        imageSource:null,
        padKey: 1,
      }
      this.uploadSignature = this.uploadSignature.bind(this);
  //.    this.uploadImage = this.uploadImage.bind(this);
  }

  componentWillMount() {

  }

  static navigationOptions = ({
    header: null
  });

  _signaturePadError = (error) => {
     console.error(error);
   };

   _signaturePadChange = ({base64DataUrl}) => {
     this.setState({
       imageSource: base64DataUrl,
     });

   };

   onClear = () => {
     this.setState({
       padKey : Math.floor(Math.random(100) * 100),
     });
   }

  uploadSignature() {

     axios.get('http://h-tong.kr/api/uploadSign.php?id=' + this.state.memId + '&sign=' + this.state.imageSource)
     .then( response => {
       Alert.alert('',"전자 서명이 등록 되었습니다");
       this._goBack()
     })
     .catch( response => { } )

  }

  _goBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
    navigation.state.params.refresh({ refresh: Date(Date.now()).toString() })
  }


    render(){

      return (
        <Container>
        <Header style={{backgroundColor:'#db3928',justifyContent:'space-between'}}>
        <Left style={{flex:1}} />
        <Body style={{justifyContent:'center',alignItems:'center',alignSelf:'flex-end',paddingBottom:10}}>
        <Text style={{fontSize:20,color:'#fff'}}>전자 서명</Text>
        </Body>
        <Right style={{alignSelf:'flex-end',flex:1}}>
        <Button transparent rounded onPress={() => {this.props.navigation.navigate('Main')}}>
        <NBIcon name="close" style={{color:'#fff'}} />
        </Button>
        </Right>
        </Header>
        <Content
        style={{ backgroundColor: "#fff" }}
        contentContainerStyle={{ flex: 1 }}
        >
        <View style={[styles.container,{marginTop:10,padding:20}]}>
        <View style={{flex:5,width:'100%',borderWidth:5,borderColor:'#ccc',borderRadius:10}}>

        <SignaturePad
          onError={this._signaturePadError}
          onChange={this._signaturePadChange}
          style={{flex: 1, backgroundColor: 'white'}}
          key={this.state.padKey}
        />

        </View>

        <View style={{alignItems:'flex-end',width:'100%',flex:1,justifyContent:'flex-end'}}>
        <View style={{borderBottomWidth:1,borderBottomColor:'#db3928',flexDirection:'row',alignItems:'flex-end'}}>
        <NBIcon name="edit" type="FontAwesome" style={{color:'#db3928',fontSize:15}} />
        <TouchableOpacity  onPress={this.onClear} ><Text style={{color:'#db3928',fontSize:15}}> 다시서명</Text></TouchableOpacity>
        </View>
        </View>
        <View style={{width:'100%',flex:3,justifyContent:'center'}}>
        <Text style={{fontSize:14}}>{`※ 등록하신 전자서명은 노무비 선지급을 위한 위임장과 노무비 청구 시 사용됩니다.`}</Text>
        </View>
        <View style={{width:'60%',flex:1}}>
        <Button full rounded style={{backgroundColor:'#db3928'}} onPress={this.uploadSignature}>
        <Text style={{fontSize:18}}>저장</Text>
        </Button>
        </View>
        <View style={{flex:2}} />
        </View>
        </Content>
        </Container>
      );
    }
  }

  export default Signature;
