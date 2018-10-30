import React, { Component } from 'react';
import { StyleSheet,Image,TouchableOpacity,TouchableHighlight,Modal,TextInput, Picker } from 'react-native';
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
  Icon
} from 'native-base';

import {Calendar} from 'react-native-calendars';

import styles from './styles.js';

class Works extends Component{
  state = {
    modal: false,
    modalItem: null,
    modalDate: null,
  }

  modalSet(day) {
    var date=`${day.year}년${day.month}월${day.day}일`;
    this.setState({modal:true,modalDate:date})
  }
  modalExit() {
    this.setState({modalDate:null,modal:false})
  }

  render(){
    return (
      <Container>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modal}
          onRequestClose={() => {
            this.modalExit();
          }}>
          <View style={{flex:1,alignItems:'center',backgroundColor:'#0009'}}>
            <TouchableOpacity style={{flex:1,width:'100%'}}
            onPress={() => {this.modalExit();}} />
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <View style={{flex:1}} />
                <View style={{flex:4,justifyContent:'center',alignItems:'center'}}>
                  <Text style={{color:'#fff'}}>{this.state.modalDate}</Text>
                </View>
                <View style={{flex:1}}>
                  <TouchableOpacity style={{width:'100%',height:'100%',alignItems:'center',justifyContent:'center'}}
                    onPress={() => {this.modalExit();}}
                  >
                    <Icon name="close" type="FontAwesome" style={{fontSize:18,color:'#fff'}} />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.modalInner}>
                <View style={[styles.grayUnderline,{width:'100%'}]}>
                  <Text style={{fontSize:13,marginLeft:20,marginBottom:5,}}>제목</Text>
                  <TextInput placeholder="입력" style={{width:'80%',fontSize:13}} underlineColorAndroid="#0000" />
                </View>
                <View style={[styles.grayUnderline,{width:'100%'}]}>
                  <Text style={{fontSize:13,marginLeft:20,marginBottom:5,}}>제목</Text>
                  <TextInput placeholder="입력" style={{width:'80%',fontSize:13}} underlineColorAndroid="#0000" />
                </View>
                <View style={[styles.grayUnderline,{width:'100%'}]}>
                  <Text style={{fontSize:13,marginLeft:20,marginBottom:5,}}>제목</Text>
                  <Picker
                    selectedValue={this.state.modalItem}
                    style={{width:'90%',height:30}}
                    onValueChange={(itemValue, itemIndex) => this.setState({modalItem: itemValue})}
                  >
                    <Picker.Item label="선택1" value="1" />
                    <Picker.Item label="선택2" value="2" />
                  </Picker>
                </View>
                <View style={{width:150,marginTop:30}}>
                <Button rounded block small transparent style={{backgroundColor:'#db3928'}}>
                  <Text style={{color:'#fff',fontSize:13}}>완료</Text>
                </Button>
                </View>
              </View>
            </View>
            <TouchableOpacity style={{flex:1,width:'100%'}}
            onPress={() => {this.modalExit();}} />
          </View>
        </Modal>
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
              onDayPress={(day) => {this.modalSet(day)}}
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
