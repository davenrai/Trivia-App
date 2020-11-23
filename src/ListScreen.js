import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native'
import axios from 'axios'
import {colors} from "./utils/index"

const { BLUE, ORANGE, GREEN, GREY } = colors

export default function ListScreen({ navigation }) {
    const [triviaQuestions, setTriviaQuestions] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(true)
        loadTriviaQuestions();
    }, [])

    const loadTriviaQuestions = async () => {
        setTriviaQuestions([])

        try {
            let URL = 'https://opentdb.com/api.php?amount=10'
            const response = await axios.get(URL)
            const data = await response.data.results

            setTriviaQuestions(data)
            setIsLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    const cleanData = (type, text) => {
        if (type === 'correct' || type === 'question') {
            return text
                .replace(/&quot;/g, '"')
                .replace(/&#039;/g, '\'')
                .replace(/&ldquo;/g, '“')
                .replace(/&rdquo;/g, '”')
                .replace(/&eacute;/g, 'é')
                .replace(/&deg;/g, '°')
        }
        else {
            for (let i; i < text.length; i++) {
                text[i]
                    .replace(/&quot;/g, '"')
                    .replace(/&#039;/g, '\'')
                    .replace(/&ldquo;/g, '“')
                    .replace(/&rdquo;/g, '”')
                    .replace(/&eacute;/g, 'é')
                    .replace(/&deg;/g, '°')
            }
            return text
        }

    }

    if (!isLoading) {
        return (
            <View style={[styles.listContainer, styles.grey, { marginBottom: 10 }]}>
                <ScrollView>
                    <Text style={styles.questionTitle}>Easy Questions</Text>
                    {
                        (triviaQuestions.filter((q) => q.difficulty == 'easy')).map((question, i) =>
                            <TouchableOpacity key={i} title="Go to Question" onPress={() =>
                                navigation.navigate('Question',
                                    {
                                        key: i,
                                        correct: cleanData('correct', question.correct_answer),
                                        incorrect: cleanData('incorrect', question.incorrect_answers),
                                        question: cleanData('question', question.question),
                                        type: question.type
                                    })}
                            >
                                <View key={i} style={[styles.categoryBox, styles.green]}>
                                    <Text style={styles.categoryText}>{question.category}</Text>
                                </View>
                            </TouchableOpacity>)
                    }
                    <Text style={styles.questionTitle}>Medium Questions</Text>
                    {
                        (
                            triviaQuestions.filter((q) =>
                                q.difficulty == 'medium')).map((question, i) =>
                                    <TouchableOpacity
                                        key={i}
                                        title="Go to Question"
                                        onPress={() =>
                                            navigation.navigate('Question',
                                                {
                                                    correct: cleanData('correct', question.correct_answer),
                                                    incorrect: cleanData('incorrect', question.incorrect_answers),
                                                    question: cleanData('question', question.question),
                                                    type: question.type
                                                })}>
                                        <View key={i} style={[styles.categoryBox, styles.blue]}>
                                            <Text style={styles.categoryText}>{question.category}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                    }
                    <Text style={styles.questionTitle}>Hard Questions</Text>
                    {
                        (
                            triviaQuestions.filter((q) => q.difficulty == 'hard')).map((question, i) =>
                                <TouchableOpacity
                                    key={i} title="Go to Question"
                                    onPress={() =>
                                        navigation.navigate('Question', {
                                            correct: cleanData('correct', question.correct_answer),
                                            incorrect: cleanData('incorrect', question.incorrect_answers),
                                            question: cleanData('question', question.question),
                                            type: question.type
                                        })}>
                                    <View key={i} style={[styles.categoryBox, styles.orange]}>
                                        <Text style={styles.categoryText}>{question.category}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                    }
                </ScrollView>
            </View>
        )
    }

    else {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <ActivityIndicator size='large' color='#0000ff' />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    listContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    questionTitle: {
        color: 'black',
        fontSize: 25,
        fontWeight: '700',
        textAlign: 'center',
        margin: 5,
    },
    categoryBox: {
        width: 190 * 2,
        height: 70,
        margin: 5,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 2.5,
        alignItems: 'center',
        justifyContent: 'center',
    },

    blue: { borderColor: BLUE },
    green: { borderColor: GREEN },
    orange: { borderColor: ORANGE },
    grey: { backgroundColor: GREY },

    categoryText: {
        fontSize: 16,
        margin: 'auto'
    }
});
