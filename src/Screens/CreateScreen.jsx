/* eslint-disable react-native/no-inline-styles */
import { useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const CreateScreen = ({ data, setItemsData }) => {
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [editItemId, setEditItemId] = useState(null);
  const handlerAddItem = () => {
    const newDataItem = {
      id: Date.now(),
      name: itemName,
      stock: Number(quantity),
      unit: 'Kg',
    };
    setItemsData([...data, newDataItem]);
    setItemName('');
    setQuantity('');
    setIsEdit(false);
  };
  const handleDelete = id => {
    setItemsData(data.filter(item => item.id !== id));
  };
  const handleEdit = item => {
    setIsEdit(true);
    setEditItemId(item.id);
    setItemName(item.name);
    setQuantity(item.stock);
  };

  const updateItemHandler = () => {
    setItemsData(
      data.map(item =>
        item.id === editItemId
          ? { ...item, name: itemName, stock: Number(quantity) }
          : item,
      ),
    );
    setEditItemId(null);
    setItemName('');
    setQuantity('');
    setIsEdit(false);
  };
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter an Item Name"
        placeholderTextColor={'#3333333'}
        style={styles.input}
        value={itemName}
        onChangeText={item => setItemName(item)}
      />
      <TextInput
        placeholder="Enter a Quantity"
        placeholderTextColor={'#3333333'}
        style={styles.input}
        value={quantity}
        onChangeText={item => setQuantity(item)}
      />
      <Pressable
        style={styles.button}
        onPress={() => (isEdit ? updateItemHandler() : handlerAddItem())}
      >
        <Text style={styles.buttonText}>
          {isEdit ? 'Edit Item' : 'Add Item'}
        </Text>
      </Pressable>

      <View style={{ marginTop: 20 }}>
        <View style={styles.headingContainer}>
          <Text style={styles.headingText}>All Items</Text>
        </View>
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View
              style={[
                styles.itemContainer,
                { backgroundColor: item.stock < 5 ? '#FFD7D7' : '#D7FFD7' },
              ]}
            >
              <Text style={styles.itemText}>{item.name}</Text>
              <View style={styles.buttonContainer}>
                <Text style={styles.itemText}> {item.stock}</Text>
                <Pressable onPress={() => handleEdit(item)}>
                  <Text style={styles.itemText}>Edit</Text>
                </Pressable>

                <Pressable onPress={() => handleDelete(item.id)}>
                  <Text style={styles.itemText}> Delete</Text>
                </Pressable>
              </View>
            </View>
          )}
          contentContainerStyle={{ gap: 20 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVartical: '4%',
    gap: 10,
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#72C37AFF',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#72C37AFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#72C37AFF',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  headingText: {
    fontWeight: 'bold',
    marginVertical: 10,
    fontSize: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
  },
  itemText: {
    fontSize: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 20,
  },
});

export default CreateScreen;
