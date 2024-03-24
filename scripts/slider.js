var rangeInput = document.getElementById('myRange');
var rangeOutput = document.getElementById('rangeValue');

rangeInput.addEventListener('input', function() {
    rangeOutput.textContent = this.value;
    var thumbPosition = (this.value / this.max) * this.offsetWidth;
    rangeOutput.style.left = thumbPosition + 'px';
});