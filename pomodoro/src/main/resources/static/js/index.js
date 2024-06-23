var audio = document.getElementById("pageMoveSE");
var inputRange = document.getElementById("inputRange");
document.getElementById("startButton").onclick = function(event) {
    event.preventDefault();  // ページ遷移を防ぐ
//    let audio = document.getElementById("pageMoveSE");
    audio.volume = inputRange.value;
    audio.play().then(() => {
        console.log("Audio played successfully");
//        次のページにミュート状態、音量、
        localStorage.setItem('isMute', audio.muted);
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

//function isMuted(){
//    const muteButton = document.getElementById("imgMuteButton");
//    if( audio.muted ) {
//        muteButton.src = document.getElementById('mute_buttonFalse').value;
//        audio.muted = false;
//    } else {
//        muteButton.src = document.getElementById('mute_buttonTrue').value;
//        audio.muted = true;
//    }
//    updateInputRange();
//}

//  スライダー用
//const inputRange = document.getElementById("inputRange");
//const activeColor = "#06b6d4";
//const inactiveColor = "#dddddd";
//
//inputRange.addEventListener("input", function() {
//    const max = inputRange.max - inputRange.min;
//    const value = inputRange.value - inputRange.min;
//    const ratio = (value / max) * 100;
//    let audio = document.getElementById("pageMoveSE");
//    audio.volume = inputRange.value;
//    inputRange.style.background = `linear-gradient(0deg, ${activeColor} ${ratio}%, ${inactiveColor} ${ratio}%)`;
//});

//// ここに calculateClassName 関数を定義
//function calculateClassName(parameters) {
//    const date = new Date();
//    const minutes = date.getMinutes();
//    const minutesInInterval = minutes % parameters.interval;
//    return minutesInInterval < parameters.workTime ? "work" : "break";
//}
//
//// ここに getParameters 関数を定義
//const parameters = {
//    breakTime: 5,
//    workTime: 25,
//    interval: 30
//};