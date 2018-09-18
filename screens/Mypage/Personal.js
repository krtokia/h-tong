import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles.js';

class Personal extends Component{
  state = {
    modalPW: false,
    modalPH: false,
    modalGD: false,
    modalBD: false,
    modalADD: false,
    modalHT: false,
    modalSC: false,
    modalCR: false,
  };

  setModalPW(visible) {
    this.setState({modalPW: visible});
  };
  setModalPH(visible) {
    this.setState({modalPH: visible});
  };
  setModalGD(visible) {
    this.setState({modalGD: visible});
  };
  setModalBD(visible) {
    this.setState({modalBD: visible});
  };
  setModalADD(visible) {
    this.setState({modalADD: visible});
  };
  setModalHT(visible) {
    this.setState({modalHT: visible});
  };
  setModalSC(visible) {
    this.setState({modalSC: visible});
  };
  setModalCR(visible) {
    this.setState({modalCR: visible});
  };

  render(){
    return (
      <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.modalPW}
        onRequestClose={() => {
          this.setModalPW(!this.state.modalPW);
        }}
      >
        <View>
          <View style={{marginTop:10,marginLeft:10}}>
              <Icon name='times' size={25} onPress={() => { this.setModalPW(!this.state.modalPW);}}/>
          </View>
          <View style={{padding:10}}>
            <Text style={{fontSize:20,color:'#707070'}}>패스워드 변경</Text>
            <View style={{marginTop:20}}>
              <TextInput
                placeholder={'패스워드 입력'}
                style={styles.input}
                underlineColorAndroid='rgba(0,0,0,0)'
              />
              <TextInput
                placeholder={'패스워드 다시 입력'}
                style={styles.input}
                underlineColorAndroid='rgba(0,0,0,0)'
              />
            </View>
            <View style={{marginTop:100,borderTopWidth:0.5,paddingTop:30}}>
              <Button title="저 장" color="#aaa" onPress={() => {this.setModalPW(!this.state.modalPW)}}/>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.modalPH}
        onRequestClose={() => {
          this.setModalPH(!this.state.modalPH);
        }}
      >
        <View>
          <View style={{marginTop:10,marginLeft:10}}>
              <Icon name='times' size={25} onPress={() => { this.setModalPH(!this.state.modalPH);}}/>
          </View>
          <View style={{padding:10}}>
            <Text style={{fontSize:20,color:'#707070'}}>연락처 변경</Text>
            <View style={{marginTop:20}}>
              <TextInput
                placeholder={'연락처 입력'}
                style={styles.input}
                underlineColorAndroid='rgba(0,0,0,0)'
              />
            </View>
            <View style={{marginTop:100,borderTopWidth:0.5,paddingTop:30}}>
              <Button title="저 장" color="#aaa" onPress={() => {this.setModalPH(!this.state.modalPH)}}/>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.modalGD}
        onRequestClose={() => {
          this.setModalGD(!this.state.modalGD);
        }}
      >
        <View>
          <View style={{marginTop:10,marginLeft:10}}>
              <Icon name='times' size={25} onPress={() => { this.setModalGD(!this.state.modalGD);}}/>
          </View>
          <View style={{padding:10}}>
            <Text style={{fontSize:20,color:'#707070'}}>성별 변경</Text>
            <View style={{marginTop:20}}>
              <TextInput
                placeholder={'성별 입력'}
                style={styles.input}
                underlineColorAndroid='rgba(0,0,0,0)'
              />
            </View>
            <View style={{marginTop:100,borderTopWidth:0.5,paddingTop:30}}>
              <Button title="저 장" color="#aaa" onPress={() => {this.setModalGD(!this.state.modalGD)}}/>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.modalBD}
        onRequestClose={() => {
          this.setModalBD(!this.state.modalBD);
        }}
      >
        <View>
          <View style={{marginTop:10,marginLeft:10}}>
              <Icon name='times' size={25} onPress={() => { this.setModalBD(!this.state.modalBD);}}/>
          </View>
          <View style={{padding:10}}>
            <Text style={{fontSize:20,color:'#707070'}}>생년월일 변경</Text>
            <View style={{marginTop:20}}>
              <TextInput
                placeholder={'생년월일 입력'}
                style={styles.input}
                underlineColorAndroid='rgba(0,0,0,0)'
              />
            </View>
            <View style={{marginTop:100,borderTopWidth:0.5,paddingTop:30}}>
              <Button title="저 장" color="#aaa" onPress={() => {this.setModalBD(!this.state.modalBD)}}/>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.modalADD}
        onRequestClose={() => {
          this.setModalADD(!this.state.modalADD);
        }}
      >
        <View>
          <View style={{marginTop:10,marginLeft:10}}>
              <Icon name='times' size={25} onPress={() => { this.setModalADD(!this.state.modalADD);}}/>
          </View>
          <View style={{padding:10}}>
            <Text style={{fontSize:20,color:'#707070'}}>거주지 변경</Text>
            <View style={{marginTop:20}}>
              <TextInput
                placeholder={'거주지 입력'}
                style={styles.input}
                underlineColorAndroid='rgba(0,0,0,0)'
              />
            </View>
            <View style={{marginTop:100,borderTopWidth:0.5,paddingTop:30}}>
              <Button title="저 장" color="#aaa" onPress={() => {this.setModalADD(!this.state.modalADD)}}/>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.modalHT}
        onRequestClose={() => {
          this.setModalHT(!this.state.modalHT);
        }}
      >
        <View>
          <View style={{marginTop:10,marginLeft:10}}>
              <Icon name='times' size={25} onPress={() => { this.setModalHT(!this.state.modalHT);}}/>
          </View>
          <View style={{padding:10}}>
            <Text style={{fontSize:20,color:'#707070'}}>출신지 변경</Text>
            <View style={{marginTop:20}}>
              <TextInput
                placeholder={'출신지 입력'}
                style={styles.input}
                underlineColorAndroid='rgba(0,0,0,0)'
              />
            </View>
            <View style={{marginTop:100,borderTopWidth:0.5,paddingTop:30}}>
              <Button title="저 장" color="#aaa" onPress={() => {this.setModalHT(!this.state.modalHT)}}/>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.modalSC}
        onRequestClose={() => {
          this.setModalSC(!this.state.modalSC);
        }}
      >
        <View>
          <View style={{marginTop:10,marginLeft:10}}>
              <Icon name='times' size={25} onPress={() => { this.setModalSC(!this.state.modalSC);}}/>
          </View>
          <View style={{padding:10}}>
            <Text style={{fontSize:20,color:'#707070'}}>출신학교 변경</Text>
            <View style={{marginTop:20}}>
              <TextInput
                placeholder={'출신학교 입력'}
                style={styles.input}
                underlineColorAndroid='rgba(0,0,0,0)'
              />
            </View>
            <View style={{marginTop:100,borderTopWidth:0.5,paddingTop:30}}>
              <Button title="저 장" color="#aaa" onPress={() => {this.setModalSC(!this.state.modalSC)}}/>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.modalCR}
        onRequestClose={() => {
          this.setModalCR(!this.state.modalCR);
        }}
      >
        <View>
          <View style={{marginTop:10,marginLeft:10}}>
              <Icon name='times' size={25} onPress={() => { this.setModalCR(!this.state.modalCR);}}/>
          </View>
          <View style={{padding:10}}>
            <Text style={{fontSize:20,color:'#707070'}}>경력 변경</Text>
            <View style={{marginTop:20}}>
              <TextInput
                placeholder={'경력 입력'}
                style={styles.input}
                underlineColorAndroid='rgba(0,0,0,0)'
              />
            </View>
            <View style={{marginTop:100,borderTopWidth:0.5,paddingTop:30}}>
              <Button title="저 장" color="#aaa" onPress={() => {this.setModalCR(!this.state.modalCR)}}/>
            </View>
          </View>
        </View>
      </Modal>

        <View style={[styles.Box]}>
          <TouchableOpacity style={styles.ListItems} onPress={() => {this.setModalPW(true)}}>
            <Icon name='home' size={25} />
            <Text style={styles.TextBox}>P/W</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.ListItems} onPress={() => {this.setModalPH(true)}}>
            <Icon name='home' size={25} />
            <Text style={styles.TextBox}>연락처</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.ListItems} onPress={() => {this.setModalGD(true)}}>
            <Icon name='home' size={25} />
            <Text style={styles.TextBox}>성별</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.ListItems} onPress={() => {this.setModalBD(true)}}>
            <Icon name='home' size={25} />
            <Text style={styles.TextBox}>생년월일</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.ListItems} onPress={() => {this.setModalADD(true)}}>
            <Icon name='home' size={25} />
            <Text style={styles.TextBox}>거주지</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.ListItems} onPress={() => {this.setModalHT(true)}}>
            <Icon name='home' size={25} />
            <Text style={styles.TextBox}>출신지</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.ListItems} onPress={() => {this.setModalSC(true)}}>
            <Icon name='home' size={25} />
            <Text style={styles.TextBox}>출신학교</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.ListItems} onPress={() => {this.setModalCR(true)}}>
            <Icon name='home' size={25} />
            <Text style={styles.TextBox}>경력</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
export default Personal;
