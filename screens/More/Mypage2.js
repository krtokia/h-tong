import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  TouchableOpacity,
 } from 'react-native';
 import {
   Container,
   Content,
   Text,
   View,
   Card,
   CardItem,
   Right,
   Body,
   Icon
 } from "native-base";
import { Grid, Col, Row } from "react-native-easy-grid";

import styles from './styles.js';

class Mypage2 extends Component{

  constructor(props) {
    super(props);

    this.state={
      isLoading: true,
      dataSource: null,
      id: 'sid',
    }
  }

  componentDidMount() {
    //console.log("START componentDidMount");

    return fetch("http://13.124.127.253/api/results.php?page=setting&id=" + this.state.id)
      .then((response) => response.json())
      .then((responseJson) => {
        //let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          isLoading: false,
          dataSource: responseJson,
        });
      })

      .catch((error) => {
        console.error(error);
      });
    }

  render(){
    return (
      <Container>
        <Content
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: "#f9f9f9" }}
        >
          <View style={styles.Box}>
            <TouchableOpacity style={{margin:0,padding:0,flexDirection:'row'}}>
              <View style={styles.MypageImg}>
                <Image source={require('../../assets/images/profile_no.png')} style={{width:'100%',height:'100%',resizeMode:'cover',borderRadius:50,}} />
              </View>
              <View style={{marginRight:'auto',marginLeft:20,}}>
                <Text style={{fontSize:20}}>{this.state.id}</Text>
                <Text>마이페이지</Text>
              </View>
              <View style={{marginRight:5}}>
                <Icon name="cog" type="FontAwesome" style={{color:'grey'}} />
              </View>
            </TouchableOpacity>
          </View>

          <View style={[styles.Box,{flexDirection:'row',flexWrap:'wrap',justifyContent:'center'}]}>
            <TouchableOpacity style={styles.ColBox} onPress={() => this.props.navigation.navigate('Notice')}>
              <Icon name='pencil-square-o' type="FontAwesome" style={{color:'grey'}} />
              <Text style={{fontSize:13,marginTop:5,}}>전자서명</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.ColBox}>
              <Icon name='check-square-o' type="FontAwesome" style={{color:'grey'}} />
              <Text style={{fontSize:13,marginTop:5,}}>서류등록</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.ColBox} onPress={() => this.props.navigation.navigate('Personal')}>
              <Icon name='database' type="FontAwesome" style={{color:'grey'}} />
              <Text style={{fontSize:13,marginTop:5,}}>계좌등록</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.ColBox} onPress={() => this.props.navigation.navigate('Prepare')}>
              <Icon name='heart' type="FontAwesome" style={{color:'grey'}} />
              <Text style={{fontSize:13,marginTop:5,}}>희망직종</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.ColBox}>
              <Icon name='file-text' type="FontAwesome" style={{color:'grey'}} />
              <Text style={{fontSize:13,marginTop:5,}}>내가쓴글</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.ColBox}>
              <Icon name='ellipsis-h' type="FontAwesome" style={{color:'grey'}} />
              <Text style={{fontSize:12.5,marginTop:5,}}>신청중인 현장</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.ColBox}>
              <Icon name='id-card-o' type="FontAwesome" style={{color:'grey'}} />
              <Text style={{fontSize:13,marginTop:5,}}>내 프로필</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.ColBox}>
              <Icon name='at-sign' type="Foundation" style={{color:'grey'}} />
              <Text style={{fontSize:13,marginTop:5,}}>계정관리</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.Box]}>
            <View style={styles.BoxTitle}>
              <Text>내 현장통</Text>
              <Text>편집</Text>
            </View>

            <View style={styles.HomeList}>
              <View style={styles.tongView}>
                <TouchableOpacity
                        onPress = {() => this.props.navigation.navigate("HomeTab")}
                >
                <Image resizeMode={'cover'} style={styles.tongImage} source={require('../../assets/images/testImages/1.jpg')} />
                <View style={styles.tongContent}>
                  <Text style={styles.tongName}>현장통</Text>
                  <Text style={styles.tongNew}>NEW 1</Text>
                </View>
                </TouchableOpacity>
              </View>
              <View style={styles.tongView}>
                <TouchableOpacity
                        onPress = {() => this.props.navigation.navigate("HomeTab")}
                >
                <Image resizeMode={'cover'} style={styles.tongImage} source={require('../../assets/images/testImages/1.jpg')} />
                <View style={styles.tongContent}>
                  <Text style={styles.tongName}>현장통</Text>
                  <Text style={styles.tongNew}>NEW 1</Text>
                </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}
export default Mypage2;

const style = StyleSheet.create({

})
