import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Text, StyleSheet, TouchableOpacity, Image, View, StatusBar, ScrollView } from "react-native";
import { Content, Input, Item } from "native-base";

import Button from "../../../components/button";

import Toast from "../../../utils/Toast";
import Validator from "../../../utils/ValidateUtil";

import { asteroidService } from "../../../services";

import  { colors } from "../../../styles";

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.palePurple,
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    borderRadius: 16,
    backgroundColor: colors.white,
    padding: 10,
    marginVertical: 10
  },
});

function Asteroid({ navigation }) {
  const [isLoading, setIsLoading] = React.useState();
  const asteroid  = navigation.getParam('asteroidData');
  const { name = '', nasa_jpl_url = '', is_potentially_hazardous_asteroid = false } = asteroid

  return (
    <View style={styles.root}>
      <StatusBar backgroundColor={colors.secondaryBlue } barStyle='light-content' />
      <View style={styles.container}>
        <Text>Name - {name}</Text>
        <Text>Jpl Url - {nasa_jpl_url}</Text>
        <Text>Is Hazardous - {is_potentially_hazardous_asteroid.toString()}</Text>
      </View>
    </View>
  );
}

Asteroid.propTypes = {
  navigation: PropTypes.object,
};

Asteroid.defaultProps = {
  navigation: {},
};

module.exports = Asteroid;
