import { Project } from './project.js';
import { storage } from './storage';

export const createProject = (name) => {
    const project = new Project(name);
    storage.addProject(project);

    const projectList = document.querySelector('#project-list');
    const projectContainer = document.createElement('li');
    const projectName = document.createElement('span');

    projectContainer.classList.add('project');
    projectName.textContent = project.name;

    projectContainer.appendChild(projectName);
    projectList.prepend(projectContainer);

}
