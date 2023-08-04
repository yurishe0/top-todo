import { Project } from './project.js';
import { Storage, projectList } from './storage.js';
import { UI } from './UI.js';

export const createProject = (name) => {
    let nameExists;

    projectList.forEach(project => {
        if(project.name == name) {
            UI.displayPopUp("errorCreation", "The project under this name already exists.");
            nameExists = true;
        }
    })
    if(name == '') {
        UI.displayPopUp("errorCreation", "The project name must not be empty.");
        return;
    }
    if(!nameExists) {
        const project = new Project(name);
        Storage.addProject(project);
        UI.addProjectToPage(project);
        return;
    }
}
