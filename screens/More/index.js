import React, { Component } from 'react';
import { View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
 } from 'react-native';
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
      <ScrollView>
      <View style={styles.container}>
        <View style={styles.Box}>
          <TouchableOpacity style={{margin:0,padding:0,flexDirection:'row'}}>
            <View style={styles.MypageImg}>
              <Image source={require('../../assets/images/profile_no.png')} style={{width:'100%',height:'100%',resizeMode:'cover'}} />
            </View>
            <View style={{marginRight:'auto',marginLeft:20,}}>
              <Text style={{fontSize:20}}>{this.state.id}</Text>
              <Text>현장 3 · 다가오는 일정 0 · 북마크 0</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={[styles.Box,{flexDirection:'row',flexWrap:'wrap'}]}>
          <TouchableOpacity style={styles.ColBox}>
            <Icon name='bullhorn' size={40} />
            <Text style={{marginTop:5}}>공지사항</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.ColBox}>
            <Icon name='bullhorn' size={40} />
            <Text style={{marginTop:5}}>공지사항</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.ColBox}>
            <Icon name='bullhorn' size={40} />
            <Text style={{marginTop:5}}>공지사항</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.ColBox}>
            <Icon name='bullhorn' size={40} />
            <Text style={{marginTop:5}}>현장통 설정</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.Box]}>
          <TouchableOpacity style={styles.MoreItems} onPress={() => this.props.navigation.navigate('Prepare')}>
            <Icon name='home' size={30} />
            <Text style={styles.TextBox}>작업전 등록사항</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.MoreItems} onPress={() => this.props.navigation.navigate('Personal')}>
            <Icon name='home' size={30} />
            <Text style={styles.TextBox}>개인신상</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.MoreItems}>
            <Icon name='home' size={30} />
            <Text style={styles.TextBox}>대표 작업사진 선정</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.MoreItems}>
            <Icon name='home' size={30} />
            <Text style={styles.TextBox}>근로이력</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.MoreItems}>
            <Icon name='home' size={30} />
            <Text style={styles.TextBox}>수금장부</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.MoreItems}>
            <Icon name='home' size={30} />
            <Text style={styles.TextBox}>희망 근무지/직종</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.MoreItems}>
            <Icon name='home' size={30} />
            <Text style={styles.TextBox}>공개범위</Text>
          </TouchableOpacity>
        </View>
      </View>
      </ScrollView>
    );
  }
}
export default More;

const style = StyleSheet.create({

})
