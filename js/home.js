'use strict'
{
    const start_first = document.getElementById('start_first');
    const start_second = document.getElementById('start_second');
    const start_third = document.getElementById('start_third');

    start_first.addEventListener('click', () => {
        window.location.href = "index.html"
    });

    start_second.addEventListener('click', () => {
        window.location.href = "second.html"
    });

    start_third.addEventListener('click', () => {
        window.location.href = "third.html"
    });
}