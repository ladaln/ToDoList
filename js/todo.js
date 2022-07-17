"use strict";

const input = document.querySelector('#todoName')//начинаем отслеживать
const addBtn = document.querySelector("#add")//нашли  кнопку
const list = document.querySelector("#list")// нашли наш ul
const doneButton = document.createElement("button")
const deleteButton = document.createElement("button")
const todoName = document.createElement("span")
const todoDate = document.createElement("span")
const divWrapper = document.createElement("div")
const todoAll = document.querySelector("#todo-all");
const todoCompleted = document.querySelector("#todo-completed")
const deleteAll = document.querySelector('.btn--delete')
const deleteLast = document.querySelector("#delete-last");
const showAll = document.querySelector("#show-all--btn");
const showCompleted = document.querySelector("#show-completed--btn");
const search = document.querySelector("#search")

doneButton.className = "button done"
deleteButton.className = "button delete"
todoDate.classList.add("todo-date")
todoName.classList.add("todo-name")
divWrapper.classList.add("list-wrapper")
doneButton.innerText = ""
deleteButton.innerText = "X"

//добавление todo при клике на btn
addBtn.addEventListener("click", (e) => {
	if (input.value) {
		createTodo(input.value)
		input.value = '';
	}
	else alert("You can't add an empty todo. Enter your todo, please :)")

	todoAll.innerText = `All: ${list.childElementCount}`
})

function createLiElement() {
	const li = document.createElement("li")
	li.classList.add("li")
	return li
}

//добавление todo при нажатии Enter
input.addEventListener('keydown', function (e) {
	if (e.keyCode === 13) {
		if (input.value) {
			createTodo(input.value)
			input.value = '';
		}
		else alert("You can't add an empty todo. Enter your todo, please :)")
		todoAll.innerText = `All: ${list.childElementCount}`
	}
})
// функции completed и canceled на listItem 
function canceled(a, b) {
	a.addEventListener("click", () => {
		b.remove()
		todoAll.innerText = `All: ${list.childElementCount}`
		complete()
	})
}

function completed(a, b) {
	a.addEventListener("click", () => {
		b.classList.toggle("active")
		if (a.innerText === "") {
			a.innerText = "✓"
		}
		else a.innerText = "";
		complete()
	})
}
//удаление всех элементов и последнего элементов
deleteAll.addEventListener("click", () => {
	let children = list.childNodes;
	for (let i = children.length - 1; i > 0; i--) {
		list.removeChild(children[i])
	}
	todoAll.innerText = `All: 0`;
	todoCompleted.innerText = `Completed: 0`
})
//удаление всех элементов при нажатии Escape
document.addEventListener("keydown", function (e) {
	if (e.keyCode === 27) {
		let children = list.childNodes;
		for (let i = children.length - 1; i > 0; i--) {
			list.removeChild(children[i])
		}
		todoAll.innerText = `All: 0`;
		todoCompleted.innerText = `Completed: 0`
	}
})

deleteLast.addEventListener("click", () => {
	list.removeChild(list.lastChild)
})
//уменьшение todoall при удалении last todo, completed
deleteLast.addEventListener("click", () => {
	let result = list.childElementCount;
	todoAll.innerText = `All: ${result}`
	complete()
})

//функция для расчета completed todos
function complete() {
	let activeItem = document.querySelectorAll(".active")
	todoCompleted.innerText = `Completed: ${activeItem.length}`
}
//showAll showCompleted
showAll.addEventListener("click", () => {
	for (let item of list.children) {
		item.style.display = ""
	}
})

showCompleted.addEventListener("click", () => {
	let completedItems = Array.from(document.querySelectorAll(".todo-list > li.li")).filter(el => el.className !== "li active")
	for (let item of completedItems) {
		item.style.display = "none"
	}
}
)
//поле поиска search: ищем подстроку внутри строки

document.querySelector("#search").oninput = function () {
	let val = this.value.trim(); //обрезка пробелов
	let searchItems = document.querySelectorAll("li")
	if (val !== "") {
		searchItems.forEach(function (elem) {
			if (elem.innerText.search(val) == -1) {
				elem.classList.add('hide');
			}
			else {
				elem.classList.remove('hide');
			}
		})
	}
	else {
		searchItems.forEach(function (elem) {
			elem.classList.remove('hide');
		})
	}
}

//основная функция для создания todo
function createTodo() {
	const clonedListItem = createLiElement()
	const clonedDoneButton = doneButton.cloneNode(true)//глубокое копирование
	const clonedTodoName = todoName.cloneNode()
	const clonedDivWrapper = divWrapper.cloneNode()
	const clonedTodoDate = todoDate.cloneNode()
	const clonedDeleteButton = deleteButton.cloneNode(true)

	clonedListItem.appendChild(clonedDoneButton)
	clonedTodoName.innerText = input.value
	clonedListItem.appendChild(clonedTodoName)
	clonedDivWrapper.appendChild(clonedDeleteButton)
	clonedTodoDate.innerText = new Date().toLocaleDateString()
	clonedDivWrapper.appendChild(clonedTodoDate)
	clonedListItem.appendChild(clonedDivWrapper)
	list.append(clonedListItem)

	canceled(clonedDeleteButton, clonedListItem);
	completed(clonedDoneButton, clonedListItem);
}
