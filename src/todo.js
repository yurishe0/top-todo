export class Todo {
    constructor(title, description, dueDate, priority = 1) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.checked = false;
    }

    getTitle() {
        return this.title;
    }

    getDescription() {
        return this.description;
    }

    getDate() {
        return this.dueDate;
    }

    getPriority() {
        return this.priority;
    }

    checkTodo() {
        if(this.checked == false) {
            this.checked = true;
            return;
        }
        this.checked = false;
    }
}
