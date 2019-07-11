import React, { Component } from 'react'
import { Text, View, StyleSheet, Alert, TextInput, AsyncStorage } from 'react-native'
import { withNavigation } from 'react-navigation'
import Swipeout from 'react-native-swipeout'

class Lists extends Component {


  state = {
    lists: [],
    name: ''
  }

  async componentDidMount() {
    // console.log('hit')
    const lists = await AsyncStorage.getItem('Lists')
    if (lists) {
      // console.log('hit 2')
      this.setState({
        lists: JSON.parse(lists),
      })
    } else {
      return
    }
  }

  addList = async () => {
    let newLists = [...this.state.lists]

    let num

    if (newLists.length > 0) {
      num = newLists[newLists.length - 1].key
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
      // console.log('hit 3')
      this.setState({
        lists: newLists,
        name: ''
      })
      await AsyncStorage.setItem('Lists', lists)
      // console.log('hit 5')
    } catch (error) {
      console.log(error)
    }
  }

  removeAll = async () => {
    await AsyncStorage.removeItem('Lists')
  }

  saveLists = async (newList) => {

    // console.log(newList)
    let lists = [...this.state.lists]
    let index = lists.findIndex(element => {
      return newList.key === element.key
    })
    // console.log(index)
    lists.splice(index, 1, newList)

    // console.log(lists)

    let data = JSON.stringify(lists)

    await AsyncStorage.setItem('Lists', data)
    // console.log('hit 4')

    let newLists = await AsyncStorage.getItem('Lists')
    this.setState({
      lists: JSON.parse(newLists)
    })
  }

  goToList = (list) => {
    this.props.navigation.navigate('List', { list: list, save: this.saveLists })
  }

  deleteItem = (key) => {
    Alert.alert(
      'Delete List',
      'Are you sure?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed', key),
          style: 'cancel',
        },
        {
          text: 'OK', onPress: async () => {
            let arr = [...this.state.lists]
            let index = arr.findIndex(element => {
              return element.key === key
            })
            arr.splice(index, 1)
            let data = JSON.stringify(arr)

            await AsyncStorage.setItem('Lists', data)

            let newLists = await AsyncStorage.getItem('Lists')
            this.setState({
              lists: JSON.parse(newLists)
            })
          }
        },
      ],
      { cancelable: false },
    );
  }

  render() {

    return (
      <View style={styles.container}>
        <Text style={styles.title}>My Lists</Text>

        {this.state.lists.length > 0 ?

          <View style={styles.listNameHold}>{this.state.lists.map(element => {
            return <Swipeout 
            key={element.key} 
            left={[{
              text: 'Delete',
              backgroundColor: 'red',
              underlayColor: 'rgba(0,0,0,01,0.6)',
              onPress: () => this.deleteItem(element.key)
            }]}
            backgroundColor='transparent'
            autoClose={true}
            >
              <Text
                onPress={() => this.goToList(element)}
                style={styles.listName}
              >
                {element.name}
              </Text>
            </Swipeout>
          })}</View> : <></>}

        <View style={styles.addListHold}>
          <TextInput
            onSubmitEditing={this.addList}
            style={{ width: '80%', fontSize: 24, color: 'white' }}
            onChangeText={(name) => this.setState({ name })}
            placeholder='Add new list'
            value={this.state.name} />
        </View>
        {/* <Button style={styles.addNewButton} onPress={this.removeAll} title='Delete all lists' /> */}
      </View>
    )
  }
}

export default withNavigation(Lists)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    // paddingTop: 50
  },
  addListHold: {
    width: '95%',
    display: 'flex',
    flexDirection: 'row',
    color: 'white'
  },
  title: {
    fontSize: 42,
    fontWeight: '700',
    color: 'yellow',
    textDecorationLine: 'underline'
  },
  listName: {
    textAlign: 'left',
    fontSize: 36,
    color: 'white',
  },
  listNameHold: {
    marginTop: 5,
    marginBottom: 15,
    width: '95%',
  },
  addNewButton: {
    marginTop: 100,
    padding: 15,
    fontSize: 24
  }
});