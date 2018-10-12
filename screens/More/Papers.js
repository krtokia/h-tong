import React, { Component } from 'react';
import {Alert, Image, TextInput, ImageBackground, TouchableOpacity, Modal } from 'react-native';
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

class Papers extends Component{
  state = {
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  static navigationOptions = ({
    header: null
  });
  render(){
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
              <View style={{backgroundColor:'#fffa',width:'90%',borderRadius:10,flex:2,marginBottom:5,flexDirection:'row',alignItems:'center'}}>
                <NBIcon name="plus" type="FontAwesome" style={{color:'#fff',marginLeft:10,fontSize:20}} />
                <Input style={{marginLeft:5,color:'#fff'}} placeholder="이름 입력" />
                <TouchableOpacity style={{marginLeft:'auto',marginRight:10}}>
                <Text style={{color:'#db3928',fontSize:12}}>완료</Text>
                </TouchableOpacity>
              </View>
              <View style={{backgroundColor:'#fff',width:'90%',borderRadius:10,borderWidth:3,borderColor:'#ddd',flex:8,justifyContent:'center',alignItems:'center'}}>
                <TouchableOpacity style={{justifyContent:'center',alignItems:'center'}}>
                  <NBIcon name="upload" type="FontAwesome" style={{fontSize:35}} />
                  <Text>사진 업로드</Text>
                </TouchableOpacity>
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
          style={{ backgroundColor: "#fff" }}
        >
          <View style={[styles.container,{marginTop:20,flexDirection:'row',flexWrap:'wrap'}]}>
            <PaperList
              title="신분증"
              icons={<NBIcon name='primitive-dot' type='Octicons' style={{color:'#db3928',fontSize:13,marginRight:-5,alignSelf:'flex-start'}} />}
              image={<Image source={require('../../assets/images/noImage.png')} style={{width:'100%',height:'100%',resizeMode:'contain'}} />}
            />
            <PaperList
              title="통장사본"
              icons={<NBIcon name='primitive-dot' type='Octicons' style={{color:'#db3928',fontSize:13,marginRight:-5,alignSelf:'flex-start'}} />}
              image={<Image source={require('../../assets/images/noImage.png')} style={{width:'100%',height:'100%',resizeMode:'contain'}} />}
            />
            <PaperList
              title="보건안전교육증"
              icons={<NBIcon name='primitive-dot' type='Octicons' style={{color:'#db3928',fontSize:13,marginRight:-5,alignSelf:'flex-start'}} />}
              image={<Image source={require('../../assets/images/noImage.png')} style={{width:'100%',height:'100%',resizeMode:'contain'}} />}
            />
            <PaperList
              title="기타"
              icons={<NBIcon name='md-add' style={{fontSize:20,alignSelf:'center'}} />}
              image={
                      <TouchableOpacity
                        style={{justifyContent:'center',alignItems:'center'}}
                        onPress={() => { this.setModalVisible(true)}}
                      >
                        <NBIcon name="upload" type="FontAwesome" />
                        <Text>사진 업로드</Text>
                      </TouchableOpacity>
                    }
            />
          </View>
        </Content>
      </Container>
    );
  }
}

export default Papers;

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
