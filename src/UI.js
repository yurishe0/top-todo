import { projectListContainer, body, siteContainer, projectContainer, contentContainer } from './DOM.js';
import { createProject } from './createProject.js';
import { createTodo } from './createTodo.js';
import { Storage, nodeList } from './storage.js';
import { Todo } from './todo.js';

export class UI  {
    static addProjectToPage(project) {
        const projectContainer = document.createElement('li');
        const projectName = document.createElement('span');

        const projectEdit = document.createElement('i');
        projectEdit.classList.add("material-icons", "edit-project");
        projectEdit.innerHTML = "edit";

        projectEdit.addEventListener('click', () => {
            UI.displayPopUp("projectRename", "", project);
            this.loadProjectsToPage();
        })

        const projectDelete = document.createElement('i');
        projectDelete.classList.add("material-icons", "delete-project");
        projectDelete.innerHTML = "delete";

        projectDelete.addEventListener('click', () => {
            Storage.removeProject(project);
            Storage.removeNode(projectContainer);
            this.loadProjectsToPage();
        });

        projectContainer.classList.add('project');
        projectName.textContent = project.name;
        projectName.addEventListener('click', () => {
            this.loadTodosToPage(project);
        })

        projectContainer.appendChild(projectName);
        projectContainer.appendChild(projectEdit);
        projectContainer.appendChild(projectDelete);
        Storage.addNode(projectContainer);``
        this.loadProjectsToPage();
    }

    static loadProjectsToPage() {
        projectListContainer.innerHTML = '';
        nodeList.forEach((node) => {
            projectListContainer.appendChild(node);
        });
    }

    static loadTodosToPage(project) {
        projectContainer.innerHTML = "";

        const projectInfoContainer = document.createElement('div');
        const todosContainer = document.createElement('div');
        const projectHeader = document.createElement('h2');
        const todoCount = document.createElement('span');

        const addTodoButton = document.createElement('span');
        addTodoButton.textContent = "add_circle";
        addTodoButton.classList.add("material-icons", "add-todo", "md-48");
        addTodoButton.addEventListener('click', () => {
            this.displayPopUp("todoCreation", "", project);
        })

        projectHeader.textContent = project.name;
        todoCount.textContent = `Todo count: ${project.list.length}`;
        projectHeader.appendChild(todoCount);

        projectInfoContainer.classList.add('project-info-container');
        projectInfoContainer.append(projectHeader);
        projectContainer.append(projectInfoContainer);

        todosContainer.classList.add('todos-container');

        const nodes = this.createTodoNodes(project);
        nodes.forEach((node) => {
            todosContainer.appendChild(node);
        });

        projectContainer.appendChild(todosContainer);
        projectContainer.append(addTodoButton);
    }

    static createTodoNodes(project) {
        const nodes = [];
        project.list.forEach((item) => {
            const todoContainer = document.createElement('div');
            const todoHeader = document.createElement('div');
            const todoContent = document.createElement('div');
            const actionContainer = document.createElement('div');
            const todoTitle = document.createElement('h3');
            const todoDate = document.createElement('span');
            const todoDescription = document.createElement('p');

                todoContainer.classList.add('todo-container');
                todoHeader.classList.add('todo-header');
                todoHeader.classList.add(`todo-priority-${item.priority}`);
                todoContent.classList.add('todo-content');
                actionContainer.classList.add('action-container');
                todoTitle.textContent = item.title;
                todoDate.classList.add('todo-date')
                todoDate.textContent = item.dueDate;
                todoDescription.textContent = item.description;

                const todoEdit = document.createElement('i');
                todoEdit.classList.add("material-icons", "edit-todo");
                todoEdit.innerHTML = "edit";
                todoEdit.addEventListener('click', () => {
                    this.displayPopUp("todoEdit", "", project, item);
                });

                const todoDelete = document.createElement('i');
                todoDelete.classList.add("material-icons", "delete-todo");
                todoDelete.innerHTML = "delete";
                todoDelete.addEventListener('click', () => {
                    Storage.removeTodo(item, project);
                    this.loadTodosToPage(project);
                })

                const todoCheck = document.createElement('input');
                todoCheck.setAttribute("type", "checkbox");
                if(item.checked == true) {
                    todoCheck.setAttribute("checked", "true");
                }
                todoCheck.addEventListener('change', () => {
                    item.checkTodo();
                    this.adjustTodoStyling(todoTitle, todoDate, todoDescription, todoHeader, todoContainer, item);
                });

                this.adjustTodoStyling(todoTitle, todoDate, todoDescription, todoHeader, todoContainer, item);

                actionContainer.append(todoCheck, todoEdit, todoDelete);

                todoHeader.append(todoTitle, todoDate);
                todoContent.append(todoDescription, actionContainer);
                todoContainer.append(todoHeader, todoContent);
                nodes.push(todoContainer);
            });
            return nodes;
        }

        static adjustTodoStyling(todoTitle, todoDate, todoDescription, todoHeader, todoContainer, item) {
            if(item.checked == true) {
                todoTitle.style.textDecoration = "line-through";
                todoDate.style.textDecoration = "line-through";
                todoDescription.style.textDecoration = "line-through";
                switch(item.priority){
                    case "1":
                        todoHeader.style.backgroundColor = "rgba(103, 103, 245, 0.4)";
                        break;
                    case "2":
                        todoHeader.style.backgroundColor = "rgba(48, 48, 173, 0.4)"
                        break;
                    case "3":
                        todoHeader.style.backgroundColor = "rgba(29, 29, 143, 0.4)";
                        break;
                }
                todoContainer.style.backgroundColor = "rgba(220, 226, 230, 0.4)";
            }
            else {
                todoTitle.style.textDecoration = "";
                todoDate.style.textDecoration = "";
                todoDescription.style.textDecoration = "";
                switch(item.priority){
                    case "1":
                        todoHeader.style.backgroundColor = "var(--font-secondary)";
                        break;
                    case "2":
                        todoHeader.style.backgroundColor = "rgb(21, 21, 128)"
                        break;
                    case "3":
                        todoHeader.style.backgroundColor = "rgb(3, 3, 63)";
                        break;
                }
                todoContainer.style.backgroundColor = "rgba(220, 226, 230, 1)";
            }
        }

        static displayPopUp(popUpType, message, project, todo) {
            this.dimSite();
            const popUpContainer = document.createElement('div');
            popUpContainer.classList.add('popup-container');

            const header = document.createElement('h2');

            const buttonContainer = document.createElement('div');
            buttonContainer.classList.add('button-container');
            const cancelButton = document.createElement('button');
            cancelButton.textContent = "CANCEL";
            cancelButton.addEventListener('click', this.hidePopUp);
            cancelButton.addEventListener('click', this.undimSite);

            const input = document.createElement('input');
            input.setAttribute('type', 'text');
            const submitButton = document.createElement('button');
            submitButton.textContent = "SUBMIT";
            submitButton.addEventListener('click', this.undimSite);
            submitButton.addEventListener('click', this.hidePopUp);

        switch(popUpType) {
            case "projectCreation":
                header.textContent = "Add Project";
                input.setAttribute('placeholder', 'Enter the project name...');

                submitButton.addEventListener('click', () => {
                    createProject(input.value);
                });
                buttonContainer.append(submitButton);

                popUpContainer.append(header, input, buttonContainer);
                break;
            case "todoCreation":
                header.textContent = "Add Todo";
                input.setAttribute('placeholder', 'Title...');

                const description = document.createElement('input');
                description.setAttribute('placeholder', 'Description...');

                const smallInputHolder = document.createElement('div');
                smallInputHolder.classList.add("small-input-holder");

                const date = document.createElement('input');
                date.setAttribute('type', 'date');

                const priorityContainer = document.createElement('div');
                const priorityLabel = document.createElement('label');
                priorityLabel.setAttribute("for", "priority");
                priorityLabel.textContent = "Priority";
                const priority = document.createElement('input');
                priority.setAttribute('type', 'number');
                priority.setAttribute('value', '1');
                priority.setAttribute('id', 'priority');
                priority.setAttribute('min', "1");
                priority.setAttribute('max', "3");
                priority.addEventListener("keypress", (e) => {
                    e.preventDefault();
                });
                priorityContainer.append(priorityLabel, priority);

                smallInputHolder.append(date, priorityContainer);

                submitButton.addEventListener('click', () => {
                    createTodo(input.value, project, description.value, date.value, priority.value);
                    this.loadTodosToPage(project);
                });
                buttonContainer.append(submitButton);
                popUpContainer.append(header, input, description, smallInputHolder, buttonContainer);
                break;
            case "projectRename":
                header.textContent = "Rename Project";
                input.setAttribute('placeholder', 'Enter the new project name...');

                submitButton.addEventListener('click', () => {
                    Storage.renameProject(project, input.value);
                });

                buttonContainer.append(submitButton);

                popUpContainer.append(header, input, buttonContainer);
                break;
            case "todoEdit":
                header.textContent = "Edit Todo";

                input.setAttribute('placeholder', 'Title...');

                const newDescription = document.createElement('input');
                newDescription.setAttribute('placeholder', 'Description...');

                const newDate = document.createElement('input');
                newDate.setAttribute('type', 'date');

                const newPriority = document.createElement('input');
                newPriority.setAttribute('type', 'number');

                submitButton.addEventListener('click', () => {
                    Storage.editTodo(todo, project, input.value, newDescription.value, newDate.value, newPriority.value);
                    this.loadTodosToPage(project);
                });
                buttonContainer.append(submitButton);
                popUpContainer.append(header, input, newDescription, newDate, newPriority, buttonContainer);
                break;
            case "errorCreation":
                    header.textContent = "Error";
                    const paragraph = document.createElement('p');
                    paragraph.textContent = message;
                    popUpContainer.append(header, paragraph);
                    popUpContainer.classList.add('popup-error');
                    break;
                }

        buttonContainer.append(cancelButton);
        popUpContainer.append(buttonContainer);
        body.appendChild(popUpContainer);
    }


    static hidePopUp() {
        const popUpContainer = document.querySelector('.popup-container');
        popUpContainer.remove();
    }

    static dimSite() {
        siteContainer.classList.add('dim');
    }

    static undimSite() {
        siteContainer.classList.remove('dim');
    }
}

