const step =[
  [2,2,2,2,2,3,2,2,2,3,2,2,3,2,3,2,3,3,2,3,3,3,3,2,3,3,4,3,3,3,3,4,3,4,3,4,3,4,4,3,4,4,4,4,4,5,4,4,5],
  [2,3,2,3,2,3,3,2,3,3,3,3,3,2,4,3,3,3,3,3,4,3,4,3,4,3,4,4,4,3,4,4,4,5,4,4,4,5,4,5,5,4,5,5,5,5,5,5,6],
  [3,3,3,2,3,4,3,3,3,3,4,3,3,4,3,4,4,3,4,4,4,4,4,4,4,4,5,4,4,5,4,5,5,5,5,5,5,5,5,5,6,5,6,6,5,6,6,6,7],
  [3,4,3,4,4,3,4,4,4,4,4,4,4,4,4,5,4,5,4,5,5,4,5,5,5,6,5,5,5,6,6,5,6,6,6,6,6,6,7,6,7,6,7,7,7,7,8,7,8],
  [4,4,4,4,5,4,4,5,4,5,5,5,5,4,6,5,5,5,6,5,6,5,6,6,6,6,6,6,7,6,7,6,7,7,7,7,7,8,7,8,8,8,8,8,8,8,9,9,9]
];
let stepSelect = document.getElementById('step_select');
let startCount = 0;
let count = 0;
let battle = 0;
let level = 1;
let need = 0;
let needAll = 150;

function display(){
  stepSelect = document.getElementById('step_select');
  checkStartExp();
  checkExp();
  display_lv.innerHTML=level;
  display_bt.innerHTML=battle;
  display_ct.innerHTML=count;
  display_need.innerHTML=need;
  display_needall.innerHTML=needAll;
}

function selectChange(){
  document.getElementById("input_lv").value = "1";
  stepSelect = document.getElementById('step_select');
  document.getElementById("input_ct").value = step[stepSelect.value-1][0];
  needAll = 0;
  for(const elem of step[stepSelect.value-1]){
    needAll+=elem;
  }
  display();
}

function checkStartExp(){
  startCount = 0;
  let startCheck = document.getElementById("input_lv").value;
  for(const elem of step[stepSelect.value-1]){
    if(startCheck===1){startCount+=(elem-document.getElementById("input_ct").value)}
    startCheck--;
    if(startCheck<=0) break;
    startCount+=elem;
  }
}

function checkExp(){
  level = 1;
  let levelCheck = count + startCount;
  need = 0;
  need-=levelCheck;
  battle = levelCheck;
  for(const elem of step[stepSelect.value-1]){
    levelCheck-=elem;
    if(levelCheck>=0){level++;}
    need+=elem;
  }
}

function countup(){
  count++;
  display();
}

function countdown(){
  count--;
  display();
}

function reset(){
  count=0;
  display();
}
