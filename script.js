const now   = new Date();//今日の日時を取得する
const year  = now.getFullYear();//年を取り出してyearに入れる。
const month = String(now.getMonth() + 1).padStart(2, '0');//String()：これは{}の中身を実行した後に文字列にする。
const day   = String(now.getDate()).padStart(2, '0');

document.getElementById('today').textContent = `${year}/${month}/${day}`;//documen:html全体を指す。 get取ってくる　Element:要素　By：～を使って

