export const projectList = [];
export const nodeList = [];

export class Storage {
    static addProject(project) {
        projectList.push(project);
    }


    static removeProject(project) {
        const index = projectList.findIndex((item) => item.getName() == project.getName());
        if(index != -1) {
            projectList.splice(index, 1);
            console.log(projectList);
        }
    }

    static addNode(node) {
        nodeList.push(node);
        console.log("Node added. Node list status: ");
        console.log(nodeList);
    }

    static removeNode(node) {
        const index = nodeList.findIndex((item) => item.textContent == node.textContent);
        if(index != -1) {
            nodeList.splice(index, 1);
            console.log(nodeList);
        }
    }
}


