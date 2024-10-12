const maheshSelectorBtn = document.querySelector('#mahesh-selector');
const rajeshSelectorBtn = document.querySelector('#rajesh-selector');
const chatHeader = document.querySelector('.chat-header');
const chatMessages = document.querySelector('.chat-messages');
const chatInputForm = document.querySelector('.chat-input-form');
const chatInput = document.querySelector('.chat-input');
const clearChatBtn = document.querySelector('.clear-chat-button');

// Corrected variable name
const messages = JSON.parse(localStorage.getItem('messages') || '[]');

const createchatMessageElement = (message) => `
    <div class="message ${message.sender === 'mahesh' ? 'blue-bg' : 'gray-bg'}">
        <div class="message-sender">${message.sender}</div>
        <div class="message-text">${message.text}</div>
        <div class="message-timestamp">${message.timestamp}</div>
    </div>
`;

window.onload = () => {
    messages.forEach((message) => {
        chatMessages.innerHTML += createchatMessageElement(message);
    });
};

let messageSender = 'mahesh';
const updateMessageSender = (name) => {
    messageSender = name;
    chatHeader.innerText = `${messageSender} chatting...`;
    chatInput.placeholder = `Type here, ${messageSender}...`;

    if (name === 'mahesh') {
        maheshSelectorBtn.classList.add('active-person');
        rajeshSelectorBtn.classList.remove('active-person');
    }
    if (name === 'rajesh') {
        rajeshSelectorBtn.classList.add('active-person');
        maheshSelectorBtn.classList.remove('active-person');
    }
    chatInput.focus();
};

maheshSelectorBtn.onclick = () => updateMessageSender('mahesh');
rajeshSelectorBtn.onclick = () => updateMessageSender('rajesh');

const sendMessage = (e) => {
    e.preventDefault();

    const timestamp = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    const message = {
        sender: messageSender,
        text: chatInput.value,
        timestamp,
    };
    
    // Add message to messages array
    messages.push(message);
    // Store updated messages array
    localStorage.setItem('messages', JSON.stringify(messages));
    chatMessages.innerHTML += createchatMessageElement(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    chatInput.value = '';  // Clear input after sending message
};

chatInputForm.addEventListener('submit', sendMessage);

// Add functionality to clear chat
clearChatBtn.addEventListener('click', () => {
    localStorage.clear();
    chatMessages.innerHTML = '';  // Clears the chat messages
});
