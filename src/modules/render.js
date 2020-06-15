/* eslint-disable import/no-cycle */
import * as DOM from './DOM';
import * as frame from './frame';
import modal from './newTodoModal';
import { updateStorage } from './todosLibrary';

const render = () => {
  updateStorage();

  frame.renderTodos(); // update list of todos

  const renderItems = [frame.title, frame.newTodo, modal, frame.todosContainer];

  renderItems.forEach((item) => { // render them all
    DOM.content.appendChild(item);
  });
};


export default render;
