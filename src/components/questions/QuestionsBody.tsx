import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import React, { useCallback } from 'react'
const questions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Berlin", correct: false },
            { text: "Paris", correct: true },
            { text: "Rome", correct: false },
            { text: "London", correct: false }
        ]
    },
    {
        question: "What is the capital of Germany?",
        answers: [
            { text: "Berlin", correct: true },
            { text: "Paris", correct: false },
            { text: "Rome", correct: false },
            { text: "London", correct: false }
        ]
    },
    {
        question: "What is the capital of Italy?",
        answers: [
            { text: "Berlin", correct: false },
            { text: "Paris", correct: false },
            { text: "Rome", correct: true },
            { text: "London", correct: false }
        ]
    },
    {
        question: "What is the capital of the UK?",
        answers: [
            { text: "Berlin", correct: false },
            { text: "Paris", correct: false },
            { text: "Rome", correct: false },
            { text: "London", correct: true }
        ]
    },
    {
        question: "What is the capital of Spain?",
        answers: [
            { text: "Berlin", correct: false },
            { text: "Paris", correct: false },
            { text: "Rome", correct: false },
            { text: "Madrid", correct: true }
        ]
    }
]
const QuestionsBody = () => {
    const [selectetdAnswer, setSelectedAnswer] = React.useState({});
    const handleSelectAnswer = (answer: { text: string; correct: boolean }) => {
        // Handle answer selection logic here
        // console.log(answer.correct);
        setSelectedAnswer({
            ...selectetdAnswer,
            [answer.text]: answer.correct
        });
        console.log(selectetdAnswer);
    }
    const renderItem = useCallback(({ item }) => {
        return (
            <View style={styles.questionContainer}>
                <Text style={[styles.answerText, { textDecorationLine: 'underline', paddingBottom: 5, color: '#000', fontWeight: 'bold' }]}>
                    {item.question}
                </Text>
                {item.answers.map((answer: { text: string; correct: boolean }, index: number) => (
                    <TouchableOpacity  key={index} style={styles.button} onPress={() => handleSelectAnswer(answer)}>
                        <Text style={styles.answerText}>
                            {answer.text}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        )
    }, [])
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Your Score
            </Text>

            <FlatList
                data={questions}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
                showsVerticalScrollIndicator={true}

            />

        </View>
    )
}

export default QuestionsBody


const styles = StyleSheet.create({
    container: {
        // flex: 1,
        padding: 20,
        backgroundColor: '#F5FCFF',
        marginBottom: 100,
    },
    questionContainer: {
        marginBottom: 10,
    },
    answerContainer: {
        marginBottom: 100,
    },
    answerText: {
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',

    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        textAlign: 'center',
    },
})