import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import {colors} from "./utils/index"

const { BLUE, ORANGE, GREEN } = colors

export default function QuestionScreen({ route, navigation }) {
    const [selectedAnswer, setSelectedAnswer] = useState(null)

    const [ansOne, setAnsOne] = useState('white')
    const [ansTwo, setAnsTwo] = useState('white')
    const [ansThree, setAnsThree] = useState('white')
    const [ansFour, setAnsFour] = useState('white')

    const { key, correct, incorrect, question, type } = route.params

    const allAnswers = correct + incorrect
    const indexPairs = { 0: setAnsOne, 1: setAnsTwo, 2: setAnsThree, 3: setAnsFour }



    function shuffleAnswers(array, correct) {
        if (!array.includes(correct) && type == 'multiple') {
            array.push(correct)
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }
        return array
    }
    shuffleAnswers(incorrect, correct)


    const setAnswer = (i) => {
        // change old answer background to white
        setAnsOne('white')
        setAnsTwo('white')
        setAnsThree('white')
        setAnsFour('white')
        if (type === 'multiple') {

            setSelectedAnswer(i)
            let answerIndex = indexPairs[i]

            if (incorrect[i] === correct) {
                // change correct answer to green
                answerIndex(GREEN)
            }
            else {
                // change to incorrect color
                answerIndex(ORANGE)
            }
        }
        else {
            setAnsOne('white')
            setAnsTwo('white')
            if (i === 'True' && correct === 'True') {
                setAnsOne(GREEN)
            }
            else if (i === 'True' && correct !== 'True') {
                setAnsOne(ORANGE)
            }
            else if (i === 'False' && correct === 'False') {
                setAnsTwo(GREEN)
            }
            else {
                setAnsTwo(ORANGE)
            }
        }
    }

    return (
        <View style={styles.container}>
            <View style={{ width: '85%', height: '80%', alignItems: 'center', justifyContent: 'center' }}>
                <View style={styles.questionBox}>
                    <Text style={styles.questionText}>{question}</Text>
                </View>
                {type == 'multiple' ?
                    <View style={{ width: '100%', height: '40%', margin: 20, marginTop: 40, borderRadius: 15, }}>
                        <View style={styles.answerRow}>
                            <TouchableOpacity style={[styles.answerBox, { backgroundColor: ansOne }]} onPress={(e) => setAnswer(0)}>
                                <Text style={styles.answerText}>{incorrect[0]}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity key={1} style={[styles.answerBox, { backgroundColor: ansTwo }]} onPress={(e) => setAnswer(1)}>
                                <Text style={styles.answerText}>{incorrect[1]}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.answerRow}>
                            <TouchableOpacity key={2} style={[styles.answerBox, { backgroundColor: ansThree }]} onPress={(e) => setAnswer(2)}>
                                <Text style={styles.answerText}>{incorrect[2]}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity key={3} style={[styles.answerBox, { backgroundColor: ansFour }]} onPress={(e) => setAnswer(3)}>
                                <Text style={styles.answerText}>{incorrect[3]}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    :
                    <View style={[styles.answerRow, { marginTop: 20 }]}>
                        <TouchableOpacity style={[styles.answerBox, { backgroundColor: ansOne, height: '30%' }]} onPress={(e) => setAnswer('True')}>
                            <Text style={styles.answerText}>True</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.answerBox, { backgroundColor: ansTwo, height: '30%' }]} onPress={(e) => setAnswer('False')}>
                            <Text style={styles.answerText}>False</Text>
                        </TouchableOpacity>
                    </View>
                }

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f3f1',
        alignItems: 'center',
        justifyContent: 'center',
    },
    questionBox: {
        backgroundColor: 'white',
         width: '100%', 
         height: '20%', 
         borderRadius: 15, 
         justifyContent: 'center', 
         padding: 5
    },
    answerContainer: {
        margin: '15%',
        width: '80%',
        height: 150
    },
    answerBox: {
        backgroundColor: 'white',
        width: '46%',
        height: '70%',
        borderRadius: 15,
        justifyContent: 'center',
    },

    questionText: {
        color: BLUE,
        fontSize: 20,
        textAlign: 'center',
        
    },
    answerText: {
        fontSize: 15,
        color: 'black',
        textAlign: 'center',
        flexWrap: 'wrap'
    },
    answerRow: {
        width: '100%',
        height: '50%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 0
    },
});
