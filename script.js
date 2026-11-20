const now   = new Date();//今日の日時を取得する
const year  = now.getFullYear();//年を取り出してyearに入れる。
const month = String(now.getMonth() + 1).padStart(2, '0');//String()：これは{}の中身を実行した後に文字列にする。
const day   = String(now.getDate()).padStart(2, '0');

document.getElementById('today').textContent = `${year}/${month}/${day}`;//documen:html全体を指す。 get取ってくる　Element:要素　By：～を使って

const addTask = () => {
    const taskInput=document.getElementById('task-input').value;
    if(taskInput===''){
        alert(`タスクを入力してください`);
    }else{
        // ① 部品を作る
        const li = document.createElement('li');//1行分の入れ物

        const checkbox = document.createElement('input');//チェックボックス
        checkbox.type = 'checkbox';

        const span = document.createElement('span');//タスクの文字
        span.className = 'task-text';
        span.textContent = taskInput;

        // ② 組み立てる（入れた順に左から並ぶ）
        li.appendChild(checkbox);
        li.appendChild(span);

        // ③ リストに入れて、入力欄を空にする
        document.getElementById('task-list').appendChild(li);//task-listにliを追加
        document.getElementById('task-input').value = '';//入力欄を空にする
    }
}

document.getElementById('add-button').addEventListener('click', addTask);

document.getElementById('task-input').addEventListener('keydown', (e) => {
    if(e.key==='Enter'){
        addTask();
    }
});

