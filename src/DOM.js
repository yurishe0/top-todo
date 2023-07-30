import { UI } from "./UI";

export const addProject = document.querySelector("#project-adder");
export const deleteProject = document.querySelector(".delete-project");
export const body = document.querySelector('body');
export const siteContainer = document.querySelector('.site-container');
export const projectListContainer = document.querySelector('#project-list');

(function eventListeners() {
    addProject.addEventListener('click', () => {
        UI.displayPopUp("projectCreation");
    });
})();


