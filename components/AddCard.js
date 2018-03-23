import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform, TextInput } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { addCardInDeck } from '../utils/api'
import { connect } from 'react-redux'
import { addCard } from '../actions'
import { purple, white } from '../utils/colors'
import { NavigationActions } from 'react-navigation'

function SubmitBtn ({ onPress }) {
  return (
    <TouchableOpacity
      style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
      onPress={onPress}>
        <Text style={styles.submitBtnText}>SUBMIT</Text>
    </TouchableOpacity>
  )
}
class AddCard extends Component {
  state = {
    question: '',
    answer: ''
  }

  submit = () => {
    const { question, answer } = this.state;
    const { deck } = this.props;
    const { title } = deck;
    console.log(question);
    deck.questions.push({question, answer});
    this.props.dispatch(addCard({
      deck
    }))

    const card = {question, answer};
    addCardInDeck({
      title, card
    })

    this.toDeckCover(title);
  }

  toDeckCover = (title) => {
    this.props.navigation.navigate('DeckCover', { title });
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          placeholder="Question"
          onChangeText={(question) => this.setState({question})}
          defaultValue={this.state.question}
        />

        <TextInput
          style={styles.textInput}
          placeholder="Answer"
          onChangeText={(answer) => this.setState({answer})}
          defaultValue={this.state.answer}
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

function mapStateToProps(state, props) {
  const { title } = props.navigation.state.params;
  const deck = state[title];
  return { title, deck }
}

export default connect(
  mapStateToProps
)(AddCard)
