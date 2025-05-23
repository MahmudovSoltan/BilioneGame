import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import React, { useCallback, useState } from 'react'

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
    const [selectedAnswers, setSelectedAnswers] = useState<{ [index: number]: string }>({});
    const [score, setScore] = useState(0);

    const handleSelectAnswer = (questionIndex: number, answer: { text: string; correct: boolean }) => {
        // Əgər artıq cavab verilibsə, heç nə etmə
        if (selectedAnswers.hasOwnProperty(questionIndex)) return;

        if (answer.correct) {
            setScore(prev => prev + 1);
        }

        setSelectedAnswers(prev => ({
            ...prev,
            [questionIndex]: answer.text
        }));
    }

    const renderItem = useCallback(({ item, index }) => {
        const userAnswer = selectedAnswers[index];

        return (
            <View style={styles.questionContainer}>
                <Text style={[styles.answerText, styles.questionText]}>
                    {item.question}
                </Text>
                {item.answers.map((answer, i) => {
                    const isSelected = userAnswer === answer.text;
                    const isCorrect = answer.correct;

                    let backgroundColor = '#007BFF'; // default
                    if (userAnswer) {
                        if (isCorrect) {
                            backgroundColor = 'green';
                        }
                        if (isSelected && !isCorrect) {
                            backgroundColor = 'red';
                        }
                    }

                    return (
                        <TouchableOpacity
                            key={i}
                            style={[styles.button, { backgroundColor }]}
                            onPress={() => handleSelectAnswer(index, answer)}
                            disabled={!!userAnswer}
                        >
                            <Text style={styles.answerText}>{answer.text}</Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        )
    }, [selectedAnswers]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your Score: {score}</Text>
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
        padding: 20,
        backgroundColor: '#F5FCFF',
        marginBottom: 100,
    },
    questionContainer: {
        marginBottom: 20,
    },
    questionText: {
        textDecorationLine: 'underline',
        paddingBottom: 5,
        color: '#000',
        fontWeight: 'bold',
        fontSize: 16,
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
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
});
