
function searchImages() {
    var searchTerm = document.querySelector('.search').value.toLowerCase();
    var images = document.querySelectorAll('.uploaded-image');
    var found = false;

    images.forEach(function(image) {
        var annotation = image.querySelector('.uploaded-image-img-p p').innerText.toLowerCase();
        if (annotation.includes(searchTerm)) {
            image.style.display = 'block';
            found = true;
        } else {
            image.style.display = 'none';
        }
    });

    var noAnnotationMessage = document.getElementById('noAnnotationMessage');
    if (!found) {
        noAnnotationMessage.style.display = 'block';
    } else {
        noAnnotationMessage.style.display = 'none';
    }
}

function clearSearch() {
    document.querySelector('.search').value = '';
    searchImages();
}

console.log(document.getElementById('notes').getBoundingClientRect().bottom);

function toggleCollapsible(element) {
    var content = element.nextElementSibling;
    var icon = element.querySelector('.chevron-icon');
    element.classList.toggle('collapsed');
    content.classList.toggle('collapsed');
    icon.classList.toggle('rotate');
}

function rotateArrow() {
    var selectElement = document.getElementById("mtds");
    selectElement.classList.add("select-focused");
}

document.getElementById("mtds").addEventListener("blur", function() {
    var selectElement = document.getElementById("mtds");
    selectElement.classList.remove("select-focused");
});

calc_chips = () => {
    var chips = document.querySelectorAll('.chip');
    chips.forEach(function(chip) {
        var text = chip.textContent.trim();
        if (text == '--%') {
            chip.style.backgroundColor = 'transparent';
            return
        }
        var value = parseFloat(text.replace('%', ''));
        if (value < 75) {
            chip.style.backgroundColor = '#FF5F5896';
        } else if (value < 90) {
            chip.style.backgroundColor = '#febc2e80';
        } else {
            chip.style.backgroundColor = 'transparent';
        }
    });
}
calc_chips();


document.addEventListener('click', function(e) {
    var dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(function(dropdown) {
        var dropdownMenu = dropdown.querySelector('.dropdown-menu');
        if (dropdownMenu && !dropdown.contains(e.target)) {
            dropdownMenu.classList.remove('show');
        }
    });
});

// Close dropdowns when clicking outside of them
document.addEventListener('click', function(e) {
    var dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(function(dropdown) {
        if (!dropdown.contains(e.target)) {
            var dropdownMenu = dropdown.querySelectorAll('.dropdown-menu');
            for (var i = 0; i < dropdownMenu.length; i++) { 
                dropdownMenu[i].classList.remove('show');
            }
        }
    });
});

// Toggle dropdown visibility when clicking on the button
document.querySelectorAll('.dropdown-toggle').forEach(function(toggle) {
    toggle.addEventListener('click', function() {
        var dropdownMenu = this.nextElementSibling;
        dropdownMenu.classList.toggle('show');
    });
});


const openAnnotation = (element) => {
    console.log(element)
    var annotation = element.children[0];
    seenImage(annotation)
}