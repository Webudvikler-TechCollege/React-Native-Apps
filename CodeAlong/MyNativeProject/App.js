import { useState } from 'react';
import { Pressable, TextInput, FlatList, Image, StyleSheet, Text, View } from 'react-native';

const arrData = [
  { id: 1, title: 'Item 1' },
  { id: 2, title: 'Item 2' },
  { id: 3, title: 'Item 3' }
]

const ListItem = props => {
  return (
    <View style={styles.listitem}>
      <Text style={styles.listitemtxt}>{props.title}</Text>
    </View>
  )
}

export default function App() {
  // State var til input tekst 
  const [ enteredTaskText, setEnteredTaskText ] = useState()
  // State var til task liste (array)
  const [ taskList, setTaskList ] = useState([])

  // Handler som sætter input tekst var når der skrives i feltet
  const taskTextHandler = enteredTaskText => {
    setEnteredTaskText(enteredTaskText)
  }

  // Handler som tilføjer tekst til array af tasks
  const addTaskHandler = () => {
    setTaskList(curTasks => [
      // Spreader nuværende liste
      ...curTasks, 
      // Tilføjer id og tekst til nuværende liste
      { id: Math.random().toString(), title: enteredTaskText }
    ])
    // Nulstiller input tekst
    setEnteredTaskText('')
  }

  // Handler til at slette task med
  const deleteTaskHandler = id => {
    // Sætter liste til sig selv uden id der skal slettes
    setTaskList(taskList.filter(task => task.id !== id))
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headline}>ToDoList</Text>
        <Image source={require('./assets/hlogo.png')} style={styles.logo}></Image>
      </View>
      <View style={styles.main}>
        <View style={styles.formContainer}>
          <TextInput
            placeholder='Indtast opgave'
            style={styles.textinput} 
            onChangeText={taskTextHandler} 
            value={enteredTaskText}
          ></TextInput>
          <Pressable style={styles.button} onPress={addTaskHandler}>
            <Text style={styles.buttonText}>+</Text>
          </Pressable>

        </View>
        <FlatList data={taskList} renderItem={itemData => {
          return (
            <Pressable onPress={e => deleteTaskHandler(itemData.item.id)}>
              <ListItem title={itemData.item.title}></ListItem>
            </Pressable>
            )
        }}>
        </FlatList>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 0,
    paddingVertical: 0,
    backgroundColor: '#fff',
    borderWidth: 5,
    borderColor: 'black'
  },
  header: {
    backgroundColor: 'darkcyan',
    paddingTop: 70,
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headline: {
    fontSize: 25,
    color: 'black',
    fontWeight: 'bold',
  },
  logo: {
    width: 50,
    height: 50
  }, 
  main: {
    height: 500,
    padding: 20
  },
  listitem: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 6,
    backgroundColor: 'teal',
    paddingHorizontal: 8,
    paddingVertical: 15,
    marginBottom: 5,
  },
  listitemtxt: {
    color: 'white',
    fontWeight: 'bold'

  },
  formContainer: {
    flexDirection: 'row',
    paddingBottom: 15,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: 'black',
    justifyContent: 'space-between'
  },
  textinput: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 6,
    width: '84%',
    padding: 10
  },
  button: {
    borderWidth: 1,
    borderColor: 'black',
    paddingHorizontal: 8,
    borderRadius: 5,
    backgroundColor: 'darkgoldenrod',
    width: 50,
    alignContent: 'center'
  },
  buttonText: {
    padding: 10, 
    fontSize: 20
  }
});
