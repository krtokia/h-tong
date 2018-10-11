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
   Button,
   Icon,
} from "native-base";

import styles from './styles.js';

class WorkHistory extends Component{
  render(){
    return (
      <Container>
        <Content
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: "#f9f9f9" }}
        >
          <View style={{width:'100%',}}>
            <Button small iconLeft transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name='angle-left' type="FontAwesome" style={{color:'#030303'}} />
              <Text style={{color:'#030303'}}>근로이력</Text>
            </Button>
          </View>
          <View style={[styles.Box,{justifyContent:'center',alignItems:'center',marginTop:0}]}>
            <View style={styles.dateBox}>
              <Icon name="arrow-circle-o-left" type="FontAwesome" style={{color:'#db3928'}} />
                <Text style={{fontSize:18,color:'#aaa'}}>2018년 10월</Text>
              <Icon name="arrow-circle-o-right" type="FontAwesome" style={{color:'#db3928'}} />
            </View>
            <View style={{marginTop:10,width:'90%',borderBottomColor:'#e9e9e9',borderBottomWidth:1}}>
            </View>
          </View>
          <View style={[styles.Box,{marginTop:0,}]}>
            <TouchableOpacity>
            <WorkMoney date="10.01.(월)" name="현장통1 신축현장" info="지급예정" money="109,333원" />
            </TouchableOpacity>
            <TouchableOpacity>
            <WorkMoney date="10.01.(월)" name="현장통1 신축현장" info="지급예정" money="109,333원" />
            </TouchableOpacity>
            <TouchableOpacity>
            <WorkMoney date="10.01.(월)" name="현장통1 신축현장" info="지급예정" money="109,333원" />
            </TouchableOpacity>
          </View>
        </Content>
      </Container>
    );
  }
}
export default WorkHistory;

class WorkMoney extends Component {
  render() {
    return (
      <View style={{flexDirection:'row',width:'98%',borderColor:'#e9e9e9',borderBottomWidth:1,height:60,paddingVertical:10}}>
        <View style={{marginLeft:0,justifyContent:'space-around'}}>
          <Text style={{color:'#aaa',fontSize:12}}>{this.props.date}</Text>
          <Text>{this.props.name}</Text>
        </View>
        <View style={{marginLeft:'auto',marginRight:0,flexDirection:'row'}}>
          <View style={{justifyContent:'space-around',alignItems:'flex-end'}}>
            <Text style={{color:'#db3928',fontSize:12}}>{this.props.info}</Text>
            <Text>{this.props.money}</Text>
          </View>
          <View style={{marginLeft:15,justifyContent:'center'}}>
            <Icon name="angle-right" type="FontAwesome" style={{color:'#aaa'}} />
          </View>
        </View>
      </View>
    )
  }
}

const style = StyleSheet.create({

})
