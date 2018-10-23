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
} from 'native-base';

import {Calendar} from 'react-native-calendars';

import styles from './styles.js';

class Works extends Component{
  render(){
    return (
      <Container>
        <Content
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: "#f9f9f9"}}
          contentContainerStyle={{ flex: 1 }}
        >
          <View style={[styles.Box,{height:300}]}>
            <Calendar
              monthFormat={'yyyy년 MM월'}
              style={{height:280}}
              theme={{
                arrowColor: '#db3928',
                selectedDayBackgroundColor: '#db3928',
                textMonthFontSize: 16,
                textDayHeaderFontSize: 11,
                todayTextColor: '#db3928',
                'stylesheet.day.basic': {
                  base: { width:25,height:25,alignItems:'center' },
                }
              }}
              markedDates={{
                '2018-10-01':{selected:true},
                '2018-10-12':{selected:true},
                '2018-10-13':{selected:true},
                '2018-10-17':{selected:true},
                '2018-10-22':{selected:true},
              }}
            />
          </View>
          <View style={{flexDirection:'row',justifyContent:'space-around',paddingVertical:10}}>
            <Text style={{fontSize:10}}>작업일 21일</Text>
            <Text style={{fontSize:10}}>총금액 2,100,000</Text>
            <Text style={{fontSize:10}}>수금 2,100,000</Text>
            <Text style={{fontSize:10}}>미수금 2,100,000</Text>
          </View>
          <View style={[styles.Box,{marginTop:0,paddingHorizontal:10}]}>
            <WorkList
              date="10.01.(월)"
              name="현장통1 신축현장"
              status="지급예정"
              money="109,300"
            />
            <WorkList
              date="10.01.(월)"
              name="현장통1 신축현장"
              status="미수금"
              money="109,300"
            />
          </View>
        </Content>
      </Container>
    );
  }
}
export default Works;

class WorkList extends Component{
  render(){
    return(
      <TouchableOpacity>
        <View style={{borderBottomWidth:1,borderBottomColor:'#e9e9e9',flexDirection:'row',justifyContent:'space-between',paddingVertical:5}}>
          <View>
            <Text style={[styles.smallText,{color:'#aaa'}]}>{this.props.date}</Text>
            <Text>{this.props.name}</Text>
          </View>
          <View style={{alignItems:'flex-end'}}>
            <Text style={[styles.smallText, this.props.status === '지급예정' ? {color:'red'} : {color:'blue'} ]}>{this.props.status}</Text>
            <Text>{this.props.money}원</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const style = StyleSheet.create({

})
