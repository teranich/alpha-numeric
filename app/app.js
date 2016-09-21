import React, { Component } from 'react';
import {
  Text,
  TextInput,
  View,
  Alert,
  StyleSheet,
  Navigator
} from 'react-native';

import customData from '../data/numbers.json';


class MyButton extends Component {
  render() {
    return (
        <Text>
          {this.props.label}
        </Text>
    )
  }
}

// You can use CircleButton, RoundButton, RectangleButton to instead ButtonComponent
export class App extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '1984' };
  }

  componentWillMount () {
    this.setState({
      cleared: true,
      mode: 'plain',
      selected: []
    })
    this.selected = []
  }
  switchMode () {
    this.setState({
     mode: this.state.mode === 'plain' ? 'remember'  : 'plain'
    });
  }
  handleClear () {
    this.setState({
     selected: []
    });
  }

  onSelectHandle (item) {
    this.state.selected.push(item)
    // this.setState({
    //   selected: this.state.selected
    // });
  }

  handleChange (text) {
      // Alert.alert(text)
  }

  render() {
    let data = customData
    let self = this
    return (

      <View style={styles.container}>

            <Text>
              {
                this.state.selected.map((item, index) => item.number).join(' ') || 'Буквенно-числовые'
              }
            </Text>
            <Text>
              {
                this.state.selected.map((item, index) => item.item).join(' ') || 'коды'
              }
            </Text>
            <Text >
            {
              data.map(function(item, index) {
                return <Text style={index % 2 === 0 ? styles.word_odd : styles.word_not_odd}
                      onPress={
                        () => {
                          if (self.state.mode === 'remember') {
                            Alert.alert(
                              String(index),
                              item,
                            )
                        }
                        self.state.selected.push({
                          item: item,
                          number: index
                        })
                        self.setState({selected: self.state.selected});
                      }
                    }
                  >
                  <Text style={self.state.selected.find(elem => (elem.item === item)) ? styles.selected : styles.none}>
                    ( {index < 10 ? '0' + index : index } )
                  </Text>

                </Text>
              })
            }
            </Text>

            <TextInput
               keyboardType="numeric"
               style={{height: 40,borderColor: 'gray', borderWidth: 1}}
               onChangeText={(text) => this.handleChange(text)}
              //  value={this.state.text}
             />

            <Text style={styles.controls}>
              <Text  onPress={this.handleClear.bind(self)}>Очистить</Text>
              <Text>  </Text>
              <Text onPress={this.switchMode.bind(self)}>{this.state.mode ==='plain' ? 'обычный режим' : 'запоминание'}</Text>
            </Text>
            <Text>{'\n'}</Text>

            <Text style={styles.instructions}>
             0 Н М  1 Г Ж
             2 Д Т  3 К Х
             4 Ч Щ  5 Б П
             6 Ш Л  7 С З
             8 В Ф  9 Р Ц
            </Text>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    fontSize: 20,
    margin: 10,
    justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  word_odd: {
    color: '#333333',
    justifyContent: 'center',
    backgroundColor: 'red',
  },
  word_not_odd: {
    justifyContent: 'center',
    backgroundColor: '#333333',
    color: 'red',
  },
  selected: {
    backgroundColor: 'blue'
  },
  none: {},
  controls: {
    padding: 20
  }

});
