import { zhCN } from 'date-fns/locale';
import { Project } from './project.js';
import { Storage } from './storage.js';
import { UI } from './UI.js';

export const createProject = (name) => {
    if(name !== '') {
        const project = new Project(name);
        Storage.addProject(project);
        UI.addProjectToPage(project);
        return;
    }
    UI.displayPopUp("errorCreation", "The project name must not be empty.");
}
