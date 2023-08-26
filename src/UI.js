import { projectListContainer, body, siteContainer, projectContainer, contentContainer } from './DOM.js';
import { createProject } from './createProject.js';
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
                todoContent.classList.add('todo-content');
                actionContainer.classList.add('action-container');
                todoTitle.textContent = item.title;
                todoDate.classList.add('todo-date')
                todoDate.textContent = item.dueDate;
                todoDescription.textContent = item.description;

                const todoEdit = document.createElement('i');
                todoEdit.classList.add("material-icons", "edit-todo");
                todoEdit.innerHTML = "edit";

                const todoDelete = document.createElement('i');
                todoDelete.classList.add("material-icons", "delete-todo");
                todoDelete.innerHTML = "delete";

                const todoCheck = document.createElement('input');
                todoCheck.setAttribute("type", "checkbox");

                actionContainer.append(todoCheck, todoEdit, todoDelete);

                todoHeader.append(todoTitle, todoDate);
                todoContent.append(todoDescription, actionContainer);
                todoContainer.append(todoHeader, todoContent);
                nodes.push(todoContainer);
            });
        return nodes;
    }

    static displayPopUp(popUpType, message, project) {
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

                const date = document.createElement('input');
                date.setAttribute('type', 'date');

                const priority = document.createElement('input');
                priority.setAttribute('type', 'number');

                submitButton.addEventListener('click', () => {
                    project.addTodo(new Todo(input.value, description.value, date.value, priority.value));
                    this.loadTodosToPage(project);
                });
                buttonContainer.append(submitButton);
                popUpContainer.append(header, input, description, date, priority, buttonContainer);
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

