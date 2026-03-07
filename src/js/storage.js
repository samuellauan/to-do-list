let tasks = [];

export function carregarTasks() {
    const data = localStorage.getItem('tasks');

    if (data) {
        tasks = JSON.parse(data);
    }

    return tasks;
}

export function salvarTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}