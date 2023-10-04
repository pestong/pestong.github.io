function testFunction() {
  display_id2.innerHTML = document.getElementById('input_id2').value;
}

function input01() {
  const input = document.getElementById('input_id1').value;
  let index1 = -1;
  let index2 = -1;
  for (let i = 0; i < csvArray.length; i++) {
    let p = csvArray[i].indexOf(input);
    if (p !== -1) {
      index1 = i;
      index2 = p;
    }
  }
  if (index2 !== -1) {
    display_id1.innerHTML = document.getElementById('input_id1').value;
  } else {
    display_id1.innerHTML = document.getElementById('input_id1').value + "：ないよ";
  }
}

let csv = new XMLHttpRequest();
csv.open("GET", "data.csv", true);
csv.send();
let csvArray = [];

csv.onload = function () {
  if (csv.status === 200) {
    let csvText = csv.responseText;
    let lines = csvText.split(/\r\n|\n/);
    for (let i = 0; i < lines.length; i++) {
      let cells = lines[i].split(",");
      csvArray.push(cells);
    }
    display_csv.innerHTML = csvArray;
  } else {
    console.log("CSVファイルの読み込みに失敗しました。");
  }
};

csv.onerror = function () {
  console.log("CSVファイルの読み込みに失敗しました。");
};


