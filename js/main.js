//found element
const form = document.querySelector('#form')
const taskInput = document.querySelector('#taskInput')
const tasksList = document.querySelector('#tasksList')
const emptyList = document.querySelector('#emptyList')



let tasks = []


if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'))
    tasks.forEach((task) => renderTask(task))
}





checkEmptyList()

// добавление задачи
form.addEventListener('submit', addTask)
tasksList.addEventListener('click', deleteTask)
tasksList.addEventListener('click', doneTask)



// function
function addTask(event) {
    // отменяем отправку формы
    event.preventDefault()

    //достаем текст задачи из поля ввода

    const taskText = taskInput.value

    // описываем задачу в ввиде объекта

    const newTask = {
        id: Date.now(),
        text: taskText,
        done: false,
    }




    //добавляем задачи в массив

    tasks.push(newTask)

    saveToLocalStorage()

    renderTask(newTask)

    //очищаем поле ввода и возвращаем на него фокус

    taskInput.value = ''
    taskInput.focus()

    // убираем блок "список дел пуст"


    // if (tasksList.children.length > 1) {
    //     // emptyList.style.display = 'none'
    //     emptyList.classList.add('none')
    // }
    checkEmptyList()

}

function deleteTask(event) {
    //проверка есои клик был не по кнопке удалить

    if (event.target.dataset.action !== 'delete') return;


    //проверяем чтобы клик был на кнопке удалить

    const parentNode = event.target.closest('.list-group-item')

    //id task

    const id = Number(parentNode.id)

    //found index in task massive

    // const index = tasks.findIndex((task) => task.id === id)


    //delete from massive

    // tasks.splice(index, 1)

    //delet task from filter massive

    tasks = tasks.filter((task) => {
        // if (task.id === id) {
        //     return false
        // } else {
        //     return true
        // }
        return task.id !== id
    })

    saveToLocalStorage()


    //delete task in html
    parentNode.remove()

    //proverka

    // if (tasksList.children.length === 1) {
    //     emptyList.classList.remove('none')
    // }
    checkEmptyList()
}


function doneTask(event) {
    //проверка если клик  не по кнопке задача выполнена
    if (event.target.dataset.action !== 'done') return;

    //проверка клика на кнопке задача выполнена
    const parentNode = event.target.closest('.list-group-item')


    const id = Number(parentNode.id)
    const task = tasks.find((task) => task.id === id)
    task.done = !task.done

    saveToLocalStorage()


    const taskTitle = parentNode.querySelector('.task-title')
    taskTitle.classList.toggle('task-title--done')

}


function checkEmptyList() {
    if (tasks.length === 0) {
        const emptyListHTML = `<li id="emptyList" class="list-group-item empty-list">
        <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
        <div class="empty-list__title">Список дел пуст</div>
    </li>`
        tasksList.insertAdjacentHTML('afterbegin', emptyListHTML)
    }

    if (tasks.length > 0) {
        const emptyListEl = document.querySelector('#emptyList')
        emptyListEl ? emptyListEl.remove() : null
    }

}

function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}


function renderTask(task) {
    //form css class

    const cssClass = task.done ? 'task-title task-title--done' : 'task-title'

    // формируем разметку для новой задачи

    const taskHTML = `
                 <li id = "${task.id}" class="list-group-item d-flex justify-content-between task-item">
                     <span class="${cssClass}">${task.text}</span>
                     <div class="task-item__buttons">
                         <button type="button" data-action="done" class="btn-action">
                             <img src="./img/tick.svg" alt="Done" width="18" height="18">
                         </button>
                         <button type="button" data-action="delete" class="btn-action">
                             <img src="./img/cross.svg" alt="Done" width="18" height="18">
                         </button>
                     </div>
                 </li>`;


    // добавляем задачу на страницу

    tasksList.insertAdjacentHTML('beforeend', taskHTML)

}