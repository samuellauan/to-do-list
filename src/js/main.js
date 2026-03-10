// main.js
import { initDragAndDrop } from "./dragdrop.js"
import { toggleMode } from "./theme.js"
import { carregarTasks } from './storage.js';
import { create, renderTasks } from "./crud.js"

const tasks = carregarTasks();

function initApp() {
   toggleMode()
   initDragAndDrop()
   renderTasks(tasks)
   create()
}

document.addEventListener("DOMContentLoaded", () => {
   initApp()
})