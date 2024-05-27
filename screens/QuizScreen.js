import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import questionsData from '../data/questions.json'; // Importerte spørsmål

const QuizScreen = ({ route, navigation }) => {
  const { userName } = route.params;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [result, setResult] = useState(0); // Bruk tilstand for å holde styr på resultatet
  const [feedback, setFeedback] = useState(null); // Tilstand for å holde tilbakemelding
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    setQuestions(getRandomQuestions(questionsData, 5));
  }, []);

  const handleAnswer = (option) => {
    const currentQuestion = questions[currentQuestionIndex];
    
    if (option === currentQuestion.answer) {
      setFeedback('Riktig svar!');
      setResult(prevResult => prevResult + 1); // Oppdater resultatet
    } else {
      setFeedback(`Feil svar. Riktig svar er: ${currentQuestion.answer}`);
    }
    // Gjør det umulig å svare på samme spørsmål flere ganger ved å gjøre det umulig å trykke på knappene
    currentQuestion.options = [];
    

  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setFeedback(null); // Tilbakestill tilbakemelding
    } else {
      navigation.navigate('Result', { userName, result });
    }
  };

  return (
    <View style={styles.container}>
      {questions.length > 0 && (
        <>
          <Text style={styles.question}>
            {questions[currentQuestionIndex].question}
          </Text>
          {questions[currentQuestionIndex].options.map((option, index) => (
            <Button key={index} title={option} onPress={() => handleAnswer(option)} />
          ))}

          {feedback && (
            <View style={styles.feedbackContainer}>
              <Text style={styles.feedbackText}>{feedback}</Text>
              <Button title="Neste spørsmål" onPress={handleNextQuestion} />
            </View>
          )}
        </>
      )}
    </View>
  );
};

const getRandomQuestions = (questions, numQuestions) => {
  const shuffled = questions.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numQuestions);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  question: {
    fontSize: 20,
    marginBottom: 20,
  },
  feedbackContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  feedbackText: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default QuizScreen;
