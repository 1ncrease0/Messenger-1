const smileyIcon = document.getElementById('emoji-icon');
const emojiPanel = document.getElementById('emojiPanel');
const messageInput = document.getElementById('messageInput');
const sendMessage = document.getElementById('send-icon');
let isEmojiPanelVisible = false;

// Show/hide emoji panel
smileyIcon.addEventListener('click', function () {
  if (isEmojiPanelVisible) {
    emojiPanel.style.display = 'none';
    isEmojiPanelVisible = false;
  } else {
    emojiPanel.style.display = 'block';
    isEmojiPanelVisible = true;
  }
});

document.getElementById('messageInput').addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    sendMessage_f();
  }
});

sendMessage.addEventListener('click', sendMessage_f);

function sendMessage_f() {
  var messageInput = document.querySelector('.chatbox_input input');
  var messageText = messageInput.value.trim();

  if (messageText !== '') {
    var chatBox = document.querySelector('.chatBox');
    var newMessage = document.createElement('div');
    newMessage.classList.add('message', 'user_message');
    newMessage.innerHTML = `
          <p>${messageText}<br><span>${getCurrentTime()}</span></p>
      `;
    chatBox.appendChild(newMessage);

    messageInput.value = '';
    chatBox.scrollTop = chatBox.scrollHeight;
  }
}

document.addEventListener('DOMContentLoaded', function () {
  emojiPanel.style.display = 'none';
  isEmojiPanelVisible = false;
});

document.addEventListener('click', function (event) {
  if (!emojiPanel.contains(event.target) && event.target !== smileyIcon) {
    emojiPanel.style.display = 'none';
    isEmojiPanelVisible = false;
  }
});

const emojiButtons = document.querySelectorAll('.emoji-button');
emojiButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    const emoji = button.textContent;
    messageInput.value += emoji;
  });
});

// Show/hide user profile
document.getElementById("toggleRightContent").addEventListener("click", function () {
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
document.getElementById("toggleThemeButton").addEventListener("click", function () {
  var body = document.body;
  body.classList.toggle("dark-theme");
});

// Smooth theme change
const darkThemeButton = document.getElementById('dark-theme-button');
const container = document.querySelector('.container');

darkThemeButton.addEventListener('click', function () {
  container.classList.toggle('dark-theme');
});

function getCurrentTime() {
  var now = new Date();
  var hours = now.getHours().toString().padStart(2, '0');
  var minutes = now.getMinutes().toString().padStart(2, '0');
  return hours + ':' + minutes;
}