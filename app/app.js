import React, {
    Component
} from 'react';
import {
    Text,
    TextInput,
    View,
    ScrollView,
    Alert,
    StyleSheet,
    Navigator
} from 'react-native';

import {
    Button,
    Card,
    Subheader
} from 'react-native-material-design';
import customData from '../data/numbers.json';

export class Victorina extends Component {
    constructor(props) {
        super(props)
            // let codes = [{
            //     code: '19',
            //     word: '22',
            //     state: 0
            // }, {
            //     code: '1',
            //     word: '11',
            //     state: 0
            // }]
            //

        this.gameInit();
    }
    gameInit() {
        let codes = Object.keys(customData).map((code, index) => {
            return {
                word: customData[index],
                code: code,
                state: 0
            }
        })
        this.state = {
            codes: codes,
            cardIterator: 0,
            current: {},
            cardsRandomIndex: this.generate(codes.length)
        }
    }
    componentWillMount() {

    }

    generate(len) {
        let result = []

        for (let i = 0; i < len; i++) {
            result[i] = i
        }
        for (let i = 0; i < len; i++) {
            let rand1 = Math.floor((Math.random() * len))
            let rand2 = Math.floor((Math.random() * len))
            let temp = result[rand1];
            result[rand1] = result[rand2]
            result[rand2] = temp
        }
        console.log('remote', len, result);

        return result;

    }
    next() {
        console.log('state')
        let currentIndex = this.state.cardIterator
        let current = this.state.cardsRandomIndex[currentIndex]

        console.log('logg', current, this.state.cardsRandomIndex, this.state.codes[current])
        if (current < this.state.codes.length) {
            this.state.codes[current].state = 1;
            this.setState({
                cardIterator: currentIndex + 1,
                current: this.state.codes[current]
                    // codes: this.state.cardsRandomIndex[current]
            })
        } else {
            this.gameInit()
            this.forceUpdate()
        }

    }

    pi() {

    }

    render() {
        let self = this;
        return (
            <View  style={{
                flexDirection: 'column',
                justifyContent: 'space-between'
            }}>
                <Text >{'\n'}</Text>
                <Text>
                    {this.state.codes.map((item) => (
                        <Text style={item.state ? styles.touch: styles.notTouch}>
                         {item.word}&nbsp;
                        </Text>

                    ))}
                </Text>
                <Text style= {{
                     fontWeight: '500', color: '#527fe4', textAlign: 'center',
                     fontSize: 20,
                }}onPress = {self.next.bind(self)}>Next</Text>

                <Text >{'\n'}</Text>
                <View style={{
                    flex: 1, flexDirection: 'row',justifyContent: 'space-between'
                }}>
                    <Text style={{ padding: 5, backgroundColor: 'powderblue'}}>{this.state.current.word}</Text>
                    <Text style={{ padding: 5, backgroundColor: 'skyblue'}}>{this.state.current.code}</Text>
                </View>

            </View>
        )
    }
}
export class App extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.setState({
            images: []
        });
    }

    handleChange(numbers) {
        let str = numbers + '',
            result = [];
        while (str.length) {
            let code = str.slice(-2)
            result.push(customData[code])
            str = str.slice(0, -2)
        }
        this.setState({
            images: result.reverse().join(' ')
        })

    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView >
                    <Text >{'\n'}</Text>
                    <Text>
                        {this.state.images}
                    </Text>
                    <TextInput keyboardType="numeric" style={{
                        height: 40,
                        borderColor: 'gray',
                        borderWidth: 1
                    }} onChangeText={(text) => this.handleChange(text)} value={this.state.text}/>
                    <Text style={styles.instructions}>
                        0 Н М 1 Г Ж {'\n'}
                        2 Д Т 3 К Х {'\n'}
                        4 Ч Щ 5 Б П {'\n'}
                        6 Ш Л 7 С З {'\n'}
                        8 В Ф 9 Р Ц {'\n'}
                    </Text>

                    <Text >
                        {'\n'}
                    </Text>
                    <Victorina ></Victorina>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
        justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: '#F5FCFF',
    },
    touch: {
        // backgroundColor: '#F5FCFF'
    },
    notTouch: {
        // backgroundColor: 'red',
        color: 'white'
    },
    welcome: {
        textAlign: 'center',
        margin: 10
    },
    word_odd: {
        color: '#333333',
        justifyContent: 'center',
        backgroundColor: 'red'
    },
    word_not_odd: {
        justifyContent: 'center',
        backgroundColor: '#333333',
        color: 'red'
    },
    selected: {
        backgroundColor: 'blue'
    },
    none: {},
    controls: {
        padding: 20
    }
})
