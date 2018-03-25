import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform, TextInput } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { submitDeck } from '../utils/api'
import { connect } from 'react-redux'
import { addDeck } from '../actions'
import { purple, white } from '../utils/colors'
import { NavigationActions } from 'react-navigation'

function SubmitBtn ({ onPress, name }) {
  return (
    <TouchableOpacity
      style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
      onPress={onPress}>
        <Text style={styles.submitBtnText}>{name}</Text>
    </TouchableOpacity>
  )
}
class DeckCover extends Component {

  addCard = () => {
    const { title, questions} = this.props;
    this.navigateTo('AddCard', { title, questions })

  }

  startQuiz = () => {
    const { title, questions } = this.props;
    this.navigateTo('QuizView', { title, questions })
  }

  navigateTo = (name, params) => {
    this.props.navigation.navigate(name, params);
  }

  render() {
    const { title, deck, questions } = this.props;
    //const { questions } = deck;
    const questionsCount = questions.length;
    return (
      <View style={styles.container}>
        <Text style={styles.bigblue}>{title}</Text>

        <Text style={styles.subtitle}>{questionsCount} {questionsCount > 1 ? 'Cards': 'Card'}</Text>
        <SubmitBtn onPress={this.addCard} name="Add Card" />
        <SubmitBtn onPress={this.startQuiz} name="Start Quiz"/>
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
  subtitle: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 15,
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
  const { title, questions } = props.navigation.state.params;
  const deck = state[title];
  console.log(title);
  console.log(deck);
  return { title, questions, deck }
}

export default connect(
  mapStateToProps
)(DeckCover)
