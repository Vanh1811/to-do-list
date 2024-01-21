export function toggleTab (clickedTab) {
  const tabs = document.querySelectorAll('.tab')
  const mainTaskList = document.querySelector('.taskList')
  tabs.forEach(function (tab) {
    tab.classList.remove('active')
    mainTaskList.innerHTML = ''
  })

  clickedTab.classList.add('active')

  const projectType = clickedTab.textContent
  showProjectDisplay(projectType)
}

export const todoDisplay = (function () {
  const display = []

  return { display }
})()

export const notesDisplay = (function () {
  const display = []

  return { display }
})()

export function showTaskDisplay () {
  const mainTaskList = document.querySelector('.taskList')

  for (let i = 0; i < todoDisplay.display.length; i++) {
    const div = document.createElement('div')
    div.classList.add('task')

    const title = document.createElement('p')
    title.classList.add('taskTitle')
    title.textContent = todoDisplay.display[i].title
    div.appendChild(title)

    if ('proj' in todoDisplay.display[i]) {
      const projCategory = document.createElement('p')
      projCategory.classList.add('projTitle')
      projCategory.textContent = todoDisplay.display[i].proj
      div.appendChild(projCategory)
      console.log(todoDisplay.display[i].proj)
    }

    const date = document.createElement('p')
    date.classList.add('dueDate')
    date.textContent = todoDisplay.display[i].dueDate
    div.appendChild(date)

    const checkBtn = document.createElement('button')
    checkBtn.classList.add('checkBtn')
    div.appendChild(checkBtn)

    mainTaskList.appendChild(div)
  }
  return mainTaskList
}

export function showProjectDisplay (projectType) {
  for (let i = 0; i < todoDisplay.display.length; i++) {
    if ('proj' in todoDisplay.display[i]) {
      if (todoDisplay.display[i].proj === projectType) {
        const mainTaskList = document.querySelector('.taskList')

        const div = document.createElement('div')
        div.classList.add('task')

        const title = document.createElement('p')
        title.classList.add('taskTitle')
        title.textContent = todoDisplay.display[i].title
        div.appendChild(title)

        const date = document.createElement('p')
        date.classList.add('dueDate')
        date.textContent = todoDisplay.display[i].dueDate
        div.appendChild(date)

        const checkBtn = document.createElement('button')
        checkBtn.classList.add('checkBtn')
        div.appendChild(checkBtn)

        mainTaskList.appendChild(div)
        return mainTaskList
      }
    }
  }
}

export function removeTask (task) {
  const indexToRemove = todoDisplay.display.findIndex(item => item.title === task)

  if (indexToRemove !== -1) {
    todoDisplay.display.splice(indexToRemove, 1)
    showTaskDisplay()
    console.log(todoDisplay.display)
  }
}

export function removeNote (note) {
  const indexToRemove = notesDisplay.display.findIndex(item => item.description === note)

  if (indexToRemove !== -1) {
    notesDisplay.display.splice(indexToRemove, 1)
    showNotesDisplay()
    console.log(notesDisplay.display)
  }
}

let isTaskInfoDisplayed = false

export function showTaskInfo (title, description, dueDate, priority) {
  const div = document.createElement('div')
  div.classList.add('taskInfo')

  const cancelBtn = document.createElement('button')
  cancelBtn.textContent = 'X'
  cancelBtn.classList.add('cancel')
  cancelBtn.addEventListener('click', () => {
    div.remove()
    isTaskInfoDisplayed = false
  })
  div.appendChild(cancelBtn)

  const ptitle = document.createElement('p')
  ptitle.textContent = 'Task : '

  const titleSpan = document.createElement('span')
  titleSpan.textContent = title
  ptitle.appendChild(titleSpan)

  div.appendChild(ptitle)

  const pdesc = document.createElement('p')
  pdesc.textContent = 'Description : '

  const descSpan = document.createElement('span')
  descSpan.textContent = description
  pdesc.appendChild(descSpan)

  div.appendChild(pdesc)

  const pdate = document.createElement('p')
  pdate.textContent = 'Due Date : '

  const dateSpan = document.createElement('span')
  dateSpan.textContent = dueDate
  pdate.appendChild(dateSpan)

  div.appendChild(pdate)

  const ppriority = document.createElement('p')
  ppriority.textContent = 'Priority : '

  const prioritySpan = document.createElement('span')
  prioritySpan.textContent = priority
  ppriority.appendChild(prioritySpan)

  div.appendChild(ppriority)

  return div
}

const taskList = document.querySelector('.taskList')

taskList.addEventListener('click', function (event) {
  if (event.target.classList.contains('task')) {
    const task = event.target
    const taskTitle = task.querySelector('.taskTitle').textContent
    const indexOfTodo = todoDisplay.display.findIndex(item => item.title === taskTitle)
    const targetTask = todoDisplay.display[indexOfTodo]
    console.log(targetTask)
    if (!isTaskInfoDisplayed) {
      const body = document.querySelector('body')
      body.appendChild(showTaskInfo(targetTask.title, targetTask.description, targetTask.dueDate, targetTask.priority))
      isTaskInfoDisplayed = true
    }
  }
})

export function showNotesDisplay () {
  const mainTaskList = document.querySelector('.taskList')
  for (let i = 0; i < notesDisplay.display.length; i++) {
    const noteDisplay = document.createElement('div')
    noteDisplay.classList.add('notesDisplay')

    const cancelBtn = document.createElement('button')
    cancelBtn.classList.add('cancelNotes')
    cancelBtn.textContent = 'X'
    noteDisplay.appendChild(cancelBtn)

    const description = document.createElement('p')
    description.textContent = notesDisplay.display[i].description
    noteDisplay.appendChild(description)

    mainTaskList.appendChild(noteDisplay)
  }
  return mainTaskList
}
