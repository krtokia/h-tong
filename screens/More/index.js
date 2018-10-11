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
 } from "native-base";
import { Grid, Col, Row } from "react-native-easy-grid";
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles.js';

class More extends Component{

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
          style={{ backgroundColor: "#f4f4f4" }}
        >
          <View style={styles.Box}>
            <TouchableOpacity style={{margin:0,padding:0,flexDirection:'row'}}>
              <View style={styles.MypageImg}>
                <Image source={require('../../assets/images/profile_no.png')} style={{width:'100%',height:'100%',resizeMode:'cover',borderRadius:50,}} />
              </View>
              <View style={{marginRight:'auto',marginLeft:20,}}>
                <Text style={{fontSize:20}}>{this.state.id}</Text>
                <Text>현장 3 · 다가오는 일정 0 · 북마크 0</Text>
              </View>
              <View style={{marginRight:5}}>
                <Icon name="ellipsis-v" size={25} />
              </View>
            </TouchableOpacity>
          </View>

          <View style={[styles.Box,{flexDirection:'row',flexWrap:'wrap',justifyContent:'center'}]}>
            <TouchableOpacity style={styles.ColBox} onPress={() => this.props.navigation.navigate('Notice')}>
              <Icon name='bullhorn' size={23} color='grey' />
              <Text style={{fontSize:13,marginTop:5,}}>공지사항</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.ColBox}>
              <Icon name='binoculars' size={23} color='grey' />
              <Text style={{fontSize:13,marginTop:5,}}>초대장 찾기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.ColBox} onPress={() => this.props.navigation.navigate('Mypage')}>
              <Icon name='address-card' size={23} color='grey' />
              <Text style={{fontSize:13,marginTop:5,}}>마이페이지</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.ColBox} onPress={() => this.props.navigation.navigate('Settings')}>
              <Icon name='cogs' size={23} color='grey' />
              <Text style={{fontSize:13,marginTop:5,}}>설정</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.ColBox}>
              <Icon name='book' size={23} color='grey' />
              <Text style={{fontSize:13,marginTop:5,}}>수금장부</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.ColBox} onPress={() => this.props.navigation.navigate('WorkHistory')}>
              <Icon name='calendar-check-o' size={23} color='grey' />
              <Text style={{fontSize:13,marginTop:5,}}>근로이력</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.ColBox} onPress={() => this.props.navigation.navigate('Bookmark')}>
              <Icon name='bookmark' size={23} color='grey' />
              <Text style={{fontSize:13,marginTop:5,}}>북마크</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.ColBox}>
              <Icon name='calendar' size={23} color='grey' />
              <Text style={{fontSize:13,marginTop:5,}}>일정</Text>
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
export default More;

const style = StyleSheet.create({

})
