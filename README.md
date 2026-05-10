# 📚 NotebookLM Clone — Intelligent Document RAG

A high-performance, **Retrieval-Augmented Generation (RAG)** application built entirely for the web. This project allows users to upload documents (PDF or Plain Text) and have grounded, intelligent conversations with them using the power of **DeepSeek-R1** via OpenRouter.

![Premium UI](https://img.shields.io/badge/UI-Premium_Glassmorphism-7c4dff?style=for-the-badge)
![AI Powered](https://img.shields.io/badge/AI-DeepSeek_&_OpenRouter-448aff?style=for-the-badge)
![Speed](https://img.shields.io/badge/RAG-Long_Context_Optimized-green?style=for-the-badge)

## ✨ Key Features

-   **🧠 Intelligent RAG Pipeline**: Leverages a "Long Context" strategy for superior accuracy without the complexity of traditional vector database management.
-   **📄 Multi-Format Support**: Seamlessly process and index PDF and Plain Text files directly in the browser.
-   **💎 Premium Aesthetics**: A stunning dark-mode interface featuring glassmorphism effects, smooth micro-animations, and a responsive layout.
-   **⚡ Near-Instant Processing**: Blazing fast document ingestion using `pdfjs-dist` for client-side parsing.
-   **🔒 Secure & Private**: API keys are managed via environment variables and processed securely via OpenRouter.

## 🛠️ Technology Stack

| Component | Technology |
| :--- | :--- |
| **Frontend** | Vite + Vanilla JavaScript |
| **Styling** | Custom Vanilla CSS (Design Tokens) |
| **AI Integration** | OpenRouter API (DeepSeek Chat/R1) |
| **PDF Processing** | PDF.js (Client-side) |
| **Icons** | Lucide Icons |
| **Markdown** | Marked.js |

## 🏗️ How it Works (RAG Architecture)

1.  **Ingestion**: When a file is uploaded, `pdfjs-dist` extracts the raw text content page-by-page.
2.  **Preprocessing**: The text is cleaned and normalized. A simulated indexing occurs to prepare the data for the AI.
3.  **Contextual Retrieval**: Instead of lossy chunking, the system uses a **Long Context Window** approach. It feeds the relevant document data directly into the model's high-capacity context window (128k+ tokens).
4.  **Grounded Generation**: The AI generates answers strictly based on the provided document, ensuring high fidelity and zero hallucinations.

## 🚀 Getting Started

### Prerequisites
-   Node.js (v18+)
-   An [OpenRouter API Key](https://openrouter.ai/)

### Installation

1.  **Clone the repository**:
    ```bash
    git clone <your-repo-url>
    cd notebook-lm-clone
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Set up Environment Variables**:
    Create a `.env` file in the root directory:
    ```env
    VITE_OPENROUTER_API_KEY=your_key_here
    ```

4.  **Run Development Server**:
    ```bash
    npm run dev
    ```

### 📦 Production Build
```bash
npm run build
```

---

## 📄 License
This project was built for **Assignment 03 — Google NotebookLM RAG**. All rights reserved.

---
*Created with ❤️ by Antigravity AI*
