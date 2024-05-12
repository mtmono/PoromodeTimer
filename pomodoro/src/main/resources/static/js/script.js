function zeroPadding(number, length) {
    return number.toString().padStart(length, "0");
}

function calculateTimerText(parameters) {
    const date = new Date();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const remainingSeconds = 59 - seconds;
    const minutesInInterval = minutes % parameters.interval;
    const remainingMinutes =
    (minutesInInterval < parameters.workTime ? parameters.workTime : parameters.interval) - minutesInInterval - 1;
    return {
        rMinutes: zeroPadding(remainingMinutes, 2),
        rSeconds: zeroPadding(remainingSeconds, 2)
    };
}

function getParameters() {
    const breakTime = 5;
    const workTime = 25;
    return {
        breakTime: breakTime,
        workTime: workTime,
        interval: workTime + breakTime
    };
}

//function setWorkTime(){
//    // 作業時間のツイート用にpomodoro.startTime の値を取得
//    const elapsedTime = (Date.now() - document.getElementById('startTime').value);
//    //  うまくhrefに入らないのでログに出して確認してるけどやっぱり出ない
//    console.log(elapsedTime);
//    // Tweet ボタンの要素を取得
//    let sec = Math.floor(elapsedTime / 1000)
//    let day = Math.floor(sec / 86400)
//    let hour = Math.floor(sec % 86400 / 3600)
//    let min = Math.floor(sec % 3600 / 60)
//    let rem = sec % 60
//
//    console.log(`${day}日${hour}時間${min}分${rem}秒`)
//}

setInterval(function () {
    const date = new Date();
    const parameters = getParameters();
    const element = document.getElementById("timerText")
    const timers = calculateTimerText(parameters);
    //  ここで画面表示
    element.textContent = timers.rMinutes + ":" + timers.rSeconds;
    //  0～24分、30～55分の場合
    if(date.getMinutes() % parameters.interval < parameters.workTime){
        //  万が一休憩画面を開いていたら作業画面に遷移
        if(document.getElementById('locationHref').value == "/work"){
            window.location.href = document.getElementById('locationHref').value;
        }
    }else{
        //  25～29分、56～59分の場合、万が一作業画面を開いていたら休憩画面に遷移
        if(document.getElementById('locationHref').value == "/break"){
            window.location.href = document.getElementById('locationHref').value;
        }
    }
    //  残り0分0秒で休憩画面または作業画面に遷移
    if(timers.rMinutes == 0 && timers.rSeconds == 0){
        window.location.href = document.getElementById('locationHref').value;
    }
}, 1000);

document.getElementById("twitter-share-button").onclick = function() {

    // 作業時間のツイート用にpomodoro.startTime の値を取得
    const nowTime = Date.now();
    const elapsedTime = (nowTime - document.getElementById('startTime').value);
    //  うまくhrefに入らないのでログに出して確認してるけどやっぱり出ない
    console.log("startTime" + document.getElementById('startTime').value);
    console.log("elapsedTime" + elapsedTime);
    // Tweet ボタンの要素を取得
    let sec = Math.floor(elapsedTime / 1000)
    let day = Math.floor(sec / 86400)
    let hour = Math.floor(sec % 86400 / 3600)
    let min = Math.floor(sec % 3600 / 60)
    let rem = sec % 60

   // オプションパラメータを設定
    let text = "現在";
    if(hour > 0){
        text = text + hour + "時間";
    }
    if(min > 0){
        text = text + min + "分";
    }
    if(rem > 0){
        text = text + rem + "秒";
    }
    text = text + "作業中！";
    let hashtags = "ポロくんタイマー";
    let url = "https://jp.finalfantasyxiv.com/"  // location.hrefは今いるURL

    // URLを生成して遷移
    window.open("https://twitter.com/share?ref_src=twsrc%5Etfw&text=" + text + "&hashtags=" + hashtags + "&url=" + url);
}