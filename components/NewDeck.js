import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform, TextInput } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { submitDeck } from '../utils/api'
import { connect } from 'react-redux'
import { addDeck } from '../actions'
import { purple, white } from '../utils/colors'
import { NavigationActions } from 'react-navigation'

function SubmitBtn ({ onPress }) {
  return (
    <TouchableOpacity
      style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
      onPress={onPress}>
        <Text style={styles.submitBtnText}>Create Deck</Text>
    </TouchableOpacity>
  )
}
class NewDeck extends Component {
  state = {
    title: ''
  }

  submit = () => {
    const { title } = this.state;
    const deck = {
      title: title,
      questions: []
    };

    console.log(deck);
    this.props.dispatch(addDeck({
      [deck.title]: deck
    }))

    this.setState(() => ({title:''}));

    this.toHome(deck)

    submitDeck({ title, deck })
  }

  toHome = (deck) => {
    const { title, questions } = deck;
    this.props.navigation.navigate('DeckCover', { title, questions });
  }

  render() {
    const { title } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.bigblue}>What is the title of the new deck</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Title"
          onChangeText={(title) => this.setState({title})}
          defaultValue={this.state.title}
        />

        <SubmitBtn onPress={this.submit} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#000',
    padding: 2,
    margin: 5,
    width: '95%',
    height: 40
  },
  bigblue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
    paddingBottom: 40,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginTop: 100
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  iosSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
    marginTop:40
  },
  AndroidSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
})

export default connect(
)(NewDeck)
