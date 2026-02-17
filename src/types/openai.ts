/**
 * Types for OpenAI-compatible API
 * Used for Clawdbot integration
 */

export interface OpenAIChatContentPartText {
  type: "text";
  text: string;
}

export interface OpenAIChatContentPartImageUrl {
  type: "image_url";
  image_url: { url: string };
}

// OpenAI-compatible content parts (we primarily support text and image_url parts)
export type OpenAIChatContentPart =
  | OpenAIChatContentPartText
  | OpenAIChatContentPartImageUrl
  | {
      type: string;
      [key: string]: unknown;
    };

export type OpenAIChatMessageContent = string | OpenAIChatContentPart[];

export interface OpenAIChatMessage {
  role: "system" | "user" | "assistant";
  content: OpenAIChatMessageContent;
}

/**
 * OpenAI function/tool parameter schema (JSON Schema subset)
 */
export interface OpenAIFunctionParameters {
  type: string;
  properties?: Record<string, unknown>;
  required?: string[];
  [key: string]: unknown;
}

export interface OpenAIFunction {
  name: string;
  description?: string;
  parameters?: OpenAIFunctionParameters;
}

export interface OpenAITool {
  type: "function";
  function: OpenAIFunction;
}

export interface OpenAIChatRequest {
  model: string;
  messages: OpenAIChatMessage[];
  stream?: boolean;
  temperature?: number;
  max_tokens?: number;
  top_p?: number;
  frequency_penalty?: number;
  presence_penalty?: number;
  user?: string; // Used for session mapping
  tools?: OpenAITool[]; // OpenAI function-calling tools (from OpenClaw skills)
}

export interface OpenAIChatResponseChoice {
  index: number;
  message: {
    role: "assistant";
    content: string;
  };
  finish_reason: "stop" | "length" | "content_filter" | null;
}

export interface OpenAIChatResponse {
  id: string;
  object: "chat.completion";
  created: number;
  model: string;
  choices: OpenAIChatResponseChoice[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export interface OpenAIChatChunkDelta {
  role?: "assistant";
  content?: string;
}

export interface OpenAIChatChunkChoice {
  index: number;
  delta: OpenAIChatChunkDelta;
  finish_reason: "stop" | "length" | "content_filter" | null;
}

export interface OpenAIChatChunk {
  id: string;
  object: "chat.completion.chunk";
  created: number;
  model: string;
  choices: OpenAIChatChunkChoice[];
}

export interface OpenAIModel {
  id: string;
  object: "model";
  owned_by: string;
  created?: number;
}

export interface OpenAIModelList {
  object: "list";
  data: OpenAIModel[];
}

export interface OpenAIError {
  error: {
    message: string;
    type: string;
    code: string | null;
  };
}
