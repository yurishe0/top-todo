import { Project } from './project.js';
import { storage } from './storage';

export const createProject = (name) => {
    const project = new Project(name);
    storage.addProject(project);

    const projectList = document.querySelector('#project-list');
    const projectContainer = document.createElement('li');
    const projectName = document.createElement('span');

    const projectEdit = document.createElement('i');
    projectEdit.classList.add("material-icons", "edit-project");
    projectEdit.innerHTML = "edit";

    const projectDelete = document.createElement('i');
    projectDelete.classList.add("material-icons", "delete-project");
    projectDelete.innerHTML = "delete";

    projectContainer.classList.add('project');
    projectName.textContent = project.name;

    projectContainer.appendChild(projectName);
    projectContainer.appendChild(projectEdit);
    projectContainer.appendChild(projectDelete);
    projectList.prepend(projectContainer);

}
