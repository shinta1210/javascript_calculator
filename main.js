// 入力数値格納用配列
let arrayValueMemory1 = new Array();
let arrayValueMemory2 = new Array();

// 入力数値を数値型に変換後に格納する変数(計算用)
let IntValueMemory1='';
let IntValueMemory2='';

// 入力演算子格納用変数
let operatorValue = '';

// 「.」入力可否判別フラグ
dottoFlag = false;

//初期画面遷移
initialDisplay();


///////////// 初期画面遷移関数　////////////////////
function initialDisplay(){
  $('button').prop('disabled',true);
  $('.valueButton').prop('disabled',false);     //数値
  $('#minus').prop('disabled',false);           //マイナス
  $('#zerozero').prop('disabled',true);         //00
  $('#allClearButton').prop('disabled',false);  //AC
  $("#displayValue").text('0');                 //画面を0表示
}


/////////////　　数値入力時処理関数　　////////////////////
function onclickValueInput(value){
  // 入力値をvalueMemory配列に一文字ずつ格納
  // 演算子が入力前は数値１、入力後は数値２に格納
  if(operatorValue == ''){
    arrayValueMemory1.push(value);
    IntValueMemory1 = arrayValueMemory1.join('');
  }else{
    arrayValueMemory2.push(value);
    IntValueMemory2 = arrayValueMemory2.join('');
  }

  // 画面に出力(数値１　＋　演算子　＋　数値２)
  $("#displayValue").text(IntValueMemory1  + operatorValue + IntValueMemory2);
}


///////////　演算子入力時処理関数　　///////////////////////////////
function OperatorInput(value){
  // 一文字目に「-」が入力された場合は数値、それ以外の場合は演算子として扱う
  if (arrayValueMemory1[0] == null && value == '-') {
    onclickValueInput(value);
  }else{
    operatorValue = value;
    $("#displayValue").text(IntValueMemory1  + operatorValue + IntValueMemory2);
  }
}


//////////// 演算子別で結果を算出する関数　　/////////////////////////
function calculateValue(value1, value2){
  // 計算結果を数値1に上書き
  // toFixedで小数点以下10桁まで表示
  switch(operatorValue){
    case '+':
      IntValueMemory1 = parseFloat((value1 + value2).toFixed(10));
      break;
    case '-':
      IntValueMemory1 = parseFloat((value1 - value2).toFixed(10));
      break;
    case '×':
      IntValueMemory1 = parseFloat((value1 * value2).toFixed(10));
      break;
    case '÷':
      IntValueMemory1 = parseFloat((value1 / value2).toFixed(10));
      break;
  }

  // 計算結果を数値１の配列にも保持
  arrayValueMemory1 = IntValueMemory1.toString().split('');

  return IntValueMemory1;
}

function onclickResult(){
  // 計算のため数値に変換
  IntValueMemory1 = Number(arrayValueMemory1.join(''));
  IntValueMemory2 = Number(arrayValueMemory2.join(''));

  // 計算結果を出力
  $("#displayValue").text(calculateValue(IntValueMemory1, IntValueMemory2));

  // 各変数初期化
  arrayValueMemory2 = [];
  IntValueMemory2 = '';
  operatorValue = '';
  dottoFlag = false;
}


$(document).ready(function(){
  ////////////　数値入力時ボタン有効無効整理　　///////////////////////////////
  $(".valueButton").click(function() {
    $('button').prop('disabled',false);
    // 一つの数値に２回以上「.」が打てないようにする
    if (dottoFlag == true){
      $('#dotto').prop('disabled',true);            //ドット(.)
    }

    // 演算子が入力されるまでは「＝」を押せないようにする
    // 演算子が２回以上打てないようにする
    $('.resultButton').prop('disabled',true);
    if(operatorValue != ''){
      $('.resultButton').prop('disabled',false);    //Result(=)
      $('.operator').prop('disabled',true);         //演算子
    }
  });

  ////////////　演算子入力時ボタン有効無効整理　　//////////////////////////////
  $(".operator").click(function() {
    dottoFlag = false;
    $('button').prop('disabled',true);
    $('.valueButton').prop('disabled',false);       //数値
    $('#zerozero').prop('disabled',true);           //00
    $('#allClearButton').prop('disabled',false);    //AC
  });

  ////////////　「.」入力時のボタン有効無効整理　　///////////////////////////////
  $("#dotto").click(function() {
    dottoFlag = true;
    $('button').prop('disabled',true);
    $('.valueButton').prop('disabled',false);       //数値
    $('#allClearButton').prop('disabled',false);    //AC
  });

  //////////// 「０」　入力時ボタン有効無効整理 //////////////////////////////////
  $("#zero").click(function() {
    // 先頭文字で０がの時、数値が連続しないようにする
    if((arrayValueMemory1[0] == '0') &&  (arrayValueMemory1[1] == null) || (arrayValueMemory2[0] == '0') && (arrayValueMemory2[1] == null)){
      $('.valueButton').prop('disabled',true);      //数値
    }
  });

  ///////////////// 「＝」入力時処理関数　　/////////////////////////////////////
  $(".resultButton").click(function() {
    $('button').prop('disabled',true);
    $('.operator').prop('disabled',false);          //演算子
    $('#allClearButton').prop('disabled',false);    //AC
  });

 ///////////////// 「AC」　ボタン押下後処理関数 //////////////////////////////////
  $("#allClearButton").click(function() {
    // 変数初期化
    arrayValueMemory1 = [];
    arrayValueMemory2 = [];
    IntValueMemory1='';
    IntValueMemory2='';
    operatorValue = '';
    dottoFlag = false;

    // 画面初期化
    initialDisplay();
  });
});
