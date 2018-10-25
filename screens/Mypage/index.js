import React, { Component } from 'react';
import { StyleSheet,Image,TouchableOpacity } from 'react-native';
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
  Form,
  ActionSheet
} from 'native-base';

import styles from './styles.js';

var BUTTONS = ["내국인", "외국인"];

class Mypage extends Component{
  static navigationOptions = ({
    header: null
  });

  constructor(props) {
    super(props);
    this.state = {};
  }

  render(){
    return (
      <Container>
        <Header style={{backgroundColor:'#db3928',justifyContent:'space-between'}}>
          <Left style={{flex:1}} />
          <Body style={{justifyContent:'center',alignItems:'center',alignSelf:'flex-end',paddingBottom:10}}>
            <Text style={{fontSize:20,color:'#fff'}}>기본정보수정</Text>
          </Body>
          <Right style={{alignSelf:'flex-end',flex:1}}>
            <Button transparent rounded onPress={() => {this.props.navigation.goBack()}}>
              <Icon name="close" style={{color:'#fff'}} />
            </Button>
          </Right>
        </Header>
        <Content
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: "#f4f4f4" }}
          contentContainerStyle={{ flex: 1 }}
        >
          <View style={[styles.Box,{backgroundColor:'#f9f9f9',marginTop:0,borderColor:'#e9e9e9',borderBottomWidth:2}]}>
            <View style={{marginBottom:10,alignSelf:'center',alignItems:'center'}}>
              <Image source={require('../../assets/images/profile_no.png')} style={{width:150,height:150,resizeMode:'cover',borderRadius:500}} />
              <View style={{position:"absolute",bottom:5,right:5,width:30,height:30,backgroundColor:'#fff',borderRadius:15,borderColor:'#999',borderWidth:1}}>
                <TouchableOpacity>
                  <View style={{width:'100%',height:'100%',justifyContent:'center',alignItems:'center'}}>
                    <Icon name="camera" type="FontAwesome" style={{fontSize:13,color:'#999'}} />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={[styles.Box,{marginTop:0,paddingVertical:0}]}>
            <View style={styles.itemBox}>
              <Text style={styles.itemTitle}>아이디</Text>
              <Text style={styles.itemContent}>IDIDID</Text>
            </View>
            <View style={styles.itemBox}>
              <Text style={styles.itemTitle}>패스워드</Text>
              <TouchableOpacity>
                <Text style={[styles.itemContent,{color:'#db3928'}]}>수정</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.itemBox}>
              <Text style={styles.itemTitle}>이름</Text>
              <Text style={[styles.itemContent]}>홍길동</Text>
            </View>
            <View style={[styles.itemBox,{paddingVertical:3,paddingRight:3}]}>
              <Text style={[styles.itemTitle,{textAlignVertical:'center'}]}>연락처</Text>
              <Form style={{width:'70%',alignItems:'flex-end'}}>
                <Item style={{borderColor:'transparent'}}>
                <Input
                  textAlign={'right'}
                  style={[styles.itemInput]}
                  placeholder="연락처를 입력해주세요"
                  underline="false"
                >
                  010-111-1111
                </Input>
                </Item>
              </Form>
            </View>
            <View style={styles.itemBox}>
              <Text style={styles.itemTitle}>국적</Text>
              <Text
                onPress={() => ActionSheet.show(
                  {
                    options: BUTTONS,
                    title: "국적을 선택하세요"
                  },
                  buttonIndex => {
                    this.setState({ clicked: BUTTONS[buttonIndex] });
                  }
                )}
                style={styles.itemContent}
              >
                내국인
              </Text>
            </View>
            <View style={[styles.itemBox,{paddingVertical:3,paddingRight:3}]}>
              <Text style={[styles.itemTitle,{textAlignVertical:'center'}]}>이메일</Text>
              <Form style={{width:'70%',alignItems:'flex-end'}}>
                <Item style={{borderColor:'transparent'}}>
                <Input
                  textAlign={'right'}
                  style={[styles.itemInput]}
                  placeholder="이메일를 입력해주세요"
                  underline="false"
                >
                  com@com.com
                </Input>
                </Item>
              </Form>
            </View>
          </View>
          <View style={[styles.Box]}>
            <TouchableOpacity onPress={() => {this.props.navigation.navigate('MyInfo')}}>
            <View style={[styles.itemBox,{borderBottomWidth:0}]}>
              <View style={{flexDirection:'row'}}>
                <Icon name="edit" type="FontAwesome" style={styles.itemTitle} />
                <Text style={styles.itemTitle}>개인인적사항/문진내용</Text>
              </View>
              <Text style={[styles.itemContent,{color:'#db3928'}]}>수정</Text>
            </View>
            </TouchableOpacity>
          </View>
          <View style={{justifyContent:'center',alignItems:'center'}}>
            <Text style={{fontSize:10,color:'#db3928',marginVertical:20}}>
              ※필수 입력란을 확인해주시기 바랍니다.
            </Text>
            <Button rounded style={{backgroundColor:'#db3928',paddingHorizontal:50,alignSelf:'center'}}>
              <Text style={{fontSize:15}}>완료</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}
export default Mypage;
