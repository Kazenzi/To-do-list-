import React from 'react';
import { IonItem, IonCheckbox, IonLabel, IonButton, IonIcon } from '@ionic/react';
import { trash } from 'ionicons/icons'; // Import the trash icon

// Define the Todo interface (can be imported from a common types file if needed)
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// Define props interface for TodoItem
interface TodoItemProps {
  todo: Todo;
  toggleComplete: (id: number) => void;
  deleteTodo: (id: number) => void;
}

/**
 * TodoItem component for displaying a single to-do item.
 * It includes a checkbox to toggle completion and a button to delete.
 *
 * @param {Object} props - The component props.
 * @param {Todo} props.todo - The todo object to display.
 * @param {(id: number) => void} props.toggleComplete - Function to toggle todo completion.
 * @param {(id: number) => void} props.deleteTodo - Function to delete the todo.
 */
const TodoItem: React.FC<TodoItemProps> = ({ todo, toggleComplete, deleteTodo }) => {
  return (
    <IonItem> {/* IonItem replaces <li> for mobile-friendly list items */}
      <IonCheckbox
        slot="start" // Positions the checkbox at the start of the item
        checked={todo.completed}
        onIonChange={() => toggleComplete(todo.id)} // Use onIonChange for Ionic checkboxes
      />
      <IonLabel className={todo.completed ? 'completed-text' : ''}> {/* Apply class for line-through (defined in App.css) */}
        {todo.text}
      </IonLabel>
      <IonButton
        color="danger" // Ionic's built-in danger color for delete actions
        slot="end" // Positions the button at the end of the item
        onClick={() => deleteTodo(todo.id)}
        className="delete-button" // Custom class for additional styling (defined in App.css)
      >
        <IonIcon icon={trash} /> {/* Display a trash icon from Ionicons */}
      </IonButton>
    </IonItem>
  );
};

export default TodoItem;
