// main.js
import { initDragAndDrop } from "./dragdrop.js"
import { toggleMode } from "./theme.js"
import { create } from "./crud.js"

function initApp() {
   toggleMode()
   initDragAndDrop()
   create()
}

document.addEventListener("DOMContentLoaded", () => {
   initApp()
})