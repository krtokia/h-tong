import React, { Component } from 'react';
import {Alert, Image, TextInput, ImageBackground, TouchableOpacity, Text } from 'react-native';
import {
  Container,
  Content,
  View,
  H1,
  H3,
  Button,
  Icon as NBIcon
} from "native-base";

import Icon from 'react-native-vector-icons/FontAwesome';

import { ImagePicker } from 'expo';
import styles from "./styles";

class createTong extends Component{
  static navigationOptions = ({
    headerTitle: null,
    headerRight: null,
    headerStyle: {
      backgroundColor: '#fff',
      shadowOpacity: 0,
      shadowOffset: { width:0, height:0 },
      shadowRadius: 0,
      elevation: 0,
    }
  });
  render(){
    return (
      <Container>
        <Content
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: "#fff" }}
        >
          <View style={styles.container}>
            <Image source={require('../../assets/images/logo.png')} style={styles.CreateTongLogo} />
            <View style={{marginTop:20,alignItems:'center'}}>
              <H3>만들고 싶은 모임을 선택하세요.</H3>
              <Text>현장직 동료들과 함께하는 공간</Text>
            </View>
            <View style={{marginTop:20,alignItems:'center',justifyContent:'center'}}>
              <Text style={{color:'#cc0404'}}>현장통 활용법 보기 <Icon name='angle-right' size={15} style={{color:'#cc0404'}} /></Text>
            </View>
            <View style={{marginTop:20,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
              <View style={{width:100,height:120,marginHorizontal:5,alignItems:'center'}}>
                <Image style={{width:100,height:100}} source={require('../../assets/images/createTong1.png')} />
                <Text>시공사</Text>
              </View>
              <View style={{width:100,height:120,marginHorizontal:5,alignItems:'center'}}>
                <Image style={{width:100,height:100}} source={require('../../assets/images/createTong2.png')} />
                <Text>감리</Text>
              </View>
              <View style={{width:100,height:120,marginHorizontal:5,alignItems:'center'}}>
                <Image style={{width:100,height:100}} source={require('../../assets/images/createTong3.png')} />
                <Text>협력사</Text>
              </View>
            </View>
            <View style={{marginTop:50,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
              <Button iconLeft rounded style={{backgroundColor:'#cc0404',padding:20,alignItems:'center'}}
                onPress={() => {this.props.navigation.navigate('createTong2')}}>
                <Image source={require('../../assets/images/addButton.png')} />
                <Text style={{color:'#fff',fontSize:20}}> 직접 만들기</Text></Button>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}
export default createTong;
