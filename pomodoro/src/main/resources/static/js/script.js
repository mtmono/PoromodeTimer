var pageMoveSE = document.getElementById("pageMoveSE");
var isOyatsu = localStorage.getItem('isOyatsu');
const startButton = document.getElementById("startButton");
if (startButton) {
    startButton.onclick = function(event) {
        //document.getElementById("startButton").onclick = function(event) {
        event.preventDefault();  // ページ遷移を防ぐ
        //    let audio = document.getElementById("pageMoveSE");
        pageMoveSE.volume = inputRange.value;
        pageMoveSE.play().then(() => {
            console.log("Audio played successfully");
            //        次のページにミュート状態、音量、
            localStorage.setItem('isMute', pageMoveSE.muted);
            localStorage.setItem('audioVolume', inputRange.value);
            localStorage.setItem('isOyatsu', 'false');
            localStorage.setItem('startTime', Date.now());
            // 音が再生されている間に少しの遅延を設ける
            setTimeout(function() {
                // 遷移先を決定するロジックを追加
                if (calculateClassName(parameters) == "work") {
                    console.log("work time");
                    document.fromIndex.action = document.getElementById('workUrl').value;
                } else {
                    console.log("break time");
                    document.fromIndex.action = document.getElementById('breakUrl').value;
                }
                //  bodyにクラス名fadeoutを追加することでcssのフェードアウト処理が走る
                document.body.classList.add("fadeout");
                document.fromIndex.submit();  // フォームを送信してページを遷移
            }, 1800);  // 遅延させる
        }).catch((error) => {
            console.error("Audio play failed:", error);
            // 音が再生されなかった場合でも遷移する
            document.fromIndex.submit();
        });
    }
}

function workOnLoad(){
    //    前のページからミュート状態と音量を引き継ぐ
    inputRange.value = localStorage.getItem('audioVolume');
    const muteButton = document.getElementById("imgMuteButton");
    if( localStorage.getItem('isMute') == "false" ) {
        muteButton.src = document.getElementById('mute_buttonFalse').value;
        pageMoveSE.muted = false;
    } else {
        muteButton.src = document.getElementById('mute_buttonTrue').value;
        pageMoveSE.muted = true;
    }
    updateInputRange();
}

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
    if(element != null){
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
}

//  ページ遷移処理
function pageMove(){
    pageMoveSE.play().then(() => {
        console.log("Audio played successfully");
        localStorage.setItem('isMute', pageMoveSE.muted);
        localStorage.setItem('audioVolume', inputRange.value);
        localStorage.setItem('isOyatsu', 'true');
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

//  ミュートボタンクリック
function isMuted(){
    const muteButton = document.getElementById("imgMuteButton");
    if( pageMoveSE.muted ) {
        muteButton.src = document.getElementById('mute_buttonFalse').value;
        pageMoveSE.muted = false;
    } else {
        muteButton.src = document.getElementById('mute_buttonTrue').value;
        pageMoveSE.muted = true;
    }
    updateInputRange();
}

//  スライダー用
const inputRange = document.getElementById("inputRange");
const activeColor = "#06b6d4";
const inactiveColor = "#dddddd";
const muteColor = "#808080";
inputRange.addEventListener("input", updateInputRange,false);
function updateInputRange() {
    const max = inputRange.max - inputRange.min;
    const value = inputRange.value - inputRange.min;
    const ratio = (value / max) * 100;
    pageMoveSE.volume = inputRange.value;
    if(pageMoveSE.muted){
        inputRange.style.background = `linear-gradient(0deg, ${muteColor} ${ratio}%, ${inactiveColor} ${ratio}%)`;
        inputRange.style.setProperty('--thumb-bg', muteColor);
    }else{
        inputRange.style.background = `linear-gradient(0deg, ${activeColor} ${ratio}%, ${inactiveColor} ${ratio}%)`;
        inputRange.style.setProperty('--thumb-bg', activeColor);
    }
}
document.addEventListener("DOMContentLoaded", function() {
    inputRange.style.setProperty('--thumb-bg', activeColor);
});

//document.getElementById("twitter-share-button").onclick = function() {
function twitterOnclick(){
    // 作業時間のツイート用に現在時刻と「はじめる」クリック時の時刻を取得
    const nowTime = Date.now();
    const elapsedTime = (nowTime - localStorage.getItem('startTime'));
    // Tweet ボタンの要素を取得
    let sec = Math.floor(elapsedTime / 1000)
    let day = Math.floor(sec / 86400)
    let hour = Math.floor(sec % 86400 / 3600)
    let min = Math.floor(sec % 3600 / 60)

    // オプションパラメータを設定
    let text = "現在";
    if(hour > 0){
        text = text + hour + "時間";
    }
    text = text + min + "分作業中！";
    // let hashtags = "ポロくんタイマー";
    let url = "http://poro-timer.com/"
    // URLを生成して遷移
    window.open("https://twitter.com/share?ref_src=twsrc%5Etfw&text=" + text + "&url=" + url);
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