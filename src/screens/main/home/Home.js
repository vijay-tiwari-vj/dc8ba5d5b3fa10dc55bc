import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Text, StyleSheet, TouchableOpacity, Image, View, StatusBar } from "react-native";
import { Content, Input, Item } from "native-base";

import Button from "../../../components/button";

import Toast from "../../../utils/Toast";
import Validator from "../../../utils/ValidateUtil";

import { asteroidService, randomService } from "../../../services";

import { colors } from "../../../styles";
import { ScrollView } from "react-native-gesture-handler";

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.blueGrey,
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputContainer: {
    borderRadius: 16,
    backgroundColor: colors.white,
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 20,
    width: '80%',
    height: '60%'
  },
  input: {
    marginVertical: 10,
    borderRadius: 16,
  },
  buttonContainer: {
    marginTop: 70
  }
});

function Home({ navigation }) {
  const [isLoadingSubmit, setIsLoadingSubmit] = React.useState();
  const [isLoadingAsteroid, setIsLoadingAsteroid] = React.useState();
  const [asteroid, setAsteroid] = React.useState();

  function handleAsteroidResponse(asteroidData) {
    navigation.navigate('Asteroid', { asteroidData });
  }

  function handleSubmit() {
    if (!Validator.validateFeild(asteroid)) return Toast.warning("please fill the asteroid ID");
    setIsLoadingSubmit(true);
    asteroidService
      .getAsteroid(asteroid)
      .then(handleAsteroidResponse)
      .catch(Toast.error)
      .finally(() => setIsLoadingSubmit(false));
  };

  function handleRandom() {
    setIsLoadingAsteroid(true);
    asteroidService
      .getRandomAsteroid()
      .then(handleAsteroidResponse)
      .catch(Toast.error)
      .finally(() => setIsLoadingAsteroid(false));
  };

  return (
    <View style={styles.root}>
      <StatusBar backgroundColor={colors.secondaryBlue} barStyle='light-content' />

      <View style={styles.inputContainer}>

        <Item rounded style={styles.input} >
          <Input
            placeholder='Enter Asteroid ID'
            placeholderTextColor={colors.warmGrey}
            value={asteroid}
            onChangeText={asteroid => setAsteroid(asteroid)}
          />
        </Item>
        <View style={styles.buttonContainer}>
          <Button isLoading={isLoadingSubmit} onPress={handleSubmit} buttonTitle='SUBMIT' />
        </View>

        <View style={styles.buttonContainer}>
          <Button isLoading={isLoadingAsteroid} onPress={handleRandom} buttonTitle='Random Asteroid' />
        </View>

      </View>

    </View>
  );
}

Home.propTypes = {
  navigation: PropTypes.object,
};

Home.defaultProps = {
  navigation: {},
};

module.exports = Home;
