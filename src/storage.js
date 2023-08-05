export const projectList = [];
export const nodeList = [];

export class Storage {
    static addProject(project) {
        projectList.push(project);
    }

    static removeProject(project) {
        const index = this.findProject(project);
        if(index != -1) {
            projectList.splice(index, 1);
        }
    }

    static addNode(node) {
        nodeList.push(node);
    }

    static removeNode(node) {
        const index = nodeList.findIndex((item) => item.textContent == node.textContent);
        if(index != -1) {
            nodeList.splice(index, 1);
        }
    }

    static findProject(project) {
        const index = projectList.findIndex((item) => item.getName() == project.getName());
        return index;
    }

    static renameProject(project, newName) {
        const index = this.findProject(project);
        projectList[index].setName(newName);
        nodeList[index].firstChild.textContent = newName;
    }
}


