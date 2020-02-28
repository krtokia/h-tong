import React, { Component } from 'react';
import { ScrollView,RefreshControl,Alert,ActivityIndicator,StyleSheet,Image,TouchableOpacity,TouchableHighlight,Modal,TextInput, Picker,KeyboardAvoidingView } from 'react-native';
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

    this.updateModal = this.updateModal.bind(this);
    this.deleteWork = this.deleteWork.bind(this)
    this.state = {
      depositSelect:"N",
      isUpdate: false,
      modalMoney: "",
      modalName: "",
      modalSeq: "",
      modal: false,
      memId: StoreGlobal({type:'get',key:'loginId'}),
      isLoading: true,
      workData: null,
      modalDate: "",
      refreshing: false
    }
  }

  insertModal(day) {
    this.setState({
      depositSelect:"N",
      isUpdate: false,
      modalMoney: "",
      modalName: "",
      modalSeq: "",
      modalDate: day.getFullDate,
      modal: !this.state.modal,
    })
  }

  updateModal(seq) {
    var workObj = this.state.workData[seq];
    this.setState({
      modal:!this.state.modal,
      depositSelect:workObj.deposit,
      isUpdate: true,
      modalMoney: workObj.money,
      modalName: workObj.worktitle,
      modalSeq: workObj.seq,
      modalDate: workObj.workdate
    })
  }

  modalExit() {
    this.setState({
      depositSelect:"N",
      isUpdate: false,
      modalMoney: "",
      modalName: "",
      modalSeq: "",
      modal: false,
      modalDate: "",
    })
  }

  updateWork = () => {
    const {memId,depositSelect,isUpdate,modalMoney,modalName,modalSeq,modalDate} = this.state;
    let apiUrl = 'http://13.124.127.253/api/myworklist.php';
    const formData = new FormData();
    formData.append('action', isUpdate ? "update" : "insert")
    formData.append('memId', memId)
    formData.append('worktitle', modalName)
    formData.append('money', modalMoney)
    formData.append('workdate', modalDate)
    formData.append('deposit', depositSelect)
    formData.append('seq', modalSeq)

    options = {
      method: 'POST',
      body: formData,
    }

    return fetch(apiUrl, options).then((response) => response.json())
      .then((responseJson)=> {
        if(responseJson === 'succed') {
          this.getWorkList()
          this.modalExit()
        } else {
          console.log(responseJson)
        }
      }).catch((error) => {
        console.log(error)
      });
  }

  deleteWork(seq) {
    let apiUrl = 'http://13.124.127.253/api/myworklist.php';
    const formData = new FormData();
    formData.append('action', "delete")
    formData.append('seq', seq)
    options = {
      method: 'POST',
      body: formData,
    }
    return fetch(apiUrl, options).then((response) => response.json())
      .then((responseJson)=> {
        if(responseJson === 'succed') {
          this.getWorkList()
          this.modalExit()
        } else {
          console.log(responseJson)
        }
      }).catch((error) => {
        console.log(error)
      });
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

  componentDidUpdate(prevProps, prevState) {
    if (this.state.refresh !== this.props.navigation.getParam('refresh')) {
     //this.setState({refresh:this.props.navigation.getParam('refresh')})
     console.log("refresh works")
    }
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    this.getWorkList()
    this.setState({refreshing:false})
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
            seq={val.seq}
            seq2={key}
            name={val.worktitle}
            status={val.deposit === "Y" ? "지급완료" : "미수금"}
            money={val.money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            method={this.updateModal}
            deleteMethod={(seq) => this.deleteWork(seq)}
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
            <KeyboardAvoidingView enabled={false} behavior="height">
              <TouchableOpacity style={{flex:0.5,width:'100%'}}
              onPress={() => {this.modalExit();}} />
              <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                  <View style={{flex:1}} />
                  <View style={{flex:4,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{color:'#fff'}}>작업일지 {this.state.isUpdate ? "수정" : "추가"}</Text>
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
                  <View style={[{width:'100%',alignItems:'center',marginBottom:10}]}>
                    <Text>{this.state.modalDate}</Text>
                  </View>
                  <View style={[styles.grayUnderline,{width:'100%'}]}>
                    <Text style={{fontSize:13,marginLeft:20,marginBottom:5,}}>현장이름</Text>
                    <TextInput
                      editable={true}
                      style={{width:'80%',fontSize:13}}
                      underlineColorAndroid="#0000"
                      value={this.state.modalName}
                      onChangeText={(content) => {
                        if(content.length > 15) {
                          Alert.alert('현장통','길이가 너무 깁니다.')
                          content = content.substr( 0, content.length-1 )
                        }
                        this.setState({modalName:content})
                      }}
                    />
                  </View>
                  <View style={[styles.grayUnderline,{width:'100%'}]}>
                    <Text style={{fontSize:13,marginLeft:20,marginBottom:5,}}>금액</Text>
                    <TextInput
                      placeholder="금액 입력"
                      style={{width:'80%',fontSize:13}}
                      underlineColorAndroid="#0000"
                      onChangeText={(content) => {this.setState({modalMoney:content.replace(/[^0-9]/g,'')})}}
                      value={this.state.modalMoney}
                    >
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
                  <View style={{width:150,marginTop:20}}>
                  <Button rounded block small transparent style={{backgroundColor:'#db3928'}}
                    onPress={this.updateWork}
                  >
                    <Text style={{color:'#fff',fontSize:13}}>완료</Text>
                  </Button>
                  </View>
                </View>
              </View>
              <TouchableOpacity style={{flex:3,width:'100%'}}
              onPress={() => {this.modalExit();}} />
              </KeyboardAvoidingView>
            </View>
          </Modal>
          <Content
            showsVerticalScrollIndicator={false}
            style={{ backgroundColor: "#f9f9f9"}}
            contentContainerStyle={{flex:1}}
          >
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
              />
            }
            style={{backgroundColor:'#f9f9f9'}}
          >
            <View style={[styles.Box,{height:'auto',padding:0}]}>
              <Calendar
                onDayPress={(day) => {this.insertModal(day)}}
                onChangeMonth={(month) => {this.monthChange(month)}}
                data={markCalendar}
              />
            </View>
            <View style={{flexDirection:'row',paddingVertical:10}}>
              <View style={{flex:1,alignItems:'center'}}>
                <Text style={{fontSize:9}}>작업일 {[...new Set(markCalendar)].length}일</Text>
              </View>
              <View style={{flex:1}}>
                <Text style={{fontSize:8}}>총금액 {total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
              </View>
              <View style={{flex:1}}>
                <Text style={{fontSize:8}}>수금 {depositY.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
              </View>
              <View style={{flex:1}}>
                <Text style={{fontSize:8}}>미수금 {depositN.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
              </View>
            </View>
            <View style={[styles.Box,{marginTop:0,paddingHorizontal:10}]}>
              {worklist}
            </View>
            </ScrollView>
          </Content>
        </Container>
      );
    }
  }
}
export default Works;

class WorkList extends Component{

  updateModal = () => {
    this.props.method(this.props.seq2)
  }
  deleteWork = () => {
    Alert.alert("현장통","삭제하시겠습니까?",[
      {text: "예", onPress: () => this.props.deleteMethod(this.props.seq)},
      {text: "아니오", style: 'cancel'}
    ],{
      cancelable: true
    })
  }
  render(){
    return(
      <View>
      <TouchableOpacity onPress={this.updateModal}
        onLongPress={this.deleteWork}
      >
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
