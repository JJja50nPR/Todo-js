
// CSS
import './css/componentes.css';
import './styles.css';

// JS
import { Todo, TodoList } from './classes';
import { crearTodoHtml } from './js/componentes';


export const todoList = new TodoList;

todoList.todos.forEach( crearTodoHtml );

