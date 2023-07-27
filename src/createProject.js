import { Project } from './project.js';
import { storage } from './storage.js';
import { UI } from './UI.js';

export const createProject = (name) => {
    const project = new Project(name);
    storage.addProject(project);

    UI.addProjectToPage(project);
}
