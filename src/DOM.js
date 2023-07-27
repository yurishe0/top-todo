import { createProject } from "./createProject";

export const addProject = document.querySelector("#project-adder");
export const deleteProject = document.querySelector(".delete-project");

export const projectListContainer = document.querySelector('#project-list');

(function eventListeners() {
    let num = 0;

    addProject.addEventListener('click', () => {
        createProject(num);
        num++;
    });
})();


