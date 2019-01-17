import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  Switch,
  Modal,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
  TextInput
 } from 'react-native';
 import {
   Container,
   Content,
   Text,
   View,
   Header,
   Left,
   Right,
   Body,
   Button,
   Icon,
   Textarea
 } from "native-base";
import { Grid, Col, Row } from "react-native-easy-grid";

import { StoreGlobal } from '../../App';

import styles from './styles.js';

class TongCompany2 extends Component{

  constructor(props) {
    super(props);

    this.state = {
      userId: StoreGlobal({type:'get',key:'loginId'}),
      tongnum: StoreGlobal({type:'get',key:'tongnum'}),
      dataSource: null,
      company: this.props.navigation.getParam('company'),
      isLoading: true,
      isLoading10: false,
      refreshing: false,
      companyTitle: '',
      companyName: '',
      count: 0,
    }
  }


  refresh = refresh => {
    this.setState({refresh})
  }
  _onRefresh = () => {
    this.setState({refreshing: true});
    this.companyList();
  }

  companyList = async() => {
    return fetch("http://13.124.127.253/api/results.php?page=getCompany&tongnum="+this.state.tongnum+"&company="+this.state.company)
      .then((response) => response.json())
      .then((responseJson) => {
        //let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          isLoading: false,
          isLoading10: false,
          isLoading11: false,
          dataSource: responseJson,
          count: responseJson ? responseJson.length : 0,
          refreshing: false,
          companyTitle: ''
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentDidMount() {
    switch(this.props.navigation.getParam('company')) {
      case 'C': this.setState({companyName:'시공사'}); break;
      case 'G': this.setState({companyName:'감리사'}); break;
      case 'S': this.setState({companyName:'협력사'}); break;
    }
    this.companyList()
  }

  _goBack = () => {
    const { navigation } = this.props;
//    navigation.navigate('TongInvite',{refresh: new Date(Date.now()).toString()});
    navigation.goBack()
    navigation.state.params.refresh({ refresh: Date(Date.now()).toString() })
  }

  insertCompany = () => {
    this.setState({isLoading10:true})
    const { userId, tongnum, companyTitle, company } = this.state;
    let apiUrl = 'http://13.124.127.253/api/tongCompany.php?action=insert';

    options = {
      method: 'POST',
      body: JSON.stringify({
        tongnum: tongnum,
        userId: userId,
        companyTitle: companyTitle.replace( /(^\s*)|(\s*$)/g, ""),
        company: company
      }),
    }

    return fetch(apiUrl, options).then((response) => response.json())
      .then((responseJson)=> {
        if(responseJson === 'succed') {
          this.companyList()
        } else {
          //alert(responseJson);
          console.log(responseJson)
        }
      }).catch((error) => {
        console.log(error)
      });
  }

  deleteCompany = (data) => {
    this.setState({isLoading11:true})
    const { userId, tongnum, companyTitle, company } = this.state;
    let apiUrl = 'http://13.124.127.253/api/tongCompany.php?action=delete';

    options = {
      method: 'POST',
      body: JSON.stringify({
        delUserId: userId,
        seq: data.seq
      }),
    }

    return fetch(apiUrl, options).then((response) => response.json())
      .then((responseJson)=> {
        if(responseJson === 'succed') {
          this.companyList()
        } else {
          //alert(responseJson);
          console.log(responseJson)
        }
      }).catch((error) => {
        console.log(error)
      });
  }

  static navigationOptions = ({
      header: null,
    });
  render(){
    if(this.state.isLoading) {
      return <View Style={{flex:1, paddingTop:20}}>
        <ActivityIndicator />
      </View>
    } else if(this.state.isLoading11) {
      return <View Style={{flex:1, paddingTop:20}}>
        <ActivityIndicator />
      </View>
    } else {
      let companyList;
      if(this.state.dataSource) {
        companyList = this.state.dataSource.map((val,key) => {
          return <ListItem key={key} seq2={key} data={val} deleteFn={(data) => this.deleteCompany(data)}>{val.companyTitle}</ListItem>
        })
      } else {
        companyList = <Text style={{fontSize:13}}>등록된 {this.state.companyName}가 없습니다.</Text>
      }
      return (
        <Container>
          <Header style={{backgroundColor:'#db3928',justifyContent:'space-between'}}>
            <Left style={{flex:1}}>
              <TouchableOpacity style={[{flex:1,justifyContent:'flex-end',paddingBottom:10}]} onPress={this._goBack}>
                <Icon name="angle-left" type="FontAwesome" style={{color:'#fff',fontSize:25,fontWeight:'bold'}} />
              </TouchableOpacity>
            </Left>
            <Body style={{justifyContent:'center',alignItems:'center',alignSelf:'flex-end',paddingBottom:10,flex:5}}>
              <Text style={{fontSize:20,color:'#fff'}}>{this.state.companyName} 등록</Text>
            </Body>
            <Right style={{alignSelf:'flex-end',flex:1}}>
            </Right>
          </Header>
          <Content
            showsVerticalScrollIndicator={false}
            style={{ backgroundColor: "#f9f9f9" }}
            contentContainerStyle={{flex:1}}
          >
            <View style={[styles.row2,{flex:0.7,justifyContent:'space-between',alignItems:'center',padding:20}]}>
              <View style={[{flex:7,borderRadius:100,borderWidth:1,paddingHorizontal:15,borderColor:'#999'}]}>
                <TextInput
                  ref="input"
                  style={{flex:1,fontSize:13}}
                  underlineColorAndroid='rgba(0,0,0,0)'
                  placeholder={this.state.companyName+" 이름을 입력하세요."}
                  onChangeText={(content) => {
                    this.setState({companyTitle: content.replace(/[^0-9a-zA-Zㄱ-힣 ]/g,'')})
                  }}
                  value={this.state.companyTitle}
                  onBlur={() => {
                    if(this.state.companyTitle) {
                      var regex= /[ㄱ-ㅎ]/i;
                      if(this.state.companyTitle.match(regex)) {
                        Alert.alert(this.state.companyName+'명을 정확히 입력해 주세요.')
                        this.refs['input'].focus()
                      }
                    }
                  }}
                />
              </View>
              <View style={{flex:1}} />
              <View style={{flex:3}}>
              { this.state.isLoading10 ? (
                <ActivityIndicator />
              ) : (
                <TouchableOpacity style={[styles.center,{flex:1,backgroundColor:'#db3928',borderRadius:100}]}
                  onPress={() => {
                    if(this.state.companyTitle) {
                      var regex= /[ㄱ-ㅎ]/i;
                      if(this.state.companyTitle.match(regex)) {
                        Alert.alert(this.state.companyName+'명을 정확히 입력해 주세요.')
                        this.refs['input'].focus()
                        return false
                      }
                      this.insertCompany()
                    }
                  }}
                >
                  <Text style={{color:'#fff',fontSize:12}}>등록</Text>
                </TouchableOpacity>
              )}
              </View>
            </View>
            <View style={{flex:10}}>
              <ScrollView
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this._onRefresh}
                  />
                }
              >
                <View>
                  <Text style={{fontSize:13}}>등록된 {this.state.companyName}수: {this.state.count}</Text>
                </View>
                <View style={[styles.Box,{marginTop:10}]}>
                  {companyList}
                </View>
              </ScrollView>
            </View>
          </Content>
        </Container>
      );
    }
  }
}
export default TongCompany2;

class ListItem extends Component{
  constructor(props) {
    super(props)
    this.state = {
      isLoading:false
    }
  }
  render(){
    return (
      <View style={{flexDirection:'row',backgroundColor:'#fff',height:40,borderBottomWidth:1,borderBottomColor:'#e9e9e9',paddingVertical:5,paddingHorizontal:10}}>
        <Left>
          <Text style={{fontSize:14}}>{this.props.children}</Text>
        </Left>
        <Right>
        { this.state.isLoading ? (
          <ActivityIndicator />
        ) : (
          <TouchableOpacity style={[styles.center,{flex:1}]}
            onPress={() => {
              Alert.alert('현장통','['+this.props.children+']\r\n삭제하시겠습니까?',
              [
                {text:'예', onPress: () => {this.props.deleteFn(this.props.data)}},
                {text:'아니오', style:"cancel"}
              ],
                { cancelable: true }
              )
            }}
          >
            <Icon name="times-circle" type="FontAwesome" style={{color:'#db3928'}} />
          </TouchableOpacity>
        )}
        </Right>
      </View>
    )
  }
}
