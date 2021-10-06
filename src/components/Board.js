import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, Pressable, Dimensions, Text} from 'react-native';
import {shuffleArray} from '../helper';
import Card from './Card';
import Counter from './Counter';

const BoardHeight = Dimensions.get('window').width;
const BoardWidth = Dimensions.get('window').width;
const GridSize = 4;
const data = shuffleArray([
  {name: 'A', id: 'A-1'},
  {name: 'A', id: 'A-2'},
  {name: 'B', id: 'B-1'},
  {name: 'B', id: 'B-2'},
  {name: 'C', id: 'C-1'},
  {name: 'C', id: 'C-2'},
  {name: 'D', id: 'D-1'},
  {name: 'D', id: 'D-2'},
  {name: 'E', id: 'E-1'},
  {name: 'E', id: 'E-2'},
  {name: 'F', id: 'F-1'},
  {name: 'F', id: 'F-2'},
  {name: 'G', id: 'G-1'},
  {name: 'G', id: 'G-2'},
  {name: 'H', id: 'H-1'},
  {name: 'H', id: 'H-2'},
]);

const Board = () => {
  const [cards, setCards] = useState(data);
  const [activeCards, setActiveCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const timeout = useRef(null);

  useEffect(() => {
    if (activeCards.length === 1) {
      setAttempts(a => a + 1);
    }
    if (activeCards.length === 2) {
      const card1 = cards.find(card => card.id === activeCards[0]);
      const card2 = cards.find(card => card.id === activeCards[1]);
      if (card1.name === card2.name) {
        setMatchedCards(m => [...m, card1.id, card2.id]);
      }
      timeout.current = setTimeout(() => {
        setActiveCards([]);
      }, 1000);
    }
    return () => !!timeout?.current && clearTimeout(timeout.current);
  }, [cards, activeCards]);

  const handlePress = id => {
    if (activeCards.length === 0) {
      setActiveCards([...activeCards, id]);
    }
    if (activeCards.length === 1) {
      setActiveCards([...activeCards, id]);
    }
  };

  const handleRestart = () => {
    setCards(shuffleArray(data));
    setMatchedCards([]);
    setAttempts(0);
    setActiveCards([]);
  };

  return (
    <View>
      <View style={styles.counterContainer}>
        <Counter title="Attempts" count={attempts} />
        <Counter title="Matches" count={matchedCards.length / 2} />
      </View>
      <View style={styles.cardsContainer}>
        {cards.map(item => {
          const isActive = activeCards.includes(item.id);
          const isMatched = matchedCards.includes(item.id);
          return (
            <Pressable
              disabled={isActive || isMatched}
              key={item.id}
              style={styles.card}
              onPress={() => handlePress(item.id)}>
              <Card
                alphapet={item.name}
                isActive={isActive}
                isMatched={isMatched}
              />
            </Pressable>
          );
        })}
      </View>
      {matchedCards.length === cards.length && (
        <Text style={styles.resultText}>
          You completed in {attempts} attempts
        </Text>
      )}
      <Pressable onPress={handleRestart} style={styles.restartButton}>
        <Text style={styles.restartText}>Restart</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  counterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  cardsContainer: {
    width: BoardHeight,
    height: BoardWidth,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  card: {
    borderWidth: 1,
    width: BoardWidth / GridSize,
    height: BoardHeight / GridSize,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultText: {
    textAlign: 'center',
    fontSize: 32,
    color: 'black',
  },
  restartButton: {
    alignSelf: 'center',
    width: 200,
    height: 64,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginTop: 10,
  },
  restartText: {textAlign: 'center', fontSize: 24, color: 'white'},
});

export default Board;
