import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet, Button } from 'react-native'

class List extends Component {

  state = {
    complete: [],
    incomplete: [],
    name: '',
    item: '',
    key: null
  }

  componentDidMount() {
    let { list } = this.props.navigation.state.params
    // console.log(list)
    // console.log(this.props.navigation.state.params)
    this.setState({
      complete: list.complete,
      incomplete: list.incomplete,
      name: list.name,
      key: list.key
    })
  }

  addItem = () => {
    let incomplete = [...this.state.incomplete]
    let key
    if (incomplete.length === 0) {
      key = 1
    } else {
      key = incomplete[incomplete.length - 1].key
      key++
    }
    incomplete.push({ text: this.state.item, key: key })
    this.setState({
      incomplete: incomplete,
      item: ''
    })

    // console.log(this.state.incomplete)

    let list = {
      name: this.state.name,
      incomplete: incomplete,
      complete: this.state.complete,
      key: this.state.key
    }

    this.props.navigation.state.params.save(list)
  }

  completeItem = (key) => {
    let incomplete = [...this.state.incomplete]
    let complete = [...this.state.complete]

    let index = incomplete.findIndex(element => {
      return element.key === key
    })
    complete.push(incomplete[index])
    incomplete.splice(index, 1)
    if (!incomplete[0].key) {
      incomplete = []
    }
    this.setState({
      incomplete,
      complete
    })

    let list = {
      name: this.state.name,
      incomplete: incomplete,
      complete: complete,
      key: this.state.key
    }

    this.props.navigation.state.params.save(list)
  }

  undoComplete = (key) => {
    let incomplete = [...this.state.incomplete]
    let complete = [...this.state.complete]

    let index = complete.findIndex(element => {
      return element.key === key
    })
    incomplete.push(complete[index])
    complete.splice(index, 1)
    // console.log(complete.length)
    this.setState({
      incomplete,
      complete
    })

    let list = {
      name: this.state.name,
      incomplete: incomplete,
      complete: complete,
      key: this.state.key
    }

    this.props.navigation.state.params.save(list)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{this.state.name}</Text>
        {this.state.incomplete.length > 0 ? <View style={styles.listNameHold}>{this.state.incomplete.map(element => {
          return <Text onPress={() => this.completeItem(element.key)} style={styles.listName} key={element.key}>{element.text}</Text>
        })}</View> : <></>}
        <View style={styles.addListHold}>
          <TextInput style={{ width: '80%', fontSize: 24, color: 'white' }} title='item' placeholder='Add an item' value={this.state.item} onChangeText={(item) => this.setState({ item })} />
          <Button onPress={this.addItem} title='+ Add' />
        </View>
        <View style={styles.listNameHold}>
          {this.state.complete.map(element => {
            return <Text onPress={() => this.undoComplete(element.key)} style={styles.listName} key={element.key}>{element.text}</Text>
          })}
        </View>
      </View>
    )
  }
}

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
    textDecorationLine: 'underline'
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
    width: '80%',
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

export default List