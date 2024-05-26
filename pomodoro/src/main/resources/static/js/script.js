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

function updateTimer() {
    const element = document.getElementById("timerText")
    const timers = calculateTimerText(parameters);
    //  ここで画面表示
    element.textContent = timers.rMinutes + ":" + timers.rSeconds;
    //  0～24分、30～55分の場合
    if(calculateClassName(parameters) == "work"){
        //  万が一休憩画面を開いていたら作業画面に遷移
        if(document.getElementById('locationHref').value == "/work"){
            pageMove();
        }
    }else{
        //  25～29分、56～59分の場合、万が一作業画面を開いていたら休憩画面に遷移
        if(document.getElementById('locationHref').value == "/break"){
            pageMove();
        }
    }
    //  残り0分0秒で休憩画面または作業画面に遷移
    if(timers.rMinutes == 0 && timers.rSeconds == 0){
        pageMove();
    }
}

function pageMove(){
    let audio = document.getElementById("pageMoveSE");
    audio.play().then(() => {
        console.log("Audio played successfully");
        // 音が再生されている間に少しの遅延を設ける
        setTimeout(function() {
            //  bodyにクラス名fadeoutを追加することでcssのフェードアウト処理が走る
            document.body.classList.add("fadeout");
            window.location.assign(document.getElementById('locationHref').value);
        }, 870);  // 0.5秒遅延させる
    }).catch((error) => {
        console.error("Audio play failed:", error);
        // 音が再生されなかった場合でも遷移する
        window.location.assign(document.getElementById('locationHref').value);
    });

}

document.getElementById("twitter-share-button").onclick = function() {

    // 作業時間のツイート用にpomodoro.startTime の値を取得
    const nowTime = Date.now();
    const elapsedTime = (nowTime - document.getElementById('startTime').value);
    // Tweet ボタンの要素を取得
    let sec = Math.floor(elapsedTime / 1000)
    let day = Math.floor(sec / 86400)
    let hour = Math.floor(sec % 86400 / 3600)
    let min = Math.floor(sec % 3600 / 60)
    //  let rem = sec % 60

   // オプションパラメータを設定
    let text = "現在";
    if(hour > 0){
        text = text + hour + "時間";
    }
    text = text + min + "分作業中！";
    let hashtags = "ポロくんタイマー";
    let url = "https://jp.finalfantasyxiv.com/"  // location.hrefは今いるURL
    // URLを生成して遷移
    window.open("https://twitter.com/share?ref_src=twsrc%5Etfw&text=" + text + "&hashtags=" + hashtags + "&url=" + url);
}

// ここに getParameters 関数を定義
const parameters = {
    breakTime: 5,
    workTime: 25,
    interval: 30
};

//  現在が作業時間か休憩時間かの判定
function calculateClassName(parameters) {
    const date = new Date();
    const minutes = date.getMinutes();
    const minutesInInterval = minutes % parameters.interval;
    return minutesInInterval < parameters.workTime ? "work" : "break";
}
//  ページ遷移直後は即実行
updateTimer();
//  以降は1分毎に実行
setInterval(updateTimer, 1000);