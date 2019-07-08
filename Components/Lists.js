import React, { Component } from 'react'
import { Text, View, StyleSheet, Button, TextInput, AsyncStorage } from 'react-native'
import {withNavigation} from 'react-navigation'

class Lists extends Component {

  state = {
    addNew: false,
    lists: [],
    name: ''
  }

  async componentDidMount(){
    const lists = await AsyncStorage.getItem('Lists')
    if(lists) {
      this.setState({
        lists: JSON.parse(lists),
      })
    } else {
      return
    }
  }

  addNew = () => {
    this.setState({
      addNew: !this.state.addNew
    })
  }

  addList = async () => {
    let newLists = [...this.state.lists]

    let num 

    if(newLists.length > 0){
      num = newLists[newLists.length -1].key
      num++
    } else {
      num = 1
    }


    newLists.push(
      {
        name: this.state.name,
        incomplete: [],
        complete: [],
        key: num
      }
    )

    try {
      let lists = JSON.stringify(newLists)
      await AsyncStorage.setItem('Lists', lists)
    } catch (error) {
      console.log(error)
    }
    this.setState({
      addNew: false,
      lists: newLists,
      name: ''
    })
  }

  removeAll = async () => {
    await AsyncStorage.removeItem('Lists')
  }

  saveLists = async (newList) => {

    console.log(newList)
    let lists = [...this.state.lists]
    let index = lists.findIndex(element => {
      return newList.key === element.key
    })
    console.log(index)
    lists.splice(index, 1, newList)

    // console.log(lists)

    let data = JSON.stringify(lists)

    await AsyncStorage.setItem('Lists', data)

    let newLists = await AsyncStorage.getItem('Lists')
    this.setState({
      lists: JSON.parse(newLists)
    })
  }

  goToList = (list) => {
    this.props.navigation.navigate('List', {list: list, save: this.saveLists})
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Lists from SANIC</Text>

        {this.state.lists.length > 0 ? 
        
        <View style={styles.listNameHold}>{this.state.lists.map(element => {
          return <Text onPress={() => this.goToList(element)} style={styles.listName} key={element.name}> - {element.name}</Text>
        })}</View> : <></>}
        {this.state.addNew &&
          <View style={styles.addListHold}>
            <TextInput style={{width: '80%', fontSize: 24, color:'white'}} onChangeText={(name) => this.setState({ name })} placeholder='list name' />
            <Button onPress={this.addList} title='Confirm' />
          </View>}
        <Button style={styles.addNewButton} onPress={this.addNew} title='+ Add New List' />
        {/* <Button style={styles.addNewButton} onPress={this.removeAll} title='Delete all lists' /> */}
      </View>
    )
  }
}

export default withNavigation(Lists)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
    alignItems: 'center',
    paddingTop: 50
  },
  addListHold: {
    width: '80%',
    display: 'flex',
    flexDirection: 'row',
    color: 'white'
  },
  title: {
    fontSize: 42,
    fontWeight: '700',
    color: 'yellow',
    textDecorationLine:'underline'
  },
  listName: {
    textAlign: 'left',
    fontSize: 36,
    color: 'yellow',
    borderTopColor: 'black',
    borderBottomColor: 'black',
    borderTopWidth: 1,
    borderBottomWidth: 1
  },
  listNameHold: {
    marginTop: 5,
    marginBottom: 15,
    width:'80%',
    borderTopColor: 'black',
    borderBottomColor: 'black',
    borderTopWidth: 1,
    borderBottomWidth: 1
  },
  addNewButton: {
    marginTop: 100,
    padding: 15,
    fontSize: 24
  }
});