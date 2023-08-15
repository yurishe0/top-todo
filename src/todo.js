export class Todo {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
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
}
