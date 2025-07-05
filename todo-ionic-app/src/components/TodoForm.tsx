import React, { useState } from 'react';
import { IonItem, IonInput, IonButton } from '@ionic/react';

// Define the Todo interface (can be imported from a common types file if needed)
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// Define props interface for TodoForm
interface TodoFormProps {
  addTodo: (text: string) => void;
}

/**
 * TodoForm component for adding new to-do items.
 * It uses IonInput for text input and IonButton for submission.
 *
 * @param {Object} props - The component props.
 * @param {(text: string) => void} props.addTodo - Function to add a new todo.
 */
const TodoForm: React.FC<TodoFormProps> = ({ addTodo }) => {
  const [inputValue, setInputValue] = useState<string>('');

  /**
   * Handles the form submission.
   * Prevents default form behavior, adds the todo if input is not empty,
   * and clears the input field.
   * @param {React.FormEvent} e - The form event.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior (page reload)
    if (!inputValue.trim()) return; // Don't add empty todos
    addTodo(inputValue);
    setInputValue(''); // Clear the input field
  };

  return (
    <form onSubmit={handleSubmit} className="ion-padding-horizontal">
      <IonItem lines="none"> {/* Use IonItem for consistent styling and layout */}
        <IonInput
          placeholder="Add a new to-do"
          value={inputValue}
          onIonChange={(e) => setInputValue(e.detail.value!)} // Use onIonChange for Ionic inputs
          className="custom-input" // Custom class for additional styling (defined in App.css)
        ></IonInput>
        <IonButton type="submit" slot="end" className="add-button"> {/* slot="end" positions button at the end of the item */}
          Add
        </IonButton>
      </IonItem>
    </form>
  );
};

export default TodoForm;
