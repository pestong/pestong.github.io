let csv = new XMLHttpRequest();
csv.open("GET", "data.csv", true);
csv.send();

let csvArray = []
let inputArray = []
const rareArray = ['とてもよく見かける', 'よく見かける', 'ときどき見かける', 'あまり見かけない', 'めったに見かけない', 'メタル']
const etcArray = ['', 'イベント']
const tableArray1 = ['名前', 'サイズ', '見かけやすさ', 'その他']
const tableArray2 = ['name', 'size', 'rareName', 'etcName']
for (let i = 0; i < 12; i++) {
  inputArray.push(-1)
}

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
  (function () {
    document.getElementById('display_top').innerHTML = '入力してください'
    for (let i = 1; i <= 12; i++) {
      document.getElementById('display_input' + i).innerHTML = '未入力'
    }
  })();
});

function input(elem) {
  const display = document.getElementById('display_' + elem.id);
  const num = parseInt(elem.id.replace('input', ''));
  if (elem.value === '') {
    inputArray[num - 1] = -1
    display.innerHTML = '未入力'
    return
  }
  const index = matchID(elem.value);
  if (index === -1) {
    inputArray[num - 1] = -1
    display.innerHTML = '該当なし'
    return
  }
  display.innerHTML = csvArray[index][1]
  inputArray[num - 1] = index
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
  for (let i = 1; i <= 12; i++) {
    document.getElementById('input' + i).value = ''
    document.getElementById('display_input' + i).innerHTML = '未入力'
  }
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