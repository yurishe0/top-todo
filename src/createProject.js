import { Project } from './project.js';
import { Storage } from './storage.js';
import { UI } from './UI.js';

export const createProject = (name) => {
    const project = new Project(name);
    Storage.addProject(project);

    UI.addProjectToPage(project);
}
