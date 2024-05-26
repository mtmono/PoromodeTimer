document.getElementById("startButton").onclick = function(event) {
    event.preventDefault();  // ページ遷移を防ぐ
    let audio = document.getElementById("pageMoveSE");
    audio.play().then(() => {
        console.log("Audio played successfully");
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

// ここに calculateClassName 関数を定義
function calculateClassName(parameters) {
    const date = new Date();
    const minutes = date.getMinutes();
    const minutesInInterval = minutes % parameters.interval;
    return minutesInInterval < parameters.workTime ? "work" : "break";
}

// ここに getParameters 関数を定義
const parameters = {
    breakTime: 5,
    workTime: 25,
    interval: 30
};