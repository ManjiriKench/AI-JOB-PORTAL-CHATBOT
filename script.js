// static/script.js
document.addEventListener('DOMContentLoaded', function() {
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    const chatLog = document.getElementById('chat-log');

    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });

    function sendMessage() {
        const message = userInput.value.trim();
        if (message) {
            appendMessage('user', message);
            userInput.value = '';

            fetch('/get_response', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `user_query=${encodeURIComponent(message)}`,
            })
            .then(response => response.json())
            .then(data => {
                appendMessage('bot', data.response);
            })
            .catch(error => {
                console.error('Error:', error);
                appendMessage('bot', 'Sorry, I encountered an error.');
            });
        }
    }

    function appendMessage(sender, text) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add(`${sender}-message`);
        messageDiv.textContent = text;
        chatLog.appendChild(messageDiv);
        chatLog.scrollTop = chatLog.scrollHeight; // Scroll to the bottom
    }
    
});