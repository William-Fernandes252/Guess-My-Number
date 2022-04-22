"use strict";

$(document).ready(function () {
    let secretNumber = Math.floor(Math.random() * 19 + 1);

    const score = $(".score");
    const highscore = $(".highscore");
    const again = $(".again");
    const message = $(".message");
    const guess = $(".guess");
    const check = $(".check");
    const number = $(".number");

    highscore.text(
        !sessionStorage.getItem("highscore")
            ? 0
            : Number(sessionStorage.getItem("highscore"))
    );

    again.click(function () {
        secretNumber = Math.floor(Math.random());
        score.text("20");
        number.text("?");
        message.text("Start guessing...");
        guess.val("");
        guess.attr("disabled", false);
        guess.css("opacity", 1);
        check.attr("disabled", false);
        check.css("opacity", 1);
    });

    guess.keyup(function () {
        if (!$(this).val()) {
            check.attr("disabled", true);
            check.css("opacity", 0.5);
            return;
        }
        check.attr("disabled", false);
        check.css("opacity", 1);
    });

    check.click(() => {
        let play = Number(guess.val());
        guess.val("");
        guess.focus();
        if (play === secretNumber) {
            message.text("✅ That is my number!");
            number.text(secretNumber);
            highscore.text(score.text());
            sessionStorage.setItem("highscore", highscore.text());
        } else if (score.text() == "0") {
            message.text("❌ You lose. Try again!");
        } else {
            score.text(Number(score.text()) - 1);
            message.text(
                number > secretNumber ? "📈 Too high!" : "📉 Too low!"
            );
            return;
        }
        guess.attr("disabled", true);
        guess.css("opacity", 0.5);
        check.attr("disabled", true);
        check.css("opacity", 0.5);
    });
});
