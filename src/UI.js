import { projectListContainer, body, siteContainer } from './DOM.js';
import { createProject } from './createProject.js';
import { Storage, nodeList } from './storage.js';

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
            Storage.removeProject(project);
            Storage.removeNode(projectContainer);
            this.loadProjectsToPage();
        });

        projectContainer.classList.add('project');
        projectName.textContent = project.name;

        projectContainer.appendChild(projectName);
        projectContainer.appendChild(projectEdit);
        projectContainer.appendChild(projectDelete);
        Storage.addNode(projectContainer);``
        this.loadProjectsToPage();
    }

    static loadProjectsToPage() {
        projectListContainer.innerHTML = '';
        nodeList.forEach((node) => {
            projectListContainer.prepend(node);
        });
    }

    static displayPopUp(popUpType, message) {
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

        switch(popUpType) {
            case "projectCreation":
                header.textContent = "Add Project";
                const input = document.createElement('input');
                input.setAttribute('type', 'text');
                input.setAttribute('placeholder', 'Enter the project name...');

                const submitButton = document.createElement('button');
                submitButton.textContent = "SUBMIT";
                submitButton.addEventListener('click', this.undimSite);
                submitButton.addEventListener('click', this.hidePopUp);
                submitButton.addEventListener('click', () => {
                    createProject(input.value);
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

