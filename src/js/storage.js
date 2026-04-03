let tasks = [];

export function carregarTasks() {
    const data = localStorage.getItem('tasks');
    return data ? JSON.parse(data) : []; // Sempre retorna um array, evita erro de undefined
}

export function salvarTasks(tasksParaSalvar) {
    localStorage.setItem('tasks', JSON.stringify(tasksParaSalvar));
}