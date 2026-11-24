const now = new Date();//今日の日時を取得する
const year = now.getFullYear();//年を取り出してyearに入れる。
const month = String(now.getMonth() + 1).padStart(2, '0');//String()：これは()の中身を実行した後に文字列にする。
const day = String(now.getDate()).padStart(2, '0');
const today = `${year}/${month}/${day}`;
document.getElementById('today').textContent = today;//document:html全体を指す。 get取ってくる　Element:要素　By：～を使って
const savedDate = localStorage.getItem('date');
localStorage.setItem('date', today);//localStorage.setItem(保存する名前, 保存する中身);
if (savedDate !== today) {//savedDateの中には前回開いた日付けが保存されているからそれをtodayと比べる
    localStorage.removeItem('tasks');
}

let tasks = [];// 変数tasksに空箱を作る
const saved = localStorage.getItem('tasks'); // 定数saved　に保存していたtasksを入れる
if (saved !== null) {//そのsavedが空でなければ
    tasks = JSON.parse(saved);//savedの中にある文字列を配列にもどす
}

const showTask = (task) => {//showTaskという名前のアロー関数
    const li = document.createElement('li');//1行分の入れ物
    const checkbox = document.createElement('input');//チェックボックス
    checkbox.type = 'checkbox';
    checkbox.className = 'task-checkbox';
    checkbox.checked = task.done;
    const deleteButton = document.createElement('button');
    deleteButton.className = 'deleteButton';
    deleteButton.textContent = "×";
    const span = document.createElement('span');//タスクの文字
    span.className = 'task-text';
    if (task.done) {
        span.classList.add('finished');
    }
    span.textContent = task.text;

    checkbox.addEventListener('change', () => {  //昨日やったaddEventListener　今回はchange { }の中で作った箱は、その中でしか使えない　｛｝の外に作ったため最初は動作しなかった
        span.classList.toggle('finished'); //toggle:クラスの付け外しをする　finishedがついていなければつける、ついていれば外す
        task.done = checkbox.checked;  //   最新の方（チェックボックス）を、古い方（task.done）に書き写す          
        updateCount();
        localStorage.setItem('tasks', JSON.stringify(tasks));
    });
    deleteButton.addEventListener('click', () => {
        li.remove();
        const index = tasks.indexOf(task);//tasks.indexOf(〇〇) → tasks の中で、〇〇が何番目にあるかを教えてくれる
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        updateCount();
    });    

        // ② 組み立てる（入れた順に左から並ぶ）
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteButton);
        document.getElementById('task-list').appendChild(li);//task-listにliを追加
    };



    const updateCount = () => {
        const taskNumber = tasks.length;
        let smallNumber = 0;
        tasks.forEach((task) => {
            if (task.done === true) {
                smallNumber = smallNumber + 1;
            }
        })
        const footerTask = `${smallNumber}/${taskNumber}`;
        document.getElementById('number').textContent = footerTask;

    };

    tasks.forEach((task) => {
        showTask(task);
    });
    updateCount();


    const addTask = () => {
        const taskInput = document.getElementById('task-input').value;
        if (taskInput === '') {//eachがアロー関数のトリガーとなる
            alert(`タスクを入力してください`);
        } else {
            const newTask = { text: taskInput, done: false };   // 新しいタスクは、まだチェックなし 
            showTask(newTask);
            tasks.push(newTask);
            updateCount();

            localStorage.setItem('tasks', JSON.stringify(tasks));
            document.getElementById('task-input').value = '';//入力欄を空にする
        }
    };

    document.getElementById('add-button').addEventListener('click', addTask);

    document.getElementById('task-input').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });



