import * as pdfjsLib from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.mjs?url';

// Set worker path for PDF.js using local worker from the package
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export class RAGPipeline {
  constructor() {
    this.fullText = "";
    this.isProcessing = false;
    this.fileName = "";
  }

  async processDocument(file) {
    this.isProcessing = true;
    this.fileName = file.name;
    try {
      let text = "";
      if (file.type === "application/pdf") {
        text = await this.extractTextFromPDF(file);
      } else {
        text = await file.text();
      }

      this.fullText = text.trim();
      const simulatedChunkCount = Math.ceil(this.fullText.length / 1000);
      
      return { success: true, chunkCount: simulatedChunkCount };
    } catch (error) {
      console.error("Processing error:", error);
      return { success: false, error: error.message };
    } finally {
      this.isProcessing = false;
    }
  }

  async extractTextFromPDF(file) {
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;
    let fullText = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const strings = content.items.map(item => item.str);
      fullText += strings.join(" ") + "\n";
    }
    return fullText;
  }

  async query(userQuery) {
    if (!this.fullText) {
      throw new Error("No document processed yet.");
    }

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": window.location.origin,
          "X-Title": "NotebookLM Clone"
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-chat", // Very stable and accurate for RAG
          messages: [
            { 
              role: "system", 
              content: `You are an AI Assistant who helps resolving the user query based on the provided document content.
              
              Instructions:
              - Answer the user's question ONLY using the information provided in the document.
              - If the answer is not in the document, say you don't know.
              - Use Markdown for formatting.`
            },
            { 
              role: "user", 
              content: `Document Content (${this.fileName}):\n---\n${this.fullText}\n---\n\nUser Query: ${userQuery}` 
            }
          ]
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || "OpenRouter API request failed");
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error("Generation error:", error);
      throw new Error(`Failed to generate answer: ${error.message}`);
    }
  }
}
