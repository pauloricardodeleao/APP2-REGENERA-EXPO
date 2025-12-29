/*
═══════════════════════════════════════════════════════════════════════════════
  REGENERA BANK - CORE TRANSACTION SERVICE
  Module: AI Cognitive Engine (Rapha AI)
═══════════════════════════════════════════════════════════════════════════════
*/

// [FILE] services/raphaAI.ts
import { GoogleGenAI } from "@google/genai";
import { MOCK_USER } from "../constants";
import { formatCurrency } from "./formatters";

// Secure API Key Retrieval from Environment
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("CRITICAL: API_KEY is undefined. AI services will operate in fallback mode.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY || "" });

const FINANCIAL_CONTEXT = {
  user: MOCK_USER.name,
  balance: formatCurrency(MOCK_USER.balance),
  creditCard: {
    limit: formatCurrency(350000),
    currentInvoice: formatCurrency(245080),
    dueDate: "10/06/2025"
  },
  spendingAnalysis: {
    topCategory: "Alimentação (Food)",
    topCategoryAmount: formatCurrency(185000),
    totalSpentMonth: formatCurrency(510000),
    anomalies: "Gasto 15% acima da média em Lazer."
  },
  investments: {
    profile: "Moderado",
    totalInvested: formatCurrency(15000000),
    cdb: "110% CDI",
    crypto: "Bitcoin, Ethereum"
  }
};

const SYSTEM_INSTRUCTION = `
Você é a Rapha AI, assistente financeira de elite do Regenera Bank.
Expertise: Finanças pessoais, investimentos ESG e Wealth Management.

DADOS DO CLIENTE (RAG Context):
Nome: ${FINANCIAL_CONTEXT.user} | Saldo: ${FINANCIAL_CONTEXT.balance}
Cartão: ${FINANCIAL_CONTEXT.creditCard.currentInvoice} (Vence: ${FINANCIAL_CONTEXT.creditCard.dueDate})

DIRETRIZES:
1. Respostas concisas.
2. Formatação Markdown (**valores**).
3. Nunca invente dados.
`;

const generateWithRetry = async (
  userMessage: string, 
  history: {role: 'user' | 'model', parts: [{text: string}]}[],
  retries = 3
): Promise<string> => {
  if (!API_KEY) return "Serviço de IA não configurado. Verifique as chaves do sistema.";
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history,
        { role: 'user', parts: [{ text: userMessage }] }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        thinkingConfig: { thinkingBudget: 0 }
      }
    });

    return response.text || "Sem resposta do motor neural.";
  } catch (error) {
    if (retries > 0) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return generateWithRetry(userMessage, history, retries - 1);
    }
    return "Conexão neural instável. Tente novamente.";
  }
};

export const generateRaphaResponse = async (userMessage: string, chatHistory: {role: 'user' | 'model', parts: [{text: string}]}[]): Promise<string> => {
  return await generateWithRetry(userMessage, chatHistory);
};