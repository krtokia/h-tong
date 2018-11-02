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
  constructor(props) {
    super(props);

    this.setModalVisible = this.setModalVisible.bind(this);

    this.state = {
      modalVisible: false,
      modalName: "신분증",
    };
  }
  setModalVisible(visible,modalName) {
    this.setState({modalVisible: visible,modalName: modalName});
  }

  setPaper() {
    Alert.alert(
      "서류등록",
      "이 서류를 등록 하시겠습니까?",
      [
        {text: "예", onPress: () => {console.log("서류등록"),this.setState({modalVisible:false})}},
        {text: "아니오", onPress: () => {console.log("서류등록 취소"),this.setState({modalVisible:false})}}
      ],
      { cancelable: false }
    )
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
              <View style={{backgroundColor:'#fff',width:150,height:150,borderRadius:10,borderWidth:3,borderColor:'#ddd',justifyContent:'center',alignItems:'center'}}>
                <TouchableOpacity style={{justifyContent:'center',alignItems:'center'}}>
                  <NBIcon name="camera" type="FontAwesome" style={{fontSize:35,color:'#999'}} />
                  <Text style={{color:'#999',marginTop:20,fontSize:15}}>서류 사진 추가</Text>
                </TouchableOpacity>
              </View>
              <View style={{width:'40%',flex:1,alignItems:'center',marginTop:20}}>
                <Text style={{color:'#fff'}}>{this.state.modalName}</Text>
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
          <View style={styles.Box}>
            <PaperList2
              name="신분증"
              hasPaper={true}
              setModalVisibleParent={this.setModalVisible}
            />
            <PaperList2
              name="건강문진표"
              hasPaper={false}
              setModalVisibleParent={this.setModalVisible}
            />
            <PaperList2
              name="통장사본"
              hasPaper={false}
              setModalVisibleParent={this.setModalVisible}
            />
            <PaperList2
              name="기타1"
              hasPaper={false}
              setModalVisibleParent={this.setModalVisible}
            />
            <PaperList2
              name="기타2"
              hasPaper={false}
              setModalVisibleParent={this.setModalVisible}
            />
            <PaperList2
              name="기타3"
              hasPaper={false}
              setModalVisibleParent={this.setModalVisible}
            />
            <PaperList2
              name="기타4"
              hasPaper={false}
              setModalVisibleParent={this.setModalVisible}
            />
            <PaperList2
              name="기타5"
              hasPaper={false}
              setModalVisibleParent={this.setModalVisible}
            />
            <PaperList2
              name="기타6"
              hasPaper={false}
              setModalVisibleParent={this.setModalVisible}
            />
            <PaperList2
              name="기타7"
              hasPaper={false}
              setModalVisibleParent={this.setModalVisible}
            />
            <PaperList2
              name="기타8"
              hasPaper={false}
              setModalVisibleParent={this.setModalVisible}
            />
            <PaperList2
              name="기타9"
              hasPaper={false}
              setModalVisibleParent={this.setModalVisible}
            />
          </View>
{/*
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
*/}
        </Content>
      </Container>
    );
  }
}

export default Papers;

class PaperList2 extends Component{
  render() {
    const fontS = 14;
    return(
      <TouchableOpacity style={[styles.grayBottom,styles.row,{justifyContent:'space-between',padding:13,paddingBottom:8}]}
        onPress={() => this.props.setModalVisibleParent(true,this.props.name)}
      >
        <View style={[styles.row,]}>
          <NBIcon name="file-text-o" type="FontAwesome" style={{fontSize:fontS,marginRight:5}} />
          <Text style={{fontSize:fontS}}>{this.props.name}</Text>
          { this.props.hasPaper &&
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
