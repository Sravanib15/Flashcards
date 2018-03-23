import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform, TextInput, Linking } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { addCardInDeck } from '../utils/api'
import { connect } from 'react-redux'
import { addCard } from '../actions'
import { purple, white, green, red } from '../utils/colors'
import { NavigationActions } from 'react-navigation'

function SubmitBtn ({ onPress, name }) {
  return (
    <TouchableOpacity
      style={Platform.OS === 'ios'
        ? (name === 'Correct' ? styles.iosCorrectSubmitBtn  : styles.iosIncorrectSubmitBtn)
        : (name === 'Correct' ? styles.AndroidCorrectSubmitBtn  : styles.AndroidIncorrectSubmitBtn)}
      onPress={onPress}>
        <Text style={styles.submitBtnText}>{name}</Text>
    </TouchableOpacity>
  )
}
class QuizView extends Component {
  state = {
    display: 'answer',
    currentQuestion: 0,
    score: 0,
  }

  toggleDisplay = () => {
    const { display } = this.state;
    display === 'question' ? this.setState({display:'answer'}) : this.setState({display:'question'})

  }

  shuffle = (o) => {
    if(o && o.length > 0)
      for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
  };

  isCorrect = (flag) => {
    let { score, currentQuestion, currentCard } = this.state;
    currentQuestion++;
    flag && score++;

    this.setState({currentQuestion, score});
  }

  toDeckCover = (title) => {
    this.props.navigation.navigate('DeckCover', { title });
  }

  render() {
    const { currentQuestion, totalQuestions, display } = this.state;
    const { deck } = this.props;
    let { questions } = deck;
    console.log(questions);
    questions = this.shuffle(questions);
    console.log(currentQuestion);
    const card  = questions[currentQuestion];
    console.log(currentQuestion);

    if (!card) {
      const { score } = this.state
      if (currentQuestion === questions.length) {
        return (
          <View style={styles.container}>
            <Text style={styles.bigblue}> You have answered {(score/currentQuestion) * 100 }%</Text>
          </View>
        )
      }

      return (
        <View style={styles.container}>
          <Text>No card to take quiz</Text>
        </View>
      )
    }

    const { question, answer } = card;

    return (
      <View style={styles.container}>
        <Text>{currentQuestion + 1}/ {questions.length}</Text>
        {this.state.display !== 'question' && (
          <Text style={styles.qAndAText}> {question} </Text>
        )}
        {this.state.display !== 'answer' && (
          <Text style={styles.qAndAText}> {answer} </Text>
        )}

        <Text style={styles.toggleText}
            onPress={() => this.toggleDisplay()}>
            {display}
        </Text>
        <SubmitBtn onPress={() => this.isCorrect(true)} name="Correct" />
        <SubmitBtn onPress={() => this.isCorrect(false)} name="Incorrect"/>
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
  toggleText: {
    color: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  qAndAText: {
    fontWeight: 'bold',
    fontSize: 20,
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
  iosCorrectSubmitBtn: {
    backgroundColor: green,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
    marginTop:40
  },
  AndroidCorrectSubmitBtn: {
    backgroundColor: green,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iosIncorrectSubmitBtn: {
    backgroundColor: red,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
    marginTop:40
  },
  AndroidIncorrectSubmitBtn: {
    backgroundColor: red,
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
)(QuizView)
