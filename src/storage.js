import { UI } from "./UI";
import { Project } from "./project";

export let projectList = [];
export let nodeList = [];

export class Storage {
    static getLocalProjectList() {
        let localProjectList = localStorage.getItem('localProjectList');
        localProjectList = JSON.parse(localProjectList);
        return localProjectList;
    }

    static getLocalNodeList() {
        let localNodeList = localStorage.getItem('localNodeList');
        let newNodeList = [];
        localNodeList = JSON.parse(localNodeList);
        let index = 0;
        localNodeList.forEach((element) => {
            const template = document.createElement('template');
            template.innerHTML = element.trim();
            const listElement = template.content.firstChild;
            const project = new Project(projectList[index].name, projectList[index].list);
            listElement.addEventListener('click', () => {
                UI.loadTodosToPage(project);
                UI.checkSelectedProject();
            })
            const editProject = listElement.querySelector('.edit-project');
            editProject.addEventListener('click', (e) => {
                e.stopPropagation();
                UI.displayPopUp("projectRename", "", project);
                UI.loadProjectsToPage();
            })
            const deleteProject = listElement.querySelector('.delete-project');
            deleteProject.addEventListener('click', (e) => {
                e.stopPropagation();
                Storage.removeProject(project);
                const contentProjectContainer = document.querySelector('.project-container');
                contentProjectContainer.innerHTML = "";
                Storage.removeNode(listElement);
                UI.loadProjectsToPage();
                UI.checkSelectedProject();
            });
            index++;
            newNodeList.push(listElement);
        })
        return newNodeList;
    }

    static setLocalProjectList(projectList) {
        localStorage.setItem("localProjectList", JSON.stringify(projectList));
    }

    static setLocalNodeList(nodeList) {
        let stringNodeList = [];
        nodeList.forEach((node) => {
            stringNodeList.push(node.outerHTML);
        });
        localStorage.setItem("localNodeList", JSON.stringify(stringNodeList));
    }

    static addProject(project) {
        projectList.push(project);
        this.setLocalProjectList(projectList);
    }

    static removeProject(project) {
        const index = this.findProject(project);
        if(index != -1) {
            projectList.splice(index, 1);
        }
        this.setLocalProjectList(projectList);
    }

    static removeTodo(todo, project) {
        const todoIndex = this.findTodo(todo, project);
        project.list.splice(todoIndex, 1);
        this.setLocalProjectList(projectList);
    }

    static addNode(node) {
        nodeList.push(node);
        this.setLocalNodeList(nodeList);
    }

    static removeNode(node) {
        const index = nodeList.findIndex((item) => item.textContent == node.textContent);
        if(index != -1) {
            nodeList.splice(index, 1);
        }
        this.setLocalNodeList(nodeList);
    }

    static findProject(project) {
        const index = projectList.findIndex((item) => item.name == project.name);
        return index;
    }

    static findTodo(todo, project) {
        const index = project.list.findIndex((item) => item.title == todo.title);
        return index;
    }

    static renameProject(project, newName) {
        let nameExists;
        if(newName == '') {
            UI.displayPopUp("errorCreation", "The new name must not be empty.");
            return;
        }
        projectList.forEach((item) => {
            if(item.name == newName) {
                nameExists = true;
                UI.displayPopUp("errorCreation", "A project under this name already exists.");
                return;
            }
        })
        if(!nameExists) {
            const index = this.findProject(project);
            projectList[index].name = newName;
            nodeList[index].firstChild.textContent = newName;
            this.setLocalProjectList(projectList);
            this.setLocalNodeList(nodeList);
        }
    }

    static editTodo(todo, project, newName, newDescription, newDate, newPriority) {
        let nameExists;
        let index = project.list.findIndex((todo) => todo.title == newName);
        if(index != -1) {
            UI.displayPopUp("errorCreation", "A todo under this name already exists.");
            nameExists = true;
        }
        if(newName == '') {
            UI.displayPopUp("errorCreation", "The todo name must not be empty.");
            return;
        }
        if(!nameExists) {
            const todoIndex = this.findTodo(todo, project);
            project.list[todoIndex].title = newName;
            project.list[todoIndex].description = newDescription;
            project.list[todoIndex].dueDate = newDate;
            project.list[todoIndex].priority = newPriority;
            this.setLocalProjectList(projectList);
            return;
        }
    }
}


document.addEventListener("DOMContentLoaded", () => {
    if(!localStorage.localProjectList) {
        localStorage.localProjectList = [];
        localStorage.localNodeList = [];
    } else {
        projectList = Storage.getLocalProjectList();
        nodeList = Storage.getLocalNodeList();
    }
    UI.loadProjectsToPage();
});


