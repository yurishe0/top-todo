import { Todo } from './todo.js';
import { UI } from './UI.js';

export const createTodo = (name, project, description, date, priority) => {
    let nameExists;
    let index = project.list.findIndex((todo) => todo.title == name);
    if(index != -1) {
        UI.displayPopUp("errorCreation", "A todo under this name already exists.");
        nameExists = true;
    }
    if(name == '') {
        UI.displayPopUp("errorCreation", "The todo name must not be empty.");
        return;
    }
    if(!nameExists) {
        if(description == "") description = "No description...";
        const todo = new Todo(name, description, date, priority)
        project.addTodo(todo);
        UI.loadTodosToPage(project);
        return;
    }
}
