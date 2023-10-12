let csv = new XMLHttpRequest();
csv.open("GET", "data.csv", true);
csv.send();

let csvArray = []
let inputArray = []
const rareArray = ['とても', 'よく', 'ときどき', 'あまり', 'めったに', 'メタル']
const etcArray = ['', 'イベント']
const tableArray1 = ['名前', 'サイズ', '頻度', 'その他']
const tableArray2 = ['name', 'size', 'rareName', 'etcName']
const colorArray = ['#d6ffd6', '#d6ffff', '#d6d6ff', '#ffd6ff', '#ffd6d6', '#cccccc']

csv.onload = function () {
  if (csv.status === 200) {
    let csvText = csv.responseText
    let lines = csvText.split(/\r?\n/);
    for (let i = 0; i < lines.length; i++) {
      let cells = lines[i].split(',');
      csvArray.push(cells);
    }
  } else {
    console.log("CSVファイルの読み込みに失敗しました。");
  }
}

csv.onerror = function () {
  console.log("CSVファイルの読み込みに失敗しました。");
}

document.addEventListener('DOMContentLoaded', function () {
  const display = []
  for (let i = 0; i < 12; i++) {
    display.push('未入力');
  }
  document.getElementById('display_input').innerHTML  = display.join('<br>')
});

window.onload = function () {
  document.getElementById('textarea_input').addEventListener('keydown', function () {
    if (event.keyCode == 13) {
      const text = document.getElementById('textarea_input').value.split(/\r?\n/);
      if (text.length > 11) {
        event.preventDefault();
      }
    }
  });
}

function input(elem) {
  const val = elem.value.split(/\r?\n/);
  inputArray = []
  const display = []
  for (let i = 0; i < 12; i++) {
    if (i < val.length) {
      if (val[i] === '') {
        inputArray[i] = -1
        display.push('未入力');
      } else {
        const index = matchID(val[i]);
        if (index === -1) {
          inputArray[i] = -1
          display.push('該当なし');
        } else {
          inputArray[i] = index
          display.push(`${csvArray[index][1]}(${csvArray[index][3]})`);
        }
      }
    } else {
      display.push('未入力');
    }
  }
  document.getElementById('display_input').innerHTML  = display.join('<br>')
}

function matchID(input) {
  let index = -1
  let i = 0
  for (const array of csvArray) {
    if (array[0] === input || array[1] === input) {
      index = i
      return index
    }
    if (array[1].startsWith(input) || array[2].startsWith(input)) {
      index = i
      return index
    }
    i++;
  }
  return index
}

function reset() {
  const textarea = document.getElementById('textarea_input')
  textarea.value = ''
  input(textarea);
  const container = document.getElementById('table_result');
  if (container.hasChildNodes()) {
    container.removeChild(container.firstChild);
  }
}

function result() {
  let resultArray = []
  for (const array of inputArray) {
    if (array === -1) continue;
    resultArray.push({
      name: csvArray[array][1],
      size: csvArray[array][3],
      rare: csvArray[array][4],
      rareName: rareArray[csvArray[array][4] - 1],
      etcName: etcArray[csvArray[array][5]]
    });
  }
  resultArray.sort((a, b) => a.rare - b.rare);

  const container = document.getElementById('table_result');
  if (container.hasChildNodes()) {
    container.removeChild(container.firstChild);
  }
  const table = document.createElement('table');
  container.appendChild(table);

  let newRow = table.insertRow();
  for (const p of tableArray1) {
    let cell = newRow.insertCell();
    cell.innerHTML = p;
  }

  for (const i of resultArray) {
    let newRow = table.insertRow();
    newRow.style.backgroundColor = colorArray[i.rare-1];
    for (const p of tableArray2) {
      let cell = newRow.insertCell();
      // if(i[p]==='ドラキー'){
      //   cell.style.color = '#ff0000';
      //   cell.style.fontWeight = "bold";
      // }
      cell.innerHTML = i[p];
    }
  }
}

function score() {

}