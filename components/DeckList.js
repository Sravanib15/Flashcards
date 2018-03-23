import React, { Component } from 'react'
import { View, FlatList, TouchableOpacity, Text, StyleSheet, Platform, TextInput, TouchableHighlight, ScrollList } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { fetchDeckResults, submitDeck } from '../utils/api'
import { connect } from 'react-redux'
import { addDeck, receiveDecks } from '../actions'
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
class DeckList extends Component {
  state = {
    ready: false
  }

  toDeck = ({ title }) => {
    this.props.navigation.navigate('DeckCover', { title });
  }

  componentWillMount() {
    const { dispatch } = this.props
    fetchDeckResults()
      .then((decks) => dispatch(receiveDecks(decks)))
      .then(() => this.setState(() => ({ready: true})))
  }

  _onPress = (deck) => {
    this.toDeck(deck);

  }

  render() {
    const { decks } = this.props
    const { ready } = this.state
    return (
      <View style={styles.container}>
        <FlatList
          data={decks}
          keyExtractor={item => item.title}
          renderItem={({item, separators}) => {
            return (
              <TouchableHighlight
                onPress={() => this._onPress(item)}
                onShowUnderlay={separators.highlight}
                onHideUnderlay={separators.unhighlight}>
                <View style={styles.item}>
                  <Text>{item.title}</Text>
                  <Text>{item.questions.length}</Text>
                </View>
              </TouchableHighlight>
            )
          }}
        />
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
  },
  item: {
    padding: 10,
    height: 60,
  },
  bigblue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
    paddingBottom: 40,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
    borderWidth: 2
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

function mapStateToProps (entries) {
  const decks = Object.values(entries);
  return {
    decks
  }
}

export default connect(
  mapStateToProps
)(DeckList)
