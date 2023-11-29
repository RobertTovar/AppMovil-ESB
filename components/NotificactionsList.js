import { View, Text, FlatList, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import ReportCard from './ReportCard'
import { useNavigation, useFocusEffect} from '@react-navigation/native'
import { URL_BASE } from '@env'
import Notification from './Notification'

class NotificationsList extends Component {
  constructor(props) {
    super(props)
    if (this.props.tipo === 'Reporte') {
      //Direccion de api que regresa los reportes de los hijos de un tutor por su id
      //this.url = 'http://'+ URL_BASE +'/api/reportes/estudiante/' + this.props.id
    } else {
      //Direccion de api que regresa los citatorios de los hijos de un tutor por su id
      //this.url = 'http://'+ URL_BASE +'/api/reportes/estudiante/' + this.props.id
    }
    //this.interval = setInterval(() => this.checkData(), 1000);
  
    this.state = {
       data: [],
    }
    //Este array en realidad va cargar los reportes traidos por una query
    this.arrayNew = [{id:1,description:'Descripcion1',date:'12-12-22'},{id:2,description:'Descripcion1',date:'12-12-22'},{id:3,description:'Descripcion1',date:'12-12-22'}];
    //this.getData()
  }

  getData = () => {
    fetch(this.url, {
        method: 'GET'
        //Request Type
    })
    .then((response) => response.json())
    //If response is in json then in success
    .then((response) => {
        //Success
        //const arrayTemp = []
        response.forEach(element => {
            tempSet = {
                id: element['id'],
                description: element['descripcion'],
                date: element['fecha'],
            }
            this.arrayNew.push(tempSet)
            //console.log(this.arrayNew)
        })
        this.setState({data: this.arrayNew})    
    })
    //If response is not in json then in error
    .catch((error) => {
        //Error 
        console.error(error)
    })
  }

  renderSeparator = () => {
      return (
          <View
          style={{
              height: 3,
              width: '100%',
              backgroundColor: '#3C4D6C',
          }}
          />
      );
  };

  renderHeader = () => {
    return (
      <View>
        <View style = {styles.headerInfoCont}>
              <Text style = {styles.headerInfoText} >
                  {this.props.tipo}s
              </Text>
          </View>
      </View>
    )
  }

  render() {
    
    return (
      <View
        style={styles.containerView}>
          <FlatList
              style = {styles.list_cont}
              //data={this.state.data}
              data={this.arrayNew}
              renderItem={({ item }) => (
                  <Notification id = {item.id} desc = {item.description} date = {item.date} />
              )}
              keyExtractor={item => item.id}
              ItemSeparatorComponent={this.renderSeparator}
              //ListHeaderComponent={this.renderHeader}
          />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  containerView: {
    padding: 20,
    width: '98%',
    alignSelf: 'center',
    justifyContent: 'center',
    height: '90%'
  },

  list_cont: {
    maxHeight: '100%'
  },
  headerInfoCont: {
    marginBottom: 5,
    padding: 10,
  },

  headerInfoText: {
    color: "black",
    fontSize: 40,
    fontWeight: 'bold',
  },

  button_cont: {
    width: '70%',
    maxHeight: 10,
    alignSelf: 'center'
  }
})

export default NotificationsList