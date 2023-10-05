

function matchID(input) {
  let index = [-1, -1];
  for (let i = 0; i < csvArray.length; i++) {
    if (csvArray[i][0] === input) {
      index[0] = i;
      index[1] = 1;
      return index;
    }
    if (csvArray[i][1] === input) {
      index[0] = i;
      index[1] = 1;
      return index;
    }
  }
  return index;
}

document.addEventListener('DOMContentLoaded', function () {
  (function () {
    for (let i = 1; i <= 12; i++) {
      const display_id = 'display_input' + i;
      document.getElementById(display_id).innerHTML = 'モンスター名もしくは図鑑No.を入力';
      resultArray.push({ num: i })
    }
  })();
});

function input(elem) {
  const index = matchID(elem.value);
  const display_id = 'display_' + elem.id;
  document.getElementById(display_id).innerHTML = index[1];
  document.getElementById('display_test').innerHTML = index[0];
  console.log(resultArray[11].num)
}

function reset() {
  const container = document.getElementById('table_result');
  if (container.hasChildNodes()) {
    container.removeChild(container.firstChild);
  }
}

function result() {
  for (let i = 0; i < 12; i++) {
    resultArray[i].name = csvArray[i + 2][1]
    resultArray[i].size = csvArray[i + 2][3]
    resultArray[i].rare = csvArray[i + 2][4]
  }
  resultArray.sort((a, b) => a.rare - b.rare);
  for (let i = 0; i < 12; i++) {
    console.log(resultArray[i])
  }

  const container = document.getElementById('table_result');
  if (container.hasChildNodes()) {
    container.removeChild(container.firstChild);
  }
  const table = document.createElement('table');
  container.appendChild(table);
  const array = ['name', 'size', 'rare']
  for (const i of resultArray) {
    let newRow = table.insertRow();
    for (const p of array) {
      let cell = newRow.insertCell();
      cell.innerHTML = i[p];
    }
  }
}

function test() {
  const table = document.getElementById("csvTable");
  for (const i of resultArray) {
    let newRow = table.insertRow();
    const array = [1, 3, 4, 5, 6]
    for (const elem of array) {
      let cell = newRow.insertCell();
      cell.innerHTML = csvArray[i][elem];
    }
  }
}

let csv = new XMLHttpRequest();
csv.open("GET", "data.csv", true);
csv.send();
let csvArray = [];
let resultArray = [];

csv.onload = function () {
  if (csv.status === 200) {
    let csvText = csv.responseText;
    let lines = csvText.split(/\r\n|\n/);
    for (let i = 0; i < lines.length; i++) {
      let cells = lines[i].split(",");
      csvArray.push(cells);
    }
  } else {
    console.log("CSVファイルの読み込みに失敗しました。");
  }
}

csv.onerror = function () {
  console.log("CSVファイルの読み込みに失敗しました。");
}


