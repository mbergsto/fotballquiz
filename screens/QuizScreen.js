// Fjern den lokale definisjonen av `questions` inne i komponenten
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import questions from '../data/questions.json'; // Importerte spørsmål

const QuizScreen = ({ route, navigation }) => {
  const { userName } = route.params;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleAnswer = (option) => {
    const currentQuestion = questions[currentQuestionIndex];
    // Du kan legge til mer logikk her for å sjekke om svaret er riktig osv.
    // For eksempel:
    // if (option === currentQuestion.answer) {
    //   console.log("Riktig svar!");
    // } else {
    //   console.log("Feil svar.");
    // }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Her kan du også sende med ytterligere data til ResultScreen, som antall riktige svar
      navigation.navigate('Result', { userName });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>
        {questions[currentQuestionIndex].question}
      </Text>
      {questions[currentQuestionIndex].options.map((option, index) => (
        <Button key={index} title={option} onPress={() => handleAnswer(option)} />
      ))}
    </View>
  );
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
});

export default QuizScreen;
