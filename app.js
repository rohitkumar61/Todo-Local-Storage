    showTask()
    let inputItem = document.getElementById("addTaskInput")
    let submitButton = document.getElementById('addTaskButton')
    let filterItem = document.getElementById("search-input");



    submitButton.addEventListener('click', addItem)
    filterItem.addEventListener('keyup', filterItems);

    function addItem(e) {
        e.preventDefault()
        console.log('working');
        let addTaskInputValue = inputItem.value;
        let taskObj;
        if (addTaskInputValue.trim()) {
            let task = localStorage.getItem('localTask');
            if (task === null) {
                taskObj = []
            } else {
                taskObj = JSON.parse(task);
                console.log(taskObj);
            }
            taskObj.push({ taskName: addTaskInputValue });
            localStorage.setItem('localTask', JSON.stringify(taskObj))
            addTaskInputValue.value = ""
        }
        showTask()
    }

    function showTask() {

        let task = localStorage.getItem('localTask');
        if (task === null) {
            taskObj = []
        } else {
            taskObj = JSON.parse(task)
        }
        let html = ""
        let taskList = document.getElementById('taskList');
        taskObj.forEach((item, index) => {
            html += `<tr class = 'row'>
            <td>${index+1}</td>
            <td>${item.taskName}</td>
            <td><button onclick = 'deleteItem(${index})'>Delete Task</button></td>
        </tr>`
        });
        taskList.innerHTML = html
    }

    function deleteItem(index) {
        let task = localStorage.getItem('localTask')
        let taskObj = JSON.parse(task);
        if (confirm("Are You Sure")) {
            taskObj.splice(index, 1);
        }
        localStorage.setItem("localTask", JSON.stringify(taskObj))
        showTask()
    }

    function filterItems(e) {
        //convert to lower text
        console.log('hi');
        let storeItem = localStorage.getItem('localTask')
        console.log(storeItem);
        let txt = e.target.value.toLowerCase();
        //get h2
        let items = inputItem.getElementsByTagName("tr");
        console.log(items);
        //convert to an array

        Array.from(items).forEach(function(itemElement) {
            let itemName = itemElement.firstChild.textContent;
            if (itemName.toLowerCase().indexOf(txt) != -1) {
                itemElement.style.display = "block";
            } else {
                itemElement.style.display = "none";
            }
        });
    }