import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Calendar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      year:new Date().getFullYear(),
      month:new Date().getMonth(),
      day:new Date().getDate()
    };
  }

  componentDidMount() {
  }

  onDayPress(day) {
    this.props.onDayPress(day)
  }

  onChangeMonth(changeMonth) {
    var changeYear;
    if(changeMonth < 0) {
      changeMonth = 11;
      changeYear = this.state.year - 1;
    } else if (changeMonth > 11) {
      changeMonth = 0;
      changeYear = this.state.year + 1;
    } else {
      changeYear = this.state.year;
    }
    this.setState({
      month: changeMonth,
      year: changeYear
    })

    const { year, month } = this.state;
    let obj = {
      ["year"]: year,
      ["month"]: month,
      ["getFullDate"]: year+"-"+month
    }
    if(this.props.onChangeMonth) {
      this.props.onChangeMonth(obj)
    }
  }

  getDate(year, month, day) {
    var date = new Date(year, month, day);
    var y = date.getFullYear();
    var m = date.getMonth();
    var d = date.getDate();

    var theDate = new Date(y,m,1);
    var theDay = theDate.getDay();
    var last = [31,28,31,30,31,30,31,31,30,31,30,31];
    if ((y%4 === 0 && y%100 !== 0) || y%400 === 0) {
      lastDate = last[1] = 29;
    }
    var lastDate = last[m]
    var row = Math.ceil((theDay+lastDate)/7);

//    dateOrigin = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
    let cells = [];
    var dNum = 1;
    var cNum = 1;
    for (i=1; i<=row; i++) {
      for (j=1; j<=7; j++) {
        title = 'd'+cNum;
        if(i === 1 && j <= theDay || dNum > lastDate) {
          cells.push({["day"]:null})
        } else {
          cells.push({["day"]:dNum})
          dNum++;
        }
        cNum++;
      }
    }

    return cells;
  }

  getSelectedDates() {
    if(!this.props.data) {
      return new Array();
    }
    dateArray = this.props.data.sort();
    dateObj = {};
    for (var i = 0; i < dateArray.length; i++) {
      var num = dateArray[i];
      dateObj[num] = dateObj[num] ? dateObj[num]+1 : 1;
    }
    return dateObj;
  }

  render() {
    const { year, month, day } = this.state;
    getDate = this.getDate(year, month, day);

    let getSelecteDates = this.getSelectedDates();
    dayCell = getDate.map((data, key) => {
      selected = false;
      dayCount = 0;
      if(data.day) {
        fullDateStr = year+"-"+(month+1)+"-"+(data.day < 10 ? "0"+data.day : data.day);
        if(Object.keys(getSelecteDates).indexOf(fullDateStr) > -1) {
          selected = true;
          dayCount = getSelecteDates[fullDateStr];
        }
      }
      return <DayCell
          key={key}
          year={this.state.year}
          month={this.state.month}
          day={data.day}
          onDayPress={this.onDayPress.bind(this)}
          selected={selected}
          dayCount={dayCount}
        >
          {data.day}
        </DayCell>
    })
    return (
      <View style={styles.container}>
        <View style={{borderWidth:1,borderColor:'#e9e9e9',flex:1,width:'100%'}}>
          <MonthSelector
            year={this.state.year}
            month={this.state.month}
            changeMonth={this.onChangeMonth.bind(this)}
          >{year}년 {month+1}월</MonthSelector>
          <View style={styles.week}>
            <WeekText sunday>Sun</WeekText>
            <WeekText>Mon</WeekText>
            <WeekText>Tue</WeekText>
            <WeekText>Wed</WeekText>
            <WeekText>Thu</WeekText>
            <WeekText>Fri</WeekText>
            <WeekText saturday>Sat</WeekText>
          </View>
          <View style={{flexDirection:'row',flexWrap:'wrap'}}>
            {dayCell}
          </View>
        </View>
      </View>
    )
  }
}

class WeekText extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    let fontColor = '#666';
    if (this.props.saturday) fontColor = '#0157db';
    if (this.props.sunday) fontColor = '#db3928';
    return <View style={styles.weekItem}><Text
      style={{
        fontWeight:'bold',
        fontSize:9,
        color: fontColor,
      }}>
      {this.props.children}
      </Text></View>
  }
}

class MonthSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    const { year, month } = this.props;
    return (
      <View style={styles.month}>
        <TouchableOpacity style={{flex:1,alignItems:'center',justifyContent:'center'}}
          onPress={() => this.props.changeMonth(month-1)}
        >
          <Icon name="angle-left" style={{fontSize:30,color:'#546e7a'}} />
        </TouchableOpacity>
        <View style={{flex:3,alignItems:'center',justifyContent:'center'}}>
          <Text style={{fontSize:16,fontWeight:'bold',color:'#555'}}>{this.props.children}</Text>
        </View>
        <TouchableOpacity style={{flex:1,alignItems:'center',justifyContent:'center'}}
          onPress={() => this.props.changeMonth(month+1)}
        >
          <Icon name="angle-right" style={{fontSize:30,color:'#546e7a'}} />
        </TouchableOpacity>
      </View>
    )
  }
}

class DayCell extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  render() {
    const calendarIcon  = require('../assets/images/calendarIcon.png');
    const { year, month, day } = this.props;
    newDate = new Date(year, month, day);
    let fontColor = '#666';
    if (newDate.getDay() === 6) fontColor = '#0157db';
    if (newDate.getDay() === 0) fontColor = '#db3928';

    let isToday = false;
    if (newDate.toDateString() === new Date().toDateString()) {
      isToday = true;
      fontColor = '#ffffff';
    }
    const today = {backgroundColor:'#db3928'}

    const obj = {
      ["year"]: newDate.getFullYear(),
      ["month"]: newDate.getMonth()+1,
      ["day"]: newDate.getDate(),
      ["getFullDate"]: newDate.getFullYear()+"-"+(newDate.getMonth()+1)+"-"+newDate.getDate()
    }
    return (
      <TouchableOpacity style={styles.dayCell}
        onPress={() => {this.props.day && this.props.onDayPress(obj)}}
      >
        <View style={[{position:'absolute',top:0,left:0,zIndex:1}]}>
          <View style={[isToday && today,{width:20,height:20,justifyContent:'center',alignItems:'center',borderRadius:10}]}>
            <Text style={{fontSize:11,color:fontColor}}>{this.props.children}</Text>
          </View>
        </View>
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          { this.props.dayCount >= 1 &&
            <View style={{width:'50%',height:'50%',marginLeft:5}}>
              <Image source={calendarIcon} style={{resizeMode:'contain',flex:1,}} />
            </View>
          }
          { this.props.dayCount > 1 &&
            <View style={styles.badge}>
              <Text style={{color:'#fff',fontSize:9}}>{this.props.dayCount}</Text>
            </View>
          }
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center'
  },
  week: {
    flexDirection: 'row',
    backgroundColor: '#f4f4f4',
    height: 30
  },
  weekItem: {
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  month: {
    height: 40,
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
    borderBottomWidth:1,
    borderColor:'#f9f9f9',
    backgroundColor:'#fff',
    elevation: 5,
  },
  dayCell: {
    width:'14.285%',
    borderWidth:0.5,
    borderColor:'#e9e9e9',
    height: 50
  },
  badge: {
    borderRadius:10,
    width:13,
    height:13,
    backgroundColor:'#db3928',
    position:'absolute',
    bottom:5,
    right:5,
    justifyContent:'center',
    alignItems:'center'
  }
});
