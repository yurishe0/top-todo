export const projectList = [];

export const storage = (() => {
    const addProject = (project) => {
        projectList.push(project);
    }

    const removeProject = (project) => {
        const index = projectList.findIndex((item) => item.getName() == project.getName());
        if(index != -1) {
            projectList.splice(index, 1);
            console.log('Project removed.');
        }
    }

    return {
        addProject,
        removeProject,
    }
})();
