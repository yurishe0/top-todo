export const projectList = [];

export const storage = (() => {
    const addProject = (project) => {
        projectList.push(project);
    }

    const removeProject = (project) => {
        const index = projectList.indexOf(project);
        projectList.splice(index);
    }

    return {
        addProject,
        removeProject,
    }
})();
