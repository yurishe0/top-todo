import { createProject } from './createProject.js';

const addProject = document.querySelector("#project-adder");
const button2 = document.querySelector("#test2");

addProject.addEventListener('click', () => {
    createProject("Test project");
});
