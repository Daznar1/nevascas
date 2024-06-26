document.querySelectorAll('.audio-button').forEach(button => {
    // Set up object to store button state
    button.buttonState = {
        audio: null,
        playing: false,
        html: button.innerHTML
    };

    button.addEventListener('click', event => {
        const audioFile = button.dataset.audio;
        const currentAudio = button.buttonState.audio;

        // Stop other audios associated with the same gallery item
        const galleryItem = button.closest('.gallery-item');
        const otherButtons = galleryItem.querySelectorAll('.audio-button');
        otherButtons.forEach(otherButton => {
            if (otherButton !== button && otherButton.buttonState.audio) {
                otherButton.buttonState.audio.pause();
                otherButton.buttonState.audio.currentTime = 0;
                otherButton.innerHTML = otherButton.buttonState.html;
                otherButton.buttonState.playing = false;
            }
        });

        // If current audio is not defined or paused, create a new audio element and play it
        if (!currentAudio || currentAudio.paused) {
            if (!currentAudio) {
                button.buttonState.audio = new Audio(audioFile);

                // Add event listener for 'ended' event to reset button state
                button.buttonState.audio.addEventListener('ended', () => {
                    button.innerHTML = button.buttonState.html;
                    button.buttonState.playing = false;
                });
            }
            button.buttonState.audio.play();
            button.innerHTML = '<img src="images/icons/pause.svg" />';
            button.buttonState.playing = true;
        } else {
            // If current audio is playing, pause it and reset to the beginning
            currentAudio.pause();
            currentAudio.currentTime = 0;
            button.innerHTML = button.buttonState.html;
            button.buttonState.playing = false;
        }
    });
});

// Show caption on hover and keep the image scaled
let galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('mouseover', event => {
        item.classList.add('hover');
    });
    item.addEventListener('mouseleave', event => {
        item.classList.remove('hover');
    });
});


const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const closeModal = document.getElementsByClassName('close')[0];

document.querySelectorAll('.gallery-item img').forEach(img => {
    img.addEventListener('click', function () {
        modal.style.display = 'flex';
        modalImg.src = this.src;
    });
});

closeModal.addEventListener('click', function () {
    modal.style.display = 'none';
});

modalImg.addEventListener('click', function () {
    modal.style.display = 'none';
});

window.addEventListener('click', function (event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});