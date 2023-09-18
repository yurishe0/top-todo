import { Storage } from "./storage";
import { projectList } from "./storage";

export class Project {
    constructor(name) {
        this.name = name;
        this.list = [];
    }

    getName() {
        return this.name;
    }

    setName(newName) {
        this.name = newName;
    }

    addTodo(todo) {
        this.list.push(todo);
        Storage.setLocalProjectList(projectList);
    }
}
