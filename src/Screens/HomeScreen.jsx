/* eslint-disable react-native/no-inline-styles */
import { useState } from 'react';
import { Pressable, Text } from 'react-native';
import { StyleSheet, View } from 'react-native';
import AllItems from './AllItems';
import CretaeScreen from './CreateScreen';

const data = [
  {
    id: 1,
    name: 'Rice',
    stock: 5,
    unit: 'Kg',
  },
  {
    id: 2,
    name: 'Sugar',
    stock: 10,
    unit: 'Kg',
  },
  {
    id: 3,
    name: 'Salt',
    stock: 2,
    unit: 'Kg',
  },
  {
    id: 4,
    name: 'Flour',
    stock: 0,
    unit: 'Kg',
  },
];

const HomeScreen = () => {
  const [view, setView] = useState(0);
  const [itemsData, setItemsData] = useState(data);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <View style={styles.buttonContainer}>
        <Pressable
          style={[
            styles.button,
            view === 0 ? { backgroundColor: '#72C37AFF' } : null,
          ]}
          onPress={() => setView(0)}
        >
          <Text
            style={[styles.btnText, view === 0 ? { color: 'white' } : null]}
          >
            All Items
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.button,
            view === 1 ? { backgroundColor: '#72C37AFF' } : null,
          ]}
          onPress={() => setView(1)}
        >
          <Text
            style={[styles.btnText, view === 1 ? { color: 'white' } : null]}
          >
            Low Stock
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.button,
            view === 2 ? { backgroundColor: '#72C37AFF' } : null,
          ]}
          onPress={() => setView(2)}
        >
          <Text
            style={[styles.btnText, view === 2 ? { color: 'white' } : null]}
          >
            Create Item
          </Text>
        </Pressable>
      </View>
      {view === 0 && <AllItems data={itemsData} />}
      {view === 1 && <AllItems data={itemsData.filter(item => item.stock < 5)} />}
      {view === 2 && <CretaeScreen data={itemsData} setItemsData={setItemsData} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    padding: '4%',
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  button: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 50,
    borderWidth: 0.5,
    borderColor: '#333',
  },
  btnText: {
    color: '#72C37AFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default HomeScreen;
