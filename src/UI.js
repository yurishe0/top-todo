import { projectListContainer } from './DOM.js';
import { storage } from './storage.js';

export class UI  {
    static addProjectToPage(project) {
        const projectContainer = document.createElement('li');
        const projectName = document.createElement('span');

        const projectEdit = document.createElement('i');
        projectEdit.classList.add("material-icons", "edit-project");
        projectEdit.innerHTML = "edit";

        const projectDelete = document.createElement('i');
        projectDelete.classList.add("material-icons", "delete-project");
        projectDelete.innerHTML = "delete";

        projectDelete.addEventListener('click', () => {
            storage.removeProject(project);
        });

        projectContainer.classList.add('project');
        projectName.textContent = project.name;

        projectContainer.appendChild(projectName);
        projectContainer.appendChild(projectEdit);
        projectContainer.appendChild(projectDelete);
        projectListContainer.prepend(projectContainer);
    }
}

