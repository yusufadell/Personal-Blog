const d = document;
d.addEventListener("DOMContentLoaded", function (event) {


    // update target element content to match number of characters
    var dataBindCharacters = [].slice.call(document.querySelectorAll('[data-bind-characters-target]'))
    dataBindCharacters.map(function (el) {
        var text = d.querySelector(el.getAttribute('data-bind-characters-target'));
        var maxCharacters = parseInt(el.getAttribute('maxlength'));
        text.textContent = maxCharacters;

        el.addEventListener('keyup', function (event) {
            var string = this.value;
            var characters = string.length;
            var charactersRemaining = maxCharacters - characters;
            text.textContent = charactersRemaining;
        });

        el.addEventListener('change', function (event) {
            var string = this.value;
            var characters = string.length;
            var charactersRemaining = maxCharacters - characters;
            text.textContent = charactersRemaining;
        });

    });

});

function readingTime() {
    const text = document.getElementById("article").innerText;
    const wpm = 225;
    const words = text.trim().split(/\s+/).length;
    const time = Math.ceil(words / wpm);
    result = `~${time} min read`;
    document.getElementById("time").innerText = result;
}

readingTime();


