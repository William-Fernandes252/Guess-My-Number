"use strict";

$(document).ready(function () {
    const state = {
        reset: function () {
            this.secretNumber = Math.floor(Math.random() * 19 + 1);
            this.score = 20;
            this.highscore = !sessionStorage.getItem("highscore")
                ? 0
                : Number(sessionStorage.getItem("highscore"));
        },
    };
    state.reset();

    const control = {
        input: $(".guess"),
        check: $(".check"),
        toggle: function () {
            this.input.focus();
            if (!this.input.val()) {
                this.check.attr("disabled", true);
                this.check.css("opacity", 0.5);
                return;
            }
            this.check.attr("disabled", false);
            this.check.css("opacity", 1);
        },
        deactivate: function () {
            this.input.attr("disabled", true);
            this.input.css("opacity", 0.5);
            this.check.attr("disabled", true);
            this.check.css("opacity", 0.5);
        },
        activate: function () {
            this.input.val("");
            this.input.attr("disabled", false);
            this.input.css("opacity", 1);
            this.check.attr("disabled", false);
            this.check.css("opacity", 1);
        },
    };

    const score = $(".score");
    const highscore = $(".highscore");
    const again = $(".again");
    const message = $(".message");
    const number = $(".number");
    const body = $("body");

    highscore.text(state.highscore);

    again.click(function () {
        state.reset();
        score.text(state.score);
        number.text("?");
        message.text("Start guessing...");
        control.activate();
        control.toggle();
        body.css("background-color", "");
    });

    control.input.keyup(() => control.toggle());

    control.check.click(() => {
        let play = Number(control.input.val());

        if (state.score > 1) {
            if (play === state.secretNumber) {
                message.text("✅ That is my number!");
                number.text(state.secretNumber);
                highscore.text(state.score);
                control.deactivate();
                body.css("background-color", "rgb(24, 167, 84)");
                sessionStorage.setItem("highscore", highscore.text());
            } else {
                state.score -= 1;
                score.text(state.score);
                message.text(
                    play > state.secretNumber ? "📈 Too high!" : "📉 Too low!"
                );
            }
        } else {
            score.text("0");
            message.text("❌ You lose. Try again!");
        }

        control.input.val("");
        control.toggle();
    });
});
