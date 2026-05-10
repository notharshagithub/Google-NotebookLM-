import './style.css';
import { createIcons, BookOpen, UploadCloud, Send, FileText, Loader2 } from 'lucide';
import { RAGPipeline } from './rag.js';

import * as allIcons from 'lucide';

// Initialize Lucide Icons with the complete set for total compatibility
allIcons.createIcons({
  icons: allIcons
});

const rag = new RAGPipeline();

// DOM Elements
const uploadArea = document.getElementById('upload-area');
const fileInput = document.getElementById('file-input');
const docInfo = document.getElementById('doc-info');
const fileNameDisplay = document.getElementById('file-name');
const chunkInfoDisplay = document.getElementById('chunk-info');
const chatContainer = document.getElementById('chat-container');
const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// File Upload Handlers
uploadArea.addEventListener('click', () => fileInput.click());

uploadArea.addEventListener('dragover', (e) => {
  e.preventDefault();
  uploadArea.classList.add('dragging');
});

uploadArea.addEventListener('dragleave', () => {
  uploadArea.classList.remove('dragging');
});

uploadArea.addEventListener('drop', (e) => {
  e.preventDefault();
  uploadArea.classList.remove('dragging');
  const file = e.dataTransfer.files[0];
  if (file) handleFile(file);
});

fileInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) handleFile(file);
});

async function handleFile(file) {
  if (!file.type.match('application/pdf') && !file.type.match('text/plain')) {
    alert('Please upload a PDF or Text file.');
    return;
  }

  // Update UI for processing
  uploadArea.innerHTML = `
    <div class="loading-dots">
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    </div>
    <p>Processing Document...</p>
  `;
  uploadArea.style.pointerEvents = 'none';

  const result = await rag.processDocument(file);

  if (result.success) {
    fileNameDisplay.textContent = file.name;
    chunkInfoDisplay.textContent = `Indexed into ${result.chunkCount} searchable segments.`;
    docInfo.classList.add('visible');
    
    // Enable Chat
    userInput.disabled = false;
    sendBtn.disabled = false;
    userInput.placeholder = "Ask something about " + file.name + "...";

    addMessage('ai', `Successfully indexed **${file.name}**. You can now ask questions about its content!`);
  } else {
    addMessage('ai', `Error processing document: ${result.error}`);
  }

  // Restore Upload Area
  uploadArea.innerHTML = `
    <i data-lucide="upload-cloud"></i>
    <h3>Upload Document</h3>
    <p>PDF or Plain Text (max 10MB)</p>
  `;
  uploadArea.style.pointerEvents = 'all';
  allIcons.createIcons({ icons: allIcons });
}

// Chat Handlers
chatForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const query = userInput.value.trim();
  if (!query || rag.isProcessing) return;

  userInput.value = '';
  addMessage('user', query);

  // Show Thinking State
  const aiMsgId = 'ai-' + Date.now();
  addMessage('ai', `<div class="loading-dots"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div>`, aiMsgId);

  try {
    const answer = await rag.query(query);
    updateMessage(aiMsgId, answer);
  } catch (error) {
    updateMessage(aiMsgId, `Sorry, I encountered an error: ${error.message}`);
  }
});

import { marked } from 'marked';

function addMessage(role, text, id = null) {
  const msgDiv = document.createElement('div');
  msgDiv.className = `message ${role}`;
  if (id) msgDiv.id = id;
  
  // Parse markdown for AI messages, keep raw for user or if it's the loading dots
  if (role === 'ai' && !text.includes('loading-dots')) {
    msgDiv.innerHTML = marked.parse(text);
  } else {
    msgDiv.innerHTML = text;
  }
  
  chatContainer.appendChild(msgDiv);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

function updateMessage(id, text) {
  const msgDiv = document.getElementById(id);
  if (msgDiv) {
    msgDiv.innerHTML = marked.parse(text);
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }
}
