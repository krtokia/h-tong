import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  Switch,
  Modal,
  ActivityIndicator
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

class TongCompany extends Component{

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      memId: StoreGlobal({type:'get',key:'loginId'}),
      tongnum: StoreGlobal({type:'get',key:'tongnum'}),
      refresh: null,
      count1:0,
      count2:0,
      count3:0,
    }
  }

  componentDidMount() {
    this.getCompany()
  }

  getCompany = async() => {
    return fetch("http://13.124.127.253/api/results.php?page=getCompanyCount&tongnum="+this.state.tongnum+"&company="+this.state.company)
      .then((response) => response.json())
      .then((responseJson) => {
        //let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          isLoading: false,
          isLoading10: false,
          count1: responseJson[0].cCount,
          count2: responseJson[0].gCount,
          count3: responseJson[0].pCount,
          refreshing: false,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  refresh = refresh => {
    this.componentDidMount()
  }

  static navigationOptions = ({
      header: null,
    });

    _goBack = () => {
      const { navigation } = this.props;
  //    navigation.navigate('TongInvite',{refresh: new Date(Date.now()).toString()});
      navigation.goBack()
      navigation.state.params.refresh({ refresh: Date(Date.now()).toString() })
    }
  render(){
    if(this.state.isLoading) {
      return <View Style={{flex:1, paddingTop:20}}>
        <ActivityIndicator />
      </View>
    } else {
      const TongType = StoreGlobal({type:'get',key:'tType'});
      return (
        <Container>
          <Header style={{backgroundColor:'#db3928',justifyContent:'space-between'}}>
            <Left style={{flex:1}}>
              <TouchableOpacity style={[{flex:1,justifyContent:'flex-end',paddingBottom:10,}]} onPress={this._goBack}>
                <Icon name="angle-left" type="FontAwesome" style={{color:'#fff',fontSize:25,fontWeight:'bold'}} />
              </TouchableOpacity>
            </Left>
            <Body style={{justifyContent:'center',alignItems:'center',alignSelf:'flex-end',paddingBottom:10,flex:5}}>
              <Text style={{fontSize:20,color:'#fff'}}>회사 등록</Text>
            </Body>
            <Right style={{alignSelf:'flex-end',flex:1}}>

            </Right>
          </Header>
          <Content
            showsVerticalScrollIndicator={false}
            style={{ backgroundColor: "#f9f9f9" }}
          >
            <View style={{paddingBottom:10}}>
              <View style={{justifyContent:'center',paddingLeft:20,height:40}}>
                <Text style={{fontSize:13}}>시공사</Text>
              </View>
              <View style={[styles.Box2,{paddingVertical:0}]}>
                <ListItem
                  name="시공사 등록"
                  count={this.state.count1}
                  href={() => this.props.navigation.navigate("TongCompany2",{company:'C',refresh:this.refresh})}
                />
              </View>
              <View style={{justifyContent:'center',paddingLeft:20,height:40}}>
                <Text style={{fontSize:13}}>감리사</Text>
              </View>
              <View style={[styles.Box2,{paddingVertical:0}]}>
                <ListItem
                  name="감리사 등록"
                  count={this.state.count2}
                  href={() => this.props.navigation.navigate("TongCompany2",{company:'G',refresh:this.refresh})}
                />
              </View>
              <View style={{justifyContent:'center',paddingLeft:20,height:40}}>
                <Text style={{fontSize:13}}>협력사</Text>
              </View>
              <View style={[styles.Box2,{paddingVertical:0}]}>
                <ListItem
                  name="협력사 등록"
                  count={this.state.count3}
                  href={() => this.props.navigation.navigate("TongCompany2",{company:'P',refresh:this.refresh})}
                />
              </View>
            </View>
          </Content>
        </Container>
      );
    }
  }
}
export default TongCompany;

class ListItem extends Component{
  render(){
    return (
      <TouchableOpacity onPress={this.props.href}>
      <View style={{flexDirection:'row',backgroundColor:'#fff',height:40,borderBottomWidth:1,borderBottomColor:'#e9e9e9',paddingVertical:5,paddingHorizontal:10}}>
        <Left>
          <Text style={{fontSize:14}}>{this.props.name} ({this.props.count})</Text>
        </Left>
        <Right>
          <Icon name="angle-right" type="FontAwesome" style={{color:'#aaa'}} />
        </Right>
      </View>
      </TouchableOpacity>
    )
  }
}
