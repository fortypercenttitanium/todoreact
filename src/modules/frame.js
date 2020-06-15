import { formatRelative } from 'date-fns';
import * as DOM from './DOM';
// eslint-disable-next-line import/no-cycle
import { getTodos } from './todosLibrary';
// eslint-disable-next-line import/no-cycle
import modal, { openModal, closeModal } from './newTodoModal';

const title = DOM.newElement('header', 'title');
const newTodo = DOM.newElement('div', 'new-todo');
const todosContainer = DOM.newElement('div', 'container');

title.textContent = 'Todo List';
newTodo.textContent = 'New Todo Item';

const newTodoHandler = () => {
  if (modal.style.display === 'block') {
    closeModal();
  } else {
    openModal();
  }
};

newTodo.addEventListener('click', newTodoHandler);

const renderTodos = () => {
  todosContainer.textContent = ''; // clear the container

  const today = new Date();

  getTodos().forEach((todo) => { // get all todos in library and put them in containers
    const container = DOM.newElement('div', 'todo-container');
    const todoTitle = DOM.newElement('h1', 'todo-title');
    todoTitle.textContent = todo.title;
    const desc = DOM.newElement('p', 'todo-desc');
    desc.textContent = todo.description;
    const due = DOM.newElement('h3', 'todo-due');
    due.textContent = `Due: ${todo.dueDate}`;
    const priority = DOM.newElement('h3', 'todo-priority');
    priority.textContent = `Priority: ${todo.priority}`;
    const created = DOM.newElement('p', 'todo-created');
    created.textContent = `Created: ${formatRelative(todo.created, today)}`;
    const delBtn = todo.removeBtn();
    const doneBtn = todo.toggleDone();

    const appends = [todoTitle, desc, due, priority, created, doneBtn, delBtn];

    appends.forEach((item) => {
      container.appendChild(item);
    });

    if (todo.done) {
      container.childNodes.forEach((child) => {
        if ((!child.classList.contains('done-button')) && (!child.classList.contains('delete-button'))) {
          const node = child;
          node.style.textDecoration = 'line-through';
          node.style.color = 'grey';
        }
      });
    }

    todosContainer.appendChild(container); // render them all
  });
};

export {
  title,
  newTodo,
  todosContainer,
  renderTodos,
};
