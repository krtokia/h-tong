import React, { Component } from 'react';
import {
  Alert,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  TouchableHighlight,
  TextInput,
  ImageBackground,
  ActivityIndicator,
 } from 'react-native';
 import {
   Container,
   Content,
   Text,
   View,
   Button,
   Icon,
   Accordion,
   Header,
   Left,
   Right,
   Body,
   Footer,
   Form,
 } from "native-base";
import MapView, { Marker } from 'react-native-maps';
import styles from './styles.js';

import { StoreGlobal } from '../../App';

var fontColor = '#888';

class TongInfo extends Component{
  constructor(props) {
    super(props);
    this.state = {
        isLoading: true,
        dataSource: null,
        mapRegion: null,
        modalMap: false,
        modal: false,
        tongnum: StoreGlobal({type:'get',key:'tongnum'}),
        memId: StoreGlobal({type:'get',key:'memId'}),
    		projectnm: '',
    		authnum: '',
    		constructor: '',
    		supervisor: '',
    		owner: '',
    		contact: '',
    		term: '',
    		scale: '',
    		addr: '',
        refresh: "",
        markerPosition: {
            latitude: 37.78825,
            longitude: -122.4324,
        },
      };
  }

  modalComplate() {
    this.updateTongInfo()
    this.setState({modal: false});
  }

  onRegionChange = (data) => {
    console.log(data)
  }

  componentDidMount() {
    this.getTong();
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.refresh !== prevState.refresh) {
      this.getTong();
    }
  }

  getTong = async() => {
    this.setState({isLoading:true})
    return fetch("http://13.124.127.253/api/results.php?page=tong&seq=" + this.state.tongnum)
      .then((response) => response.json())
      .then((responseJson) => {
        //let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          isLoading: false,
          dataSource: responseJson,
        })
        console.log("updateGetTong")
      })
      .catch((error) => {
        console.error(error);
      });
  }

  updateTongInfo() {
    const { dataSource, tongnum, projectnm, authnum, constructor, supervisor, owner, contact, term, scale, addr } = this.state;
    let apiUrl = 'http://13.124.127.253/api/updateTong.php';
    let options = null;

    const formData = new FormData();

    formData.append('tongnum', tongnum);
    formData.append('projectnm', projectnm ? projectnm : dataSource[0].projectnm);
    formData.append('authnum', authnum ? authnum : dataSource[0].authnum);
    formData.append('constructor', constructor) ? constructor : dataSource[0].constructor;
    formData.append('supervisor', supervisor ? supervisor : dataSource[0].supervisor);
    formData.append('owner', owner ? owner : dataSource[0].owner);
    formData.append('contact', contact ? contact : dataSource[0].contact);
    formData.append('term', term ? term : dataSource[0].term);
    formData.append('scale', scale ? scale : dataSource[0].scale);
    formData.append('addr', addr ? addr : dataSource[0].addr);

    formData.append('type', 'none');
    options = {
      method: 'POST',
      body: formData,
      headers: { Accept: 'application/json' },
    }

    return fetch(apiUrl, options).then((response) => response.json())
      .then((responseJson)=> {
		console.log("responseJson:",responseJson);
        if(responseJson === 'success') {
          Alert.alert(
			"현장통",
			"수정되었습니다.",
			 [
				{text:"확인",onPress:() => {this.setState({refresh:Date(Date.now()).toString()})}}
			],
			{ cancelable: false }
			)
        } else {
          //alert(responseJson);
          Alert.alert(
            '현장통',
            "현장통 수정 실패"
          )
		//this.props.navigation.navigate("Main");
        }
      }).catch((error) => {
        console.log(error)
      });
  }

  render() {
    if(this.state.isLoading) {
      return <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
          <ActivityIndicator />
        </View>
      } else {
        var modalFontSize = 11;
        return (
          <Container>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalMap}
            onRequestClose={() => {
              this.setState({modalMap: false});
            }}>
            <View style={{flex:1}}>
              <View style={{flex:7}}>
                <MapView
                  style={{flex:1}}
                  onRegionChange={this.onRegionChange}
                >
                  <Marker
                    coordinate={this.state.markerPosition}
                  />
                </MapView>
              </View>
              <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Text onPress={() => {this.setState({modalMap:false})}}>닫기</Text>
              </View>
            </View>
            </Modal>
            <Modal
              animationType="slide"
              transparent={false}
              visible={this.state.modal}
              onRequestClose={() => {
                this.setState({modal: false});
              }}>
                <Header style={{height:50,backgroundColor:'#db3928',borderBottomWidth:1,borderBottomColor:'#ccc'}}>
                  <Left style={{flex:1}}>
                    <TouchableHighlight
                      onPress={() => {
                        this.setState({modal: false}),
                        this.getTong()
                      }}>
                      <Icon name='close' type="FontAwesome" style={{color:'#fff'}} />
                    </TouchableHighlight>
                  </Left>
                  <Body style={{flex:4,alignItems:'center'}}>
                    <Text style={{textAlign:'center',color:'#fff',fontSize:18}}>현장통 수정</Text>
                  </Body>
                  <Right  style={{flex:1}}>
                    <Text style={{fontSize:13,color:'#fff'}} onPress={() => {this.modalComplate(!this.state.modal)}}>완료</Text>
                  </Right>
                </Header>
                <Content style={{padding:10}}>
                  <Form>
                    <ImageBackground source={require('../../assets/images/backgroundLogo.png')} style={{width:'100%'}}>
                      <View style={[styles.Row]}>
                        <View style={styles.createModalStyleLeft}>
                          <Text style={{fontSize:modalFontSize}}>공사명</Text>
                          <Text style={{fontSize:modalFontSize}}>건축허가번호</Text>
                          <Text style={{fontSize:modalFontSize}}>공사 시공자</Text>
                          <Text style={{fontSize:modalFontSize}}>공사 감리자</Text>
                          <Text style={{fontSize:modalFontSize}}>발주자</Text>
                          <Text style={{fontSize:modalFontSize}}>현장 연락처</Text>
                          <Text style={{fontSize:modalFontSize}}>공사기간</Text>
                          <Text style={{fontSize:modalFontSize}}>공사규모</Text>
                          <Text style={{fontSize:modalFontSize}}>현장주소</Text>
                        </View>
                        <View style={[styles.createModalStyleRight]}>
                          <TextInput placeholder="공사명을 입력하세요" underlineColorAndroid='#0000' style={styles.modalInput}
                            onChangeText={(projectnm) => this.setState({ projectnm })}
                          >
                            {this.state.dataSource[0].projectnm}
                          </TextInput>
                          <TextInput placeholder="건축허가번호를 입력하세요" underlineColorAndroid='#0000' style={styles.modalInput}
                            onChangeText={(authnum) => this.setState({ authnum })}
                          >
                            {this.state.dataSource[0].authnum}
                          </TextInput>
                          <TextInput placeholder="공사 시공자를 입력하세요" underlineColorAndroid='#0000' style={styles.modalInput}
                            onChangeText={(constructor) => this.setState({ constructor })}
                          >
                            {this.state.dataSource[0].constructor}
                          </TextInput>
                          <TextInput placeholder="공사 감리자를 입력하세요" underlineColorAndroid='#0000' style={styles.modalInput}
                            onChangeText={(supervisor) => this.setState({ supervisor })}
                          >
                            {this.state.dataSource[0].supervisor}
                          </TextInput>
                          <TextInput placeholder="발주자를 입력하세요" underlineColorAndroid='#0000' style={styles.modalInput}
                            onChangeText={(owner) => this.setState({ owner })}
                          >
                            {this.state.dataSource[0].owner}
                          </TextInput>
                          <TextInput placeholder="현장 연락처를 입력하세요" underlineColorAndroid='#0000' style={styles.modalInput}
                            onChangeText={(contact) => this.setState({ contact })}
                          >
                            {this.state.dataSource[0].contact}
                          </TextInput>
                          <TextInput placeholder="공사기간을 입력하세요" underlineColorAndroid='#0000' style={styles.modalInput}
                            onChangeText={(term) => this.setState({ term })}
                          >
                            {this.state.dataSource[0].term}
                          </TextInput>
                          <TextInput placeholder="공사규모를 입력하세요" underlineColorAndroid='#0000' style={styles.modalInput}
                            onChangeText={(scale) => this.setState({ scale })}
                          >
                            {this.state.dataSource[0].scale}
                          </TextInput>
                          <TextInput placeholder="현장주소를 입력하세요" underlineColorAndroid='#0000' style={styles.modalInput}
                            onChangeText={(addr) => this.setState({ addr })}
                          >
                            {this.state.dataSource[0].addr}
                          </TextInput>
                          <Text onPress={() => {this.setState({modalMap:true})}}>지도</Text>
                        </View>
                      </View>
                    </ImageBackground>
                  </Form>
                  <View style={{width:150,alignSelf:'center',padding:10,marginTop:30}}>
                    <Button transparent rounded block style={{backgroundColor:'#db3928'}}
                      onPress={() => {this.modalComplate()}}
                    >
                      <Text style={{color:'#fff'}}>완료</Text>
                    </Button>
                  </View>
                </Content>
            </Modal>
            <Header style={{height:70,paddingTop:20,backgroundColor:'#db3928',borderBottomWidth:1,borderBottomColor:'#ccc'}}>
              <Left style={{flex:1}}>
                <Button rounded transparent onPress={() => {this.props.navigation.goBack()}}>
                  <Icon name="angle-left" type="FontAwesome" />
                </Button>
              </Left>
              <Body style={{flex:5,alignItems:'center'}}>
                <Text style={{textAlign:'center',color:'#fff',fontSize:20}}>현장정보</Text>
              </Body>
              <Right  style={{flex:1}}>
              </Right>
            </Header>
            <Content
              showsVerticalScrollIndicator={false}
              style={{ backgroundColor: "#fff" }}
              contentContainerStyle={{flex:1}}
            >
              <View style={{flex:1}}>
                <View style={[styles.Box,{marginTop:3,padding:0}]}>
                  <MapView
                    style={{height: '100%' }}
                    region={this.state.mapRegion}
                    onRegionChange={this._handleMapRegionChange}
                  />
                  <View style={{position:'absolute',bottom:0,width:'100%',height:45,backgroundColor:'#fffa',justifyContent:'center'}}>
                    <View style={[styles.Row,{justifyContent:'space-between',padding:5,alignItems:'center'}]}>
                      <View style={{paddingLeft:10}}>
                        <Text style={{fontSize:13}}>{this.state.dataSource[0].addr}</Text>
                      </View>
                      <View>
                        <Button
                          rounded
                          small
                          bordered
                          style={{borderColor:'#db3928',borderWidth:2}}
                          onPress={() => {this.setState({modal:!this.state.modal})}}
                        >
                          <Text style={{color:'#db3928',fontWeight:'bold'}}>
                            정보수정
                            <Icon name="edit" type="FontAwesome" style={{color:'#db3928',fontSize:15}}/>
                          </Text>
                        </Button>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              <View style={{flex:1.5}}>
                <View style={styles.Box}>
                  <ViewList
                    title="공사명"
                    content={this.state.dataSource[0].projectnm}
                  />
                  <ViewList
                    title="건축허가번호"
                    content={this.state.dataSource[0].authnum}
                  />
                  <ViewList
                    title="공사 시공자"
                    content={this.state.dataSource[0].constructor}
                  />
                  <ViewList
                    title="공사 감리자"
                    content={this.state.dataSource[0].supervisor}
                  />
                  <ViewList
                    title="발주자"
                    content={this.state.dataSource[0].owner}
                  />
                  <ViewList
                    title="현장 연락처"
                    content={this.state.dataSource[0].contact}
                  />
                  <ViewList
                    title="공사 규모"
                    content={this.state.dataSource[0].scale}
                  />
                  <ViewList
                    title="공사기간"
                    content={this.state.dataSource[0].term}
                  />
                </View>
              </View>
            </Content>
          </Container>
        );
      }
  }
}
export default TongInfo;

class ViewList extends Component{
  render() {
    return(
      <View style={[styles.grayBottom,styles.Row,{padding:10,justifyContent:'space-between'}]}>
        <Text style={{fontSize:14}}>{this.props.title}</Text>
        <Text style={{color:fontColor,fontSize:13}}>{this.props.content}</Text>
      </View>
    )
  }
}
