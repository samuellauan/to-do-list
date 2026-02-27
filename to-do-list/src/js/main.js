// main.js
import { initDragAndDrop } from "./dragdrop.js"
import { toggleMode } from "./theme.js"

function initApp() {
   toggleMode()
   initDragAndDrop()
}

document.addEventListener("DOMContentLoaded", () => {
   initApp()
})