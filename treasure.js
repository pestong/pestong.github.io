let csv = new XMLHttpRequest();
csv.open("GET", "data.csv", true);
csv.send();

let csvArray = []
let inputArray = []
const rareArray = ['とても', 'よく', 'ときどき', 'あまり', 'めったに', 'メタル']
const etcArray = ['', 'イベント']
const tableArray1 = ['名前', 'サイズ', '頻度', 'その他']
const tableArray2 = ['name', 'size', 'rareName', 'etcName']

csv.onload = function () {
  if (csv.status === 200) {
    let csvText = csv.responseText
    let lines = csvText.split(/\r\n|\n/);
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
  for (let i = 0; i < 12; i++) {
    document.getElementById("table_input").rows[i].cells[0].innerHTML = '未入力'
  }
});

function input(elem) {
  const table = document.getElementById('table_input');
  const val = elem.value.split(/\r?\n/);
  if (val.length > 11) {
    val.length = 12
    elem.value = val.join('\n');
  }
  inputArray = []
  for (let i = 0; i < 12; i++) {
    if (i < val.length) {
      if (val[i] === '') {
        inputArray[i] = -1
        table.rows[i].cells[0].innerHTML = '未入力'
      } else {
        const index = matchID(val[i]);
        if (index === -1) {
          inputArray[i] = -1
          table.rows[i].cells[0].innerHTML = '該当なし'
        } else {
          inputArray[i] = index
          table.rows[i].cells[0].innerHTML = `${csvArray[index][1]}(${csvArray[index][3]})`
        }
      }
    } else {
      table.rows[i].cells[0].innerHTML = '未入力'
    }
  }
  console.log(inputArray)
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
    for (const p of tableArray2) {
      let cell = newRow.insertCell();
      cell.innerHTML = i[p];
    }
  }
}

function score() {

}