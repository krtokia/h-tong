import React, { Component } from 'react';
import { Alert,ActivityIndicator,StyleSheet,Image,TouchableOpacity,TouchableHighlight,Modal,TextInput, Picker } from 'react-native';
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

import Calendar from '../calendar.js';
import { StoreGlobal } from '../../App';

import styles from './styles.js';

let markCalendar = {};

class Works extends Component{
  constructor(props) {
    super(props)

    this.openModal = this.openModal.bind(this);

    this.state = {
      depositSelect:"N",
      modalTitle: "",
      modalMoney: "",
      modalName: "",
      modalSeq: "",
      modal: false,
      memId: StoreGlobal({type:'get',key:'loginId'}),
      isLoading: true,
      workData: null,
    }
  }

  modalSet(day) {
    var date=`${day.year}년${day.month}월${day.day}일`;
    var makeArray = Object.keys(markCalendar);
    var findArray = makeArray.findIndex((obj) => {
      return obj === day.dateString;
    })

    if(findArray) {
      //this.setState({modal:true,modalDate:date})

    }
  }

  openModal(seq, action, money) {
    var workObj = this.state.workData[seq];
    this.setState({
      modal:!this.state.modal,
      depositSelect:workObj.deposit,
      modalTitle: workObj.dateFor+"("+workObj.weekFor+")",
      modalMoney: workObj.money,
      modalName: workObj.tongtitle,
      modalSeq: workObj.seq,
    })
  }

  modalExit() {
    this.setState({
      depositSelect:"N",
      modalTitle: "",
      modalMoney: "",
      modalName: "",
      modalSeq: "",
      modal: false,
    })
  }

  updateWork() {
    const {depositSelect,modalTitle,modalMoney,modalName,modalSeq} = this.state;
    console.log(depositSelect)
    console.log(modalMoney)
    console.log(modalSeq)
    this.modalExit()
  }

  monthChange(month) {
    this.getWorkList(month.getFullDate+"-01")
  }

  getWorkList = async(nowDate) => {
      if(!nowDate) {
        nowDate = new Date(Date.now());
        dateOrigin = nowDate.getFullYear()+"-"+(nowDate.getMonth()+1)+"-"+nowDate.getDate();
        nowDate = dateOrigin;
      }
      console.log("http://13.124.127.253/api/results.php?page=getMyWorkList&id=" + this.state.memId + "&workdate="+nowDate)
      return fetch("http://13.124.127.253/api/results.php?page=getMyWorkList&id=" + this.state.memId + "&workdate="+nowDate)
            .then((response) => response.json())
            .then((responseJson) => {
              //let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
              if(responseJson) {
                this.setState({
                  isLoading: false,
                  workData: responseJson,
                })
              } else {
                this.setState({
                  isLoading: false,
                  workData: responseJson,
                })
              }

            })
            .catch((error) => {
              console.error(error);
            });
  }

  componentDidMount() {
    this.getWorkList()
  }

  render(){
    if (this.state.isLoading) {
      return <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator />
      </View>
    } else {
      let worklist = new Array();
      let total = 0;
      let depositY = 0;
      let depositN = 0;
      let markCalendar = new Array();
      if(this.state.workData) {
        worklist = this.state.workData.map((val, key) => {
          markCalendar = [
            ...markCalendar,
            val.workdate,
          ]
          dateFor = val.dateFor+"("+val.weekFor+")";
          total = total+parseInt(val.money);
          if(val.deposit === "Y") {
            depositY = depositY+parseInt(val.money);
          } else {
            depositN = depositN+parseInt(val.money);
          }
          return <WorkList
            key={key}
            date={dateFor}
            seq={key}
            seq2={val.seq}
            name={val.tongtitle}
            status={val.deposit === "Y" ? "지급완료" : "미수금"}
            money={val.money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            method={this.openModal}
          />
        })
      }
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
                    <Text style={{color:'#fff'}}>{this.state.modalTitle}</Text>
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
                    <Text style={{fontSize:13,marginLeft:20,marginBottom:5,}}>현장이름</Text>
                    <TextInput
                      editable={false}
                      style={{width:'80%',fontSize:13}}
                      underlineColorAndroid="#0000"
                      value={this.state.modalName}
                    />
                  </View>
                  <View style={[styles.grayUnderline,{width:'100%'}]}>
                    <Text style={{fontSize:13,marginLeft:20,marginBottom:5,}}>금액</Text>
                    <TextInput
                      placeholder="금액 입력"
                      style={{width:'80%',fontSize:13}}
                      underlineColorAndroid="#0000"
                      onChangeText={(content) => {this.setState({modalMoney:content})}}
                    >
                      {this.state.modalMoney}
                    </TextInput>
                  </View>
                  <View style={[styles.grayUnderline,{width:'100%'}]}>
                    <Text style={{fontSize:13,marginLeft:20,marginBottom:5,}}>수금여부</Text>
                    <Picker
                      selectedValue={this.state.depositSelect}
                      style={{width:'90%',height:30}}
                      onValueChange={(itemValue, itemIndex) => this.setState({depositSelect: itemValue})}
                    >
                      <Picker.Item label="지급완료" value="Y" />
                      <Picker.Item label="미수금" value="N" />
                    </Picker>
                  </View>
                  <View style={{width:150,marginTop:30}}>
                  <Button rounded block small transparent style={{backgroundColor:'#db3928'}}
                    onPress={() => {this.updateWork()}}
                  >
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
          >
            <View style={[styles.Box,{height:'auto',padding:0}]}>
              <Calendar
                onDayPress={(day) => {this.modalSet(day)}}
                onChangeMonth={(month) => {this.monthChange(month)}}
                data={markCalendar}
              />
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-around',paddingVertical:10}}>
              <Text style={{fontSize:10}}>작업일 {[...new Set(markCalendar)].length}일</Text>
              <Text style={{fontSize:10}}>총금액 {total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
              <Text style={{fontSize:10}}>수금 {depositY.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
              <Text style={{fontSize:10}}>미수금 {depositN.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
            </View>
            <View style={[styles.Box,{marginTop:0,paddingHorizontal:10}]}>
              {worklist}
            </View>
          </Content>
        </Container>
      );
    }
  }
}
export default Works;

class WorkList extends Component{

  openModal = () => {
    this.props.method(this.props.seq, this.props.status, this.props.money)
  }

  render(){
    return(
      <View>
      <TouchableOpacity onPress={this.openModal}>
        <View style={{borderBottomWidth:1,borderBottomColor:'#e9e9e9',flexDirection:'row',justifyContent:'space-between',paddingVertical:5}}>
          <View>
            <Text style={[styles.smallText,{color:'#aaa'}]}>{this.props.date}</Text>
            <Text>{this.props.name}</Text>
          </View>
          <View style={{alignItems:'flex-end'}}>
            <Text style={[styles.smallText, this.props.status === '미수금' ? {color:'red'} : {color:'blue'} ]}>{this.props.status}</Text>
            <Text>{this.props.money}원</Text>
          </View>
        </View>
      </TouchableOpacity>
      </View>
    )
  }
}

const style = StyleSheet.create({

})
