import { toggleTodoDisplay } from './todo.js'
import { showProjectForm } from './project.js'
import { showTaskDisplay, toggleTab, removeTask, showNotesDisplay, removeNote } from './display.js'
import { showNotesForm } from './notes.js'

document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', function () {
    toggleTab(this)
  })
})

const addButton = document.querySelector('.add')

const todoTab = document.getElementById('todo')

const addProjectBtn = document.querySelector('.projBtn')

const taskList = document.querySelector('.taskList')

const notesTab = document.querySelector('.note')

addButton.addEventListener('click', function () {
  if (notesTab.classList.contains('active')) {
    showNotesForm()
  } else {
    toggleTodoDisplay()
  }
})

todoTab.addEventListener('click', showTaskDisplay)

addProjectBtn.addEventListener('click', showProjectForm)

taskList.addEventListener('click', function (event) {
  if (event.target.classList.contains('checkBtn')) {
    const parent = event.target.parentNode
    const task = parent.querySelector('.taskTitle').textContent
    taskList.innerHTML = ''
    removeTask(task)
  }
})

taskList.addEventListener('click', function (event) {
  if (event.target.classList.contains('cancelNotes')) {
    const parent = event.target.parentNode
    const note = parent.querySelector('p').textContent
    taskList.innerHTML = ''
    removeNote(note)
  }
})

notesTab.addEventListener('click', function (event) {
  showNotesDisplay()
})
