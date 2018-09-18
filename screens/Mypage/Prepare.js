import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  Modal,
  Button,
  TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles.js';

class Prepare extends Component{
  state = {
    modalVisibleDoc: false,
    modalVisibleSign: false,
    modalVisibleAcc: false,
  };

  setModalVisibleDoc(visible) {
    this.setState({modalVisibleDoc: visible});
  };
  setModalVisibleSign(visible) {
    this.setState({modalVisibleSign: visible});
  };
  setModalVisibleAcc(visible) {
    this.setState({modalVisibleAcc: visible});
  };

  render(){
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisibleDoc}
          onRequestClose={() => {
            this.setModalVisibleDoc(!this.state.modalVisibleDoc);
          }}
        >
          <View style={{marginTop:10,marginLeft:5}}>
            <TouchableHighlight
              onPress={() => {
                this.setModalVisibleDoc(!this.state.modalVisibleDoc);
              }}
              style={{width:30,height:30}}
            >
              <Icon name='times' size={25} />
            </TouchableHighlight>
          </View>
          <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
            <TouchableOpacity
              style={{width:100,height:150,borderWidth:1,borderColor:'#aaa',flexDirection:'column',justifyContent:'center',alignItems:'center'}}
              onPress={() => { this.setModalVisibleDoc(!this.state.modalVisibleDoc);}}
              >
              <Icon name='file' size={50} />
              <Text>서류 등록</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisibleSign}
          onRequestClose={() => {
            this.setModalVisibleSign(!this.state.modalVisibleSign);
          }}
        >
          <View style={{marginTop:10,marginLeft:5}}>
            <TouchableHighlight
              onPress={() => {
                this.setModalVisibleSign(!this.state.modalVisibleSign);
              }}
              style={{width:30,height:30}}
            >
              <Icon name='times' size={25} />
            </TouchableHighlight>
          </View>
          <View style={{flex:1,flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start'}}>
            <View style={{padding:10}}>
              <Text style={{fontSize:20,color:'#707070'}}>전자 서명</Text>
              <View style={[styles.SignBox,{marginBottom:20}]} />
              <View style={{width:100,marginLeft:'auto'}}>
                <Button title="다시 서명" color="#aaa" onPress={() => {this.setModalVisibleSign(!this.state.modalVisibleSign)}}/>
              </View>
              <View style={{marginTop:100,borderTopWidth:0.5,paddingTop:30}}>
                <Button title="저 장" color="#aaa" onPress={() => {this.setModalVisibleSign(!this.state.modalVisibleSign)}}/>
              </View>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisibleAcc}
          onRequestClose={() => {
            this.setModalVisibleAcc(!this.state.modalVisibleAcc);
          }}
        >
          <View>
            <View style={{marginTop:10,marginLeft:10}}>
              <TouchableHighlight
                onPress={() => {
                  this.setModalVisibleAcc(!this.state.modalVisibleAcc);
                }}
              >
                <Icon name='times' size={25} />
              </TouchableHighlight>
            </View>
            <View style={{padding:10}}>
              <Text style={{fontSize:20,color:'#707070'}}>계좌 등록</Text>
              <View style={{marginTop:20}}>
                <TextInput
                  placeholder={'계좌번호 입력'}
                  style={styles.input}
                  underlineColorAndroid='rgba(0,0,0,0)'
                />
                <Button title="계좌번호 인증" color="#aaa" onPress={() => {this.setModalVisibleAcc(!this.state.modalVisibleAcc)}} />
              </View>
              <View style={{marginTop:100,borderTopWidth:0.5,paddingTop:30}}>
                <Button title="저 장" color="#aaa" onPress={() => {this.setModalVisibleAcc(!this.state.modalVisibleAcc)}}/>
              </View>
            </View>
          </View>
        </Modal>

        <View style={[styles.Box]}>
          <TouchableOpacity style={styles.ListItems} onPress={() => {this.setModalVisibleDoc(true);}}>
            <Icon name='home' size={20} />
            <Text style={styles.TextBox}>서류 등록</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.ListItems} onPress={() => {this.setModalVisibleSign(true);}}>
            <Icon name='home' size={20} />
            <Text style={styles.TextBox}>전자 서명</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.ListItems} onPress={() => {this.setModalVisibleAcc(true);}}>
            <Icon name='home' size={20} />
            <Text style={styles.TextBox}>계좌 등록</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
export default Prepare;
