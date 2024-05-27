// Screen for displaying the result of the quiz and the user's name.

import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const ResultScreen = ({ route, navigation }) => {
    // Henter ut brukernavnet og resultatet fra QuizScreen
    const { userName, result } = route.params;

    return (
        <View style={styles.container}>
        <Text>{userName}, du har fullført quizen!</Text>
        <Text>Du fikk {result} riktige svar.</Text>
        <Text>Lykke til neste gang!</Text>
        <Button title="Gå tilbake til start" onPress={() => navigation.popToTop()} />
        </View>
    );
    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default ResultScreen;

