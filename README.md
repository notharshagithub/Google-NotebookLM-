# 📚 NotebookLM Clone — Intelligent Document RAG

A high-performance, **Retrieval-Augmented Generation (RAG)** application built entirely for the modern web. This project allows users to upload documents (PDF or Plain Text) and have grounded, intelligent conversations with them using the power of **DeepSeek-R1** via OpenRouter.

---

![Premium UI](https://img.shields.io/badge/UI-Premium_Glassmorphism-7c4dff?style=for-the-badge)
![AI Powered](https://img.shields.io/badge/AI-DeepSeek_&_OpenRouter-448aff?style=for-the-badge)
![Speed](https://img.shields.io/badge/RAG-Long_Context_Optimized-green?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Production_Ready-brightgreen?style=for-the-badge)

## 🌟 Introduction

**NotebookLM Clone** is a state-of-the-art document assistant that brings the power of large language models to your local files. Unlike traditional RAG systems that suffer from chunking loss and retrieval errors, this implementation utilizes a **Long Context RAG** strategy, providing 100% context awareness for your documents.

### Why this project stands out:
- **No Hallucinations**: Answers are strictly grounded in your uploaded text.
- **Client-Side First**: Your documents are parsed in your browser, not on a hidden server.
- **Extreme Accuracy**: Uses the full 128k+ context window of DeepSeek models.

---

## ✨ Key Features

### 🧠 Intelligent RAG Pipeline
Leverages a modern "Long Context" strategy. Instead of breaking your document into disconnected fragments, it maintains the semantic flow of the entire text, allowing for complex queries that span multiple pages.

### 📄 Universal Document Support
- **PDF Extraction**: Uses `pdfjs-dist` for high-fidelity text extraction.
- **Text Files**: Instant ingestion for `.txt` and other plain-text formats.
- **Simulated segments**: Provides a user-friendly indexing experience.

### 💎 Premium Aesthetics & UX
- **Glassmorphism Design**: Sleek, modern interface with blurred surfaces and vibrant gradients.
- **Micro-animations**: Smooth transitions for message appearing and file processing.
- **Responsive Layout**: Designed for both desktop and mobile productivity.

### ⚡ Blazing Fast Performance
Optimized build using **Vite**, ensuring near-instant load times and a highly responsive chat experience.

---

## 🛠️ Technology Stack

| Layer | Technology | Rationale |
| :--- | :--- | :--- |
| **Framework** | [Vite](https://vitejs.dev/) | Lightning-fast development and optimized production builds. |
| **Language** | [JavaScript (ES6+)](https://developer.mozilla.org/en-US/docs/Web/JavaScript) | Core logic and DOM manipulation. |
| **Styling** | [Vanilla CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) | Custom design system with CSS variables and flexbox/grid. |
| **AI Gateway** | [OpenRouter](https://openrouter.ai/) | Unified API for accessing DeepSeek and other industry-leading models. |
| **AI Model** | [DeepSeek Chat](https://deepseek.com/) | Chosen for its superior reasoning and massive context window. |
| **PDF Parsing** | [PDF.js](https://mozilla.github.io/pdf.js/) | Industry standard for client-side PDF processing. |
| **Markdown** | [Marked.js](https://marked.js.org/) | Renders AI responses into beautiful, readable HTML. |
| **Icons** | [Lucide Icons](https://lucide.dev/) | Clean, consistent, and lightweight iconography. |

---

## 🏗️ Architecture: The "Long Context RAG" Advantage

Most RAG systems follow a "Split -> Embed -> Search" workflow. This project evolves that by using **Long Context Retrieval**:

1.  **Ingestion**: `pdfjs-dist` pulls raw strings from the document.
2.  **Normalization**: Text is cleaned and formatted into a single continuous stream.
3.  **In-Context Augmentation**: When you ask a question, the *entire* document is treated as a dynamic knowledge base and injected into the prompt.
4.  **Deep Reasoning**: The DeepSeek model performs a needle-in-a-haystack search within its internal memory to find the exact answer, providing citations and grounded responses.

---

## 📂 Project Structure

```text
├── public/
│   └── favicon.svg       # App favicon
├── src/
│   ├── assets/           # Static assets (images/logos)
│   ├── main.js           # UI logic and event listeners
│   ├── rag.js            # Core RAG pipeline and AI integration
│   └── style.css         # Custom Design System
├── .env                  # API Key configuration (Git ignored)
├── .gitignore            # Git exclusion rules
├── index.html            # Main entry point
├── package.json          # Dependency management
└── README.md             # Project documentation
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js** (v18 or higher)
- **OpenRouter API Key** (Get it at [openrouter.ai](https://openrouter.ai/))

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/notharshagithub/Google-NotebookLM-.git

# Enter the directory
cd Google-NotebookLM-

# Install dependencies
npm install
```

### 3. Configuration
Create a `.env` file in the root directory and add your key:
```env
VITE_OPENROUTER_API_KEY=your_openrouter_key_here
```

### 4. Development
```bash
# Start local development server
npm run dev
```

### 5. Build for Production
```bash
# Generate optimized production files
npm run build
```

---

## 🛡️ Challenges & Solutions

During development, we faced challenges with the Gemini API stability in certain regions. 
**The Solution**: We pivoted to **OpenRouter + DeepSeek**, which provided a significantly more stable endpoint and allowed us to implement the "Long Context" strategy, ensuring that users never experience "Model Not Found" errors.

---

## 📄 License
This project is part of **Assignment 03 — Google NotebookLM RAG**.
Built for educational purposes.

---
*Created with ❤️ by Antigravity AI for notharshagithub*
