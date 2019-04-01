/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Button } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


interface Props { }
interface State {
  gameState: Array<number>[],
  currentPlayer: number,
}


export default class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      gameState: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ],
      currentPlayer: 1
    }
  }

  //initializes game to an empty board on mount
  conponentDidMount() {
    this.initializeGame();
  }

  //initializes game to an empty board and sets player to X
  initializeGame = () => {
    this.setState({
      gameState:
        [
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0]
        ],
      currentPlayer: 1,
    });
  }

  //finds winner if there is any and returns number representing winner
  getWinner = () => {
    const NUM_TILES: number = 3;
    let arr = this.state.gameState;
    let sum: number;

    //check rows for winner
    for (let i = 0; i < NUM_TILES; i++) {
      sum = arr[i][0] + arr[i][1] + arr[i][2];
      if (sum == 3) { return 1; }
      else if (sum == -3) { return -1; }
    }

    //check columns for winner
    for (let i = 0; i < NUM_TILES; i++) {
      sum = arr[0][i] + arr[1][i] + arr[2][i];
      if (sum == 3) { return 1; }
      else if (sum == -3) { return -1; }
    }

    //check diagonals \
    sum = arr[0][0] + arr[1][1] + arr[2][2];
    if (sum == 3) { return 1; }
    else if (sum == -3) { return -1; }

    //check diagonals /
    sum = arr[2][0] + arr[1][1] + arr[0][2];
    if (sum == 3) { return 1; }
    else if (sum == -3) { return -1; }

    //if no winners
    return 0;
  }

  //button for a new game
  onNewGamePress = () => {
    this.initializeGame();
  }

  /* what happens every press on board:
  gets current player, places icon(X or O)
  checks for winner, resets board */
  
  onTilePress = (row: number, col: number) => {

    //keep tiles from changing
    let value = this.state.gameState[row][col];
    if (value !== 0) { return; }

    //get current player
    let currentPlayer = this.state.currentPlayer;

    //set tile icon on press
    let arr = this.state.gameState.slice();
    arr[row][col] = currentPlayer;
    this.setState({ gameState: arr });

    //switch to other player
    let nextPlayer = (currentPlayer == 1) ? -1 : 1;
    this.setState({ currentPlayer: nextPlayer });

    //check for winner
    let winner = this.getWinner();
    if (winner == 1) {
      Alert.alert("WINNER: PLAYER 1");
      setTimeout(()=> {
        this.initializeGame();
      }, 3000)
    } else if (winner == -1) {
      Alert.alert("WINNER: PLAYER 2");
      setTimeout(()=> {
        this.initializeGame();
      }, 3000)
    }
  }

  //set the icon for the row depending on the current player
  renderIcon = (row: number, col: number) => {
    let value = this.state.gameState[row][col];
    switch (value) {
      case 1: return <Icon name="close" size={60} color="red" />
      case -1: return <Icon name="circle-outline" size={60} color="green" />
      default: return <View />;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ color: 'red', fontSize: 50 }}>TIC</Text><Text style={{ fontSize: 50, color: 'black' }}>-TAC-</Text><Text style={{ fontSize: 50, color: 'green' }}>TOE</Text></View>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => this.onTilePress(0, 0)} style={[styles.tile, { borderLeftWidth: 0, borderTopWidth: 0 }]}>
            {this.renderIcon(0, 0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(0, 1)} style={[styles.tile, { borderTopWidth: 0 }]}>
            {this.renderIcon(0, 1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(0, 2)} style={[styles.tile, { borderTopWidth: 0, borderRightWidth: 0, }]}>
            {this.renderIcon(0, 2)}
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => this.onTilePress(1, 0)} style={[styles.tile, { borderLeftWidth: 0 }]}>
            {this.renderIcon(1, 0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(1, 1)} style={[styles.tile, {}]}>
            {this.renderIcon(1, 1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(1, 2)} style={[styles.tile, { borderRightWidth: 0, }]}>
            {this.renderIcon(1, 2)}
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => this.onTilePress(2, 0)} style={[styles.tile, { borderBottomWidth: 0, borderLeftWidth: 0 }]}>
            {this.renderIcon(2, 0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(2, 1)} style={[styles.tile, { borderBottomWidth: 0 }]}>
            {this.renderIcon(2, 1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(2, 2)} style={[styles.tile, { borderBottomWidth: 0, borderRightWidth: 0 }]}>
            {this.renderIcon(2, 2)}</TouchableOpacity>
        </View>

        <View style={{ paddingTop: 50 }} />
        <Button title="New Game" onPress={() => this.onNewGamePress()}></Button>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  tile: {
    borderWidth: 8,
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontSize: 50,
    paddingBottom: 30,
  }
});
