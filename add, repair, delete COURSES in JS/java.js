var courseApi = 'http://localhost:3000/course';

function start() {
    getCourse(renderCourse)

    handleCreateForm()

}

start();

function getCourse(callback) {
    fetch(courseApi)
        .then(function (result) {
            return result.json()
        })
        .then(callback)
}

function createCourse(data, callback) {
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        body: JSON.stringify(data)
    }
    fetch(courseApi, options)
        .then(function (response) {
            return response.json()
        })
        .then(callback)
}

function renderCourse(course) {
    var listCourse = document.querySelector('.list-course');
    var htmls = course.map(function (course) {
        return `
            <li class = "item-${course.id}" >
                <h4>${course.name}</h4>
                <p>${course.description}</p>
                
                <div style="display:flex;">
                <button onclick = "handleDeleteCourse('${course.id}')">Xóa</button>
                <button onclick = "createRepairBtn('${course.id}')">Sửa</button>
                </div>

            </li>
        `
    })

    listCourse.innerHTML = htmls.join('')
}

function createRepairBtn(id) {
    if (document.querySelector('.create')) {
        document.querySelector('.create').remove()
        document.querySelector('.select-btn').innerHTML = '<button class="repair">Repair</button>'
    }
    
    var repairBtn = document.querySelector('.repair')
    repairBtn.onclick= function () {
        var name = document.querySelector('input[name="name"]').value;
        var description = document.querySelector('input[name="description"]').value;

        var data = {
            name: name ,
            description: description,
        }
        putRepairCourse(id, data, function () {
            getCourse(renderCourse)

        })
    }
}

function putRepairCourse(id , data , callback) {
    var options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        body: JSON.stringify(data)
    }
    fetch(courseApi + '/' + id, options)
        .then(function (response) {
            return response.json()
        })
        .then(callback) 
}

    
function handleDeleteCourse(id) {
    var options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
          },
    }
    fetch(courseApi + '/' + id , options)
        .then(function (response) {
            return response.json()
        })
        .then(function () {
            var del = document.querySelector('.item-' + id)
            if(del) {
                del.remove()
            } 
        })
}

function handleCreateForm() {
    var createBtn = document.querySelector('.create');

    createBtn.onclick = function () {
        var name = document.querySelector('input[name="name"]').value;
        var description = document.querySelector('input[name="description"]').value;

        var data = {
            name: name ,
            description: description,
        }

        createCourse(data , function () {
            getCourse(renderCourse)
        })
    }
}


