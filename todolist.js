window.addEventListener('load', function () {
    let tab = document.querySelectorAll('.tab >li');
    let prev = 0;
    let content = document.querySelector('.content');
    let type = 'all';
    let flag = {all: 'all', done: 'true', doing: 'false'};
    let todolist = [
        {
            id: 1, content: '滚去学习', ctime: '2019/06/04', status: false
        },
        {
            id: 2, content: '网站作业已交', ctime: '2019/05/31', status: true
        },
        {
            id: 3, content: '水站作业待交', ctime: '2019/06/04', status: false
        },
        {
            id: 4, content: '放假回家', ctime: '2019/06/07', status: false
        }
    ];
    let str = localStorage.getItem('todolist') ? JSON.parse(localStorage.getItem('todolist')) : todolist;
    todolist = str;

    tab.forEach(function (ele, index) {
        ele.onclick = function () {
            tab[prev].classList.remove('hot');
            this.classList.add('hot');
            prev = index;

            type = this.getAttribute('type');
            saveDate();
            render(filterData(type));
        }
    });

    tab[0].onclick();

    /////////////////////////////////修改状态//////////////////////////////////////
    /*
    *  数据-->视图
    * li -->数组元素
    *  复选框-->数据元素status
    * */
    // let checkboxs = document.querySelectorAll('input[type=checkbox]');
    //

    content.onclick = function (e) {
        let arr = [];
        let target = e.target;
        let id = target.parentNode.id;

        if (target.nodeName === 'INPUT') {
            let arr = todolist.filter(ele => ele.id == id)[0];
            arr.status = target.checked;
        } else if (target.nodeName === 'DEL') {
            let index = todolist.findIndex(ele => ele.id == id);
            todolist.splice(index, 1);
            saveDate();
            render(filterData(type));
        }
    };

    /////////////////////////////////添加///////////////////////////////
    let forms = document.forms[0];
    let textBtn = forms.elements[0];
    let submitBtn = forms.elements[1];

    submitBtn.onclick = function (e) {
        e.preventDefault();
        let obj = createObj();
        todolist.push(obj);
        forms.reset();
        render(filterData(type));
        saveDate();
    };

    /////////////////////////////createObj/////////////////////////////////////////////
    function createObj() {
        let id = todolist[todolist.length - 1].id + 1;
        let content = textBtn.value;
        let ctime = new Date().toLocaleDateString();
        let status = false;
        return {id, content, ctime, status}
    }

    ////////////////////////////////////////////////////////////////////
    function filterData(type) {
        let arr = [];
        switch (type) {
            case 'all':
                arr = todolist;
                break;
            case 'done':
                arr = todolist.filter(function (ele) {
                    return ele.status
                });
                break;
            case 'doing':
                arr = todolist.filter(function (ele) {
                    return !ele.status
                });
                // arr = todolist.filter(ele =>!ele.status);
                break;
        }
        return arr;
    }

    // render(todolist);
    //渲染列表
    function render(arr) {
        let html = '';
        arr.forEach(function (elem, index) {
            if (elem.status) {
                html += `
                <li id="${elem.id}">
                    <input type="checkbox" checked>
                      <p>${elem.content}</p> 
                      <del>X</del>
                      <time>${elem.ctime}</time>
                </li>
            `;
            } else {
                html += `
            <li id="${elem.id}">
                <input type="checkbox">  
                <p>${elem.content}</p> 
                <del>X</del>
                <time>${elem.ctime}</time>          
            </li>
            `;
            }
        });
        content.innerHTML = html;
    }

    function saveDate() {
        localStorage.setItem("todolist", JSON.stringify(todolist));
    }
});

