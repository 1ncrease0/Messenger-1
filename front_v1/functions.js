const smileyIcon = document.getElementById('emoji-icon');
const emojiPanel = document.getElementById('emojiPanel');
const messageInput = document.getElementById('messageInput');
let isEmojiPanelVisible = false;

// Show/hide emoji panel
smileyIcon.addEventListener('click', function() {
    if (isEmojiPanelVisible) {
        emojiPanel.style.display = 'none';
        isEmojiPanelVisible = false;
    } else {
        emojiPanel.style.display = 'block';
        isEmojiPanelVisible = true;
    }
});

document.addEventListener('DOMContentLoaded', function() {
    emojiPanel.style.display = 'none';
    isEmojiPanelVisible = false;
});

document.addEventListener('click', function(event) {
    if (!emojiPanel.contains(event.target) && event.target !== smileyIcon) {
        emojiPanel.style.display = 'none';
        isEmojiPanelVisible = false;
    }
});

const emojiButtons = document.querySelectorAll('.emoji-button');
emojiButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        const emoji = button.textContent;
        messageInput.value += emoji;
    });
});

// Show/hide user profile
document.getElementById("toggleRightContent").addEventListener("click", function() {
  var rightContentElements = document.getElementsByClassName("rightContent");
  for (var i = 0; i < rightContentElements.length; i++) {
    var rightContent = rightContentElements[i];
    if (rightContent.style.display === "none") {
      rightContent.style.display = "block";
    } else {
      rightContent.style.display = "none";
    }
  }
});

// Dark theme
document.getElementById("toggleThemeButton").addEventListener("click", function() {
  var body = document.body;
  body.classList.toggle("dark-theme");
});

// Smooth theme change
const darkThemeButton = document.getElementById('dark-theme-button');
const container = document.querySelector('.container');

darkThemeButton.addEventListener('click', () => {
  container.classList.toggle('dark-theme');
});

// Sun/moon
const themeToggle = document.getElementById('theme-toggle');

themeToggle.addEventListener('click', () => {
  container.classList.toggle('dark-theme');
  themeToggle.classList.toggle('sun');
  themeToggle.classList.toggle('moon');
});