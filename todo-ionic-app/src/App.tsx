import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  setupIonicReact
} from '@ionic/react';

// Import core Ionic CSS files
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

// Import theme variables (usually for global color/font settings)
import './theme/variables.css';

// Import your custom CSS for additional styling
import './App.css';

// Import the child components
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';

// Call setupIonicReact once at the root of your application
setupIonicReact();

// Define the Todo interface for type safety
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

/**
 * The main application component for the To-Do List.
 * Manages the state of the to-do items and renders the form and list.
 */
const App: React.FC = () => {
  // State to store our list of todos
  const [todos, setTodos] = useState<Todo[]>([]);

  /**
   * Adds a new to-do item to the list.
   * Generates a unique ID, sets initial completion status to false.
   * @param {string} text - The text content of the new todo.
   */
  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(), // Simple unique ID (consider UUID for more robust apps)
      text: text,
      completed: false,
    };
    setTodos([...todos, newTodo]); // Add new todo to the existing array (immutably)
  };

  /**
   * Toggles the completion status of a specific to-do item.
   * @param {number} id - The ID of the todo item to toggle.
   */
  const toggleComplete = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo // Create a new object for the updated todo
      )
    );
  };

  /**
   * Deletes a specific to-do item from the list.
   * @param {number} id - The ID of the todo item to delete.
   */
  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id)); // Filter out the todo to be deleted
  };

  return (
    <IonPage> {/* Main page container for Ionic */}
      <IonHeader> {/* Header bar at the top of the page */}
        <IonToolbar> {/* Toolbar within the header */}
          <IonTitle>My To-Do List</IonTitle> {/* Title of the app */}
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding"> {/* Main content area, fills screen, adds padding */}
        {/* Component for adding new todos, passing the addTodo function */}
        <TodoForm addTodo={addTodo} />

        {/* List container for displaying todos */}
        <IonList>
          {todos.length === 0 ? (
            // Display message if no tasks are present
            <IonItem lines="none">
              <IonLabel className="no-tasks-message">No tasks yet. Add some!</IonLabel>
            </IonItem>
          ) : (
            // Map over the todos array and render a TodoItem for each
            todos.map((todo) => (
              <TodoItem
                key={todo.id} // Essential for React list rendering performance and stability
                todo={todo}
                toggleComplete={toggleComplete}
                deleteTodo={deleteTodo}
              />
            ))
          )}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default App;
