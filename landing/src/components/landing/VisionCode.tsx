'use client';

import { useState } from 'react';
import ScrollReveal from '@/components/ui/ScrollReveal';

const mono = 'var(--font-mono, monospace)';

/* ════════ Official AI provider logos ════════ */
const OpenAIIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 256 260" fill="currentColor">
    <path d="M239.184 106.203a64.716 64.716 0 0 0-5.576-53.103C219.452 28.459 191 15.784 163.213 21.74A65.586 65.586 0 0 0 52.096 45.22a64.716 64.716 0 0 0-43.23 31.36c-14.31 24.602-11.061 55.634 8.033 76.74a64.665 64.665 0 0 0 5.525 53.102c14.174 24.65 42.644 37.324 70.446 31.36a64.72 64.72 0 0 0 48.754 21.744c28.481.025 53.714-18.361 62.414-45.481a64.767 64.767 0 0 0 43.229-31.36c14.137-24.558 10.875-55.423-8.083-76.483Zm-97.56 136.338a48.397 48.397 0 0 1-31.105-11.255l1.535-.87 51.67-29.825a8.595 8.595 0 0 0 4.247-7.367v-72.85l21.845 12.636c.218.111.37.32.409.563v60.367c-.056 26.818-21.783 48.545-48.601 48.601Zm-104.466-44.61a48.345 48.345 0 0 1-5.781-32.589l1.534.921 51.722 29.826a8.339 8.339 0 0 0 8.441 0l63.181-36.425v25.221a.87.87 0 0 1-.358.665l-52.335 30.184c-23.257 13.398-52.97 5.431-66.404-17.803ZM23.549 85.38a48.499 48.499 0 0 1 25.58-21.333v61.39a8.288 8.288 0 0 0 4.195 7.316l62.874 36.272-21.845 12.636a.819.819 0 0 1-.767 0L41.353 151.53c-23.211-13.454-31.171-43.144-17.804-66.405v.256Zm179.466 41.695-63.08-36.63L161.73 77.86a.819.819 0 0 1 .768 0l52.233 30.184a48.6 48.6 0 0 1-7.316 87.635v-61.391a8.544 8.544 0 0 0-4.4-7.213Zm21.742-32.69-1.535-.922-51.619-30.081a8.39 8.39 0 0 0-8.492 0L99.98 99.808V74.587a.716.716 0 0 1 .307-.665l52.233-30.133a48.652 48.652 0 0 1 72.236 50.391v.205ZM88.061 139.097l-21.845-12.585a.87.87 0 0 1-.41-.614V65.685a48.652 48.652 0 0 1 79.757-37.346l-1.535.87-51.67 29.825a8.595 8.595 0 0 0-4.246 7.367l-.051 72.697Zm11.868-25.58 28.138-16.217 28.188 16.218v32.434l-28.086 16.218-28.188-16.218-.052-32.434Z" />
  </svg>
);
const AnthropicIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.827 3.52h3.603L24 20h-3.603l-6.57-16.48zm-7.258 0h3.767L16.906 20h-3.674l-1.343-3.461H5.017l-1.344 3.46H0L6.57 3.522zm4.132 9.959L8.453 7.687 6.205 13.48H10.7z" />
  </svg>
);
const GoogleIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);
const MistralIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 256 233">
    <path d="M186.18 0h46.55v46.55h-46.55zM209.45 0H256v46.55h-46.55zM0 0h46.55v46.55H0zM0 46.55h46.55V93.1H0zM0 93.09h46.55v46.55H0zM0 139.64h46.55v46.55H0zM0 186.18h46.55v46.55H0z" fill="currentColor" />
    <path fill="#F7D046" d="M23.27 0h46.55v46.55H23.27z" />
    <path fill="#F2A73B" d="M209.45 46.55H256V93.1h-46.55zM23.27 46.55h46.55V93.1H23.27z" />
    <path d="M139.64 46.55h46.55V93.1h-46.55z" fill="currentColor" />
    <path fill="#F2A73B" d="M162.91 46.55h46.55V93.1h-46.55zM69.82 46.55h46.55V93.1H69.82z" />
    <path fill="#EE792F" d="M116.36 93.09h46.55v46.55h-46.55zM162.91 93.09h46.55v46.55h-46.55zM69.82 93.09h46.55v46.55H69.82z" />
    <path d="M93.09 139.64h46.55v46.55H93.09z" fill="currentColor" />
    <path fill="#EB5829" d="M116.36 139.64h46.55v46.55h-46.55z" />
    <path fill="#EE792F" d="M209.45 93.09H256v46.55h-46.55zM23.27 93.09h46.55v46.55H23.27z" />
    <path d="M186.18 139.64h46.55v46.55h-46.55z" fill="currentColor" />
    <path fill="#EB5829" d="M209.45 139.64H256v46.55h-46.55z" />
    <path d="M186.18 186.18h46.55v46.55h-46.55z" fill="currentColor" />
    <path fill="#EB5829" d="M23.27 139.64h46.55v46.55H23.27z" />
    <path fill="#EA3326" d="M209.45 186.18H256v46.55h-46.55zM23.27 186.18h46.55v46.55H23.27z" />
  </svg>
);

/* ════════ Provider configs ════════ */
type Provider = {
  id: string; label: string; Icon: React.FC<{ size?: number }>;
  pkgJs: string; pkgPy: string; client: string; goClient: string; model: string; feature: string;
  /* real SDK call shape */
  method: string;        // js / ruby method path
  methodPy: string;      // python method path
  inputKey: string;      // 'messages' | 'contents'
  inputVal: string;      // identifier passed
  maxTokens: boolean;    // whether max_tokens is required
  jsImport: string;      // import binding in JS (default or { named })
  jsCtor: string;        // constructor name for `new X()`
  pyImport: string;      // full python import line
  pyCtor: string;        // python constructor callable
};
const PROVIDERS: Provider[] = [
  // openai-node / openai-python:  client.chat.completions.create({ model, messages })
  { id: 'openai',    label: 'OpenAI',    Icon: OpenAIIcon,    pkgJs: 'openai',               pkgPy: 'openai',       client: 'OpenAI',      goClient: 'openai',    model: 'gpt-4o',               feature: 'summarization',
    method: 'chat.completions.create', methodPy: 'chat.completions.create', inputKey: 'messages', inputVal: 'messages', maxTokens: false,
    jsImport: 'OpenAI', jsCtor: 'OpenAI', pyImport: 'from openai import OpenAI', pyCtor: 'OpenAI' },
  // @anthropic-ai/sdk:  client.messages.create({ model, max_tokens, messages })
  { id: 'anthropic', label: 'Anthropic', Icon: AnthropicIcon, pkgJs: '@anthropic-ai/sdk',    pkgPy: 'anthropic',    client: 'Anthropic',   goClient: 'anthropic', model: 'claude-3-5-sonnet',    feature: 'chat-support',
    method: 'messages.create', methodPy: 'messages.create', inputKey: 'messages', inputVal: 'messages', maxTokens: true,
    jsImport: 'Anthropic', jsCtor: 'Anthropic', pyImport: 'from anthropic import Anthropic', pyCtor: 'Anthropic' },
  // @google/genai:  ai.models.generateContent({ model, contents })
  { id: 'google',    label: 'Google',    Icon: GoogleIcon,    pkgJs: '@google/genai',        pkgPy: 'google-genai', client: 'GoogleGenAI', goClient: 'genai',     model: 'gemini-1.5-pro',       feature: 'extraction',
    method: 'models.generateContent', methodPy: 'models.generate_content', inputKey: 'contents', inputVal: 'prompt', maxTokens: false,
    jsImport: '{ GoogleGenAI }', jsCtor: 'GoogleGenAI', pyImport: 'from google import genai', pyCtor: 'genai.Client' },
  // @mistralai/mistralai:  client.chat.complete({ model, messages })
  { id: 'mistral',   label: 'Mistral',   Icon: MistralIcon,   pkgJs: '@mistralai/mistralai', pkgPy: 'mistralai',    client: 'Mistral',     goClient: 'mistral',   model: 'mistral-large-latest', feature: 'classification',
    method: 'chat.complete', methodPy: 'chat.complete', inputKey: 'messages', inputVal: 'messages', maxTokens: false,
    jsImport: '{ Mistral }', jsCtor: 'Mistral', pyImport: 'from mistralai import Mistral', pyCtor: 'Mistral' },
];

/* ════════ Language configs + code generators ════════ */
const K  = (s: string) => `<span class="k">${s}</span>`;
const S  = (s: string) => `<span class="s">${s}</span>`;
const C  = (s: string) => `<span class="c">${s}</span>`;
const FN = (s: string) => `<span class="fn">${s}</span>`;
const P  = (s: string) => `<span class="p">${s}</span>`;
const V  = (s: string) => `<span class="v">${s}</span>`;
/* highlight a dotted method path, coloring only the final call segment */
const MHL = (m: string) => { const parts = m.split('.'); const last = parts.pop()!; return [...parts, `<span class="fn">${last}</span>`].join('.'); };

type Lang = { id: string; label: string; file: string; node: React.ReactNode; gen: (p: Provider) => string[] };

/* ── Official language logos (simple-icons paths, brand colors) ── */
const NodeLogo = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="#5FA04E"><path d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.57,0.329,0.924,0.944,0.924,1.603v10.15c0,0.659-0.354,1.273-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z M19.099,13.993c0-1.9-1.284-2.406-3.987-2.763c-2.731-0.361-3.009-0.548-3.009-1.187c0-0.528,0.235-1.233,2.258-1.233c1.807,0,2.473,0.389,2.747,1.607c0.024,0.115,0.129,0.199,0.247,0.199h1.141c0.071,0,0.138-0.031,0.186-0.081c0.048-0.054,0.074-0.123,0.067-0.196c-0.177-2.098-1.571-3.076-4.388-3.076c-2.508,0-4.004,1.058-4.004,2.833c0,1.925,1.488,2.457,3.895,2.695c2.88,0.282,3.103,0.703,3.103,1.269c0,0.983-0.789,1.402-2.642,1.402c-2.327,0-2.839-0.584-3.011-1.742c-0.02-0.124-0.126-0.215-0.253-0.215h-1.137c-0.141,0-0.254,0.112-0.254,0.253c0,1.482,0.806,3.248,4.655,3.248C17.501,17.007,19.099,15.91,19.099,13.993z" /></svg>
);
const PythonLogo = () => (
  <svg width="24" height="24" viewBox="0 0 24 24"><path fill="#3776AB" d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09z" /><path fill="#FFD43B" d="M21.1 6.11l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z" /></svg>
);
const GoLogo = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="#00ADD8"><path d="M1.811 10.231c-.047 0-.058-.023-.035-.059l.246-.315c.023-.035.081-.058.128-.058h4.172c.046 0 .058.035.035.07l-.199.303c-.023.036-.082.07-.117.07zM.047 11.306c-.047 0-.059-.023-.035-.058l.245-.316c.023-.035.082-.058.129-.058h5.328c.047 0 .07.035.058.07l-.093.28c-.012.047-.058.07-.105.07zm2.828 1.075c-.047 0-.059-.035-.035-.07l.163-.292c.023-.035.07-.07.117-.07h2.337c.047 0 .07.035.07.082l-.023.28c0 .047-.047.082-.082.082zm12.129-2.36c-.736.187-1.239.327-1.963.514-.176.046-.187.058-.34-.117-.174-.199-.303-.327-.548-.444-.737-.362-1.45-.257-2.115.175-.795.514-1.204 1.274-1.192 2.22.011.935.654 1.706 1.577 1.835.795.105 1.46-.175 1.987-.77.105-.13.198-.27.315-.434H10.47c-.245 0-.304-.152-.222-.35.152-.362.432-.97.596-1.274a.315.315 0 01.292-.187h4.253c-.023.316-.023.631-.07.947a4.983 4.983 0 01-.958 2.29c-.841 1.11-1.94 1.8-3.33 1.986-1.145.152-2.209-.07-3.143-.77-.865-.655-1.356-1.52-1.484-2.595-.152-1.274.222-2.419.993-3.424.83-1.086 1.928-1.776 3.272-2.02 1.098-.2 2.15-.07 3.096.571.62.41 1.063.97 1.356 1.648.07.105.023.164-.117.2m3.868 6.461c-1.064-.024-2.034-.328-2.852-1.029a3.665 3.665 0 01-1.262-2.255c-.21-1.32.152-2.489.947-3.529.853-1.122 1.881-1.706 3.272-1.95 1.192-.21 2.314-.095 3.33.595.923.63 1.496 1.484 1.648 2.605.198 1.578-.257 2.863-1.344 3.962-.771.783-1.718 1.273-2.805 1.495-.315.06-.63.07-.934.106zm2.78-4.72c-.011-.153-.011-.27-.034-.387-.21-1.157-1.274-1.81-2.384-1.554-1.087.245-1.788.935-2.045 2.033-.21.912.234 1.835 1.075 2.21.643.28 1.285.244 1.905-.07.923-.48 1.425-1.228 1.484-2.233z" /></svg>
);
const JavaLogo = () => (
  <svg width="24" height="24" viewBox="0 0 128 128">
    <path fill="#0074BD" d="M47.617 98.12s-4.767 2.774 3.397 3.71c9.892 1.13 14.947.968 25.845-1.092 0 0 2.871 1.795 6.873 3.351-24.439 10.47-55.308-.607-36.115-5.969zm-2.988-13.665s-5.348 3.959 2.823 4.805c10.567 1.091 18.91 1.18 33.354-1.6 0 0 1.993 2.025 5.132 3.131-29.542 8.64-62.446.68-41.309-6.336z" />
    <path fill="#EA2D2E" d="M69.802 61.271c6.025 6.935-1.58 13.17-1.58 13.17s15.289-7.891 8.269-17.777c-6.559-9.215-11.587-13.792 15.635-29.58 0 .001-42.731 10.67-22.324 34.187z" />
    <path fill="#0074BD" d="M102.123 108.229s3.529 2.91-3.888 5.159c-14.102 4.272-58.706 5.56-71.094.171-4.451-1.938 3.899-4.625 6.526-5.192 2.739-.593 4.303-.485 4.303-.485-4.953-3.487-32.013 6.85-13.743 9.815 49.821 8.076 90.817-3.637 77.896-9.468zM49.912 70.294s-22.686 5.389-8.033 7.348c6.188.828 18.518.638 30.011-.326 9.39-.789 18.813-2.474 18.813-2.474s-3.308 1.419-5.704 3.053c-23.042 6.061-67.544 3.238-54.731-2.958 10.832-5.239 19.644-4.643 19.644-4.643zm40.697 22.747c23.421-12.167 12.591-23.86 5.032-22.285-1.848.385-2.677.72-2.677.72s.688-1.079 2-1.543c14.953-5.255 26.451 15.503-4.823 23.725 0-.002.359-.327.468-.617z" />
    <path fill="#EA2D2E" d="M76.491 1.587S89.459 14.563 64.188 34.51c-20.266 16.006-4.621 25.13-.007 35.559-11.831-10.673-20.509-20.07-14.688-28.815C58.041 28.42 81.722 22.195 76.491 1.587z" />
    <path fill="#0074BD" d="M52.214 126.021c22.476 1.437 57-.8 57.817-11.436 0 0-1.571 4.032-18.577 7.231-19.186 3.612-42.854 3.191-56.887.874 0 .001 2.875 2.381 17.647 3.331z" />
  </svg>
);
const RubyLogo = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="#CC342D"><path d="M20.156.083c3.033.525 3.893 2.598 3.829 4.77L24 4.822 22.635 22.71 4.89 23.926h.016C3.433 23.864.15 23.729 0 19.139l1.645-3 2.819 6.586.503 1.172 2.805-9.144-.03.007.016-.03 9.255 2.956-1.396-5.431-.99-3.9 8.82-.569-.615-.51L16.5 2.114 20.159.073l-.003.01zM0 19.089zM5.13 5.073c3.561-3.533 8.157-5.621 9.922-3.84 1.762 1.777-.105 6.105-3.673 9.636-3.563 3.532-8.103 5.734-9.864 3.957-1.766-1.777.045-6.217 3.612-9.75l.003-.003z" /></svg>
);

const LANGS: Lang[] = [
  {
    id: 'node', label: 'Node.js', file: 'trace.ts',
    node: <NodeLogo />,
    gen: (p) => [
      `${K('import')} { Gantry } ${K('from')} ${S("'@gantry/sdk'")}`,
      `${K('import')} ${p.jsImport} ${K('from')} ${S(`'${p.pkgJs}'`)}`,
      ``,
      `${K('const')} gantry = ${K('new')} ${FN('Gantry')}({ apiKey: ${V('process')}.env.${S('GANTRY_KEY')} })`,
      C('// wrap once — same client, now traced'),
      `${K('const')} client = gantry.${FN('wrap')}(${K('new')} ${FN(p.jsCtor)}())`,
      ``,
      `${K('const')} res = ${K('await')} client.${MHL(p.method)}({`,
      `  model: ${S(`'${p.model}'`)},`,
      ...(p.maxTokens ? [`  max_tokens: ${V('1024')},`] : []),
      `  ${p.inputKey === p.inputVal ? p.inputVal : `${p.inputKey}: ${p.inputVal}`},`,
      `  ${P('gantry')}: { feature: ${S(`'${p.feature}'`)} },`,
      `})`,
    ],
  },
  {
    id: 'python', label: 'Python', file: 'trace.py',
    node: <PythonLogo />,
    gen: (p) => [
      `${K('from')} gantry ${K('import')} Gantry`,
      `${p.pyImport.replace('from ', K('from') + ' ').replace(' import ', ' ' + K('import') + ' ')}`,
      ``,
      `gantry = ${FN('Gantry')}(api_key=os.environ[${S('"GANTRY_KEY"')}])`,
      C('# wrap once — same client, now traced'),
      `client = gantry.${FN('wrap')}(${FN(p.pyCtor)}())`,
      ``,
      `res = client.${MHL(p.methodPy)}(`,
      `    model=${S(`"${p.model}"`)},`,
      ...(p.maxTokens ? [`    max_tokens=${V('1024')},`] : []),
      `    ${p.inputKey}=${p.inputVal},`,
      `    gantry={${S('"feature"')}: ${S(`"${p.feature}"`)}},`,
      `)`,
    ],
  },
  {
    id: 'go', label: 'Go', file: 'trace.go',
    node: <GoLogo />,
    gen: (p) => [
      `${K('import')} (`,
      `  ${S('"github.com/gantry/gantry-go"')}`,
      `)`,
      ``,
      `g := gantry.${FN('New')}(os.${FN('Getenv')}(${S('"GANTRY_KEY"')}))`,
      C('// wrap once — same client, now traced'),
      `client := g.${FN('Wrap')}(${p.goClient}.${FN('NewClient')}())`,
      ``,
      `res, _ := client.${MHL(p.method)}(ctx, gantry.Request{`,
      `    Model:    ${S(`"${p.model}"`)},`,
      ...(p.maxTokens ? [`    MaxTokens: ${V('1024')},`] : []),
      `    ${p.inputKey.charAt(0).toUpperCase() + p.inputKey.slice(1)}: ${p.inputVal},`,
      `    Gantry:   gantry.Tag{Feature: ${S(`"${p.feature}"`)}},`,
      `})`,
    ],
  },
  {
    id: 'java', label: 'Java', file: 'Trace.java',
    node: <JavaLogo />,
    gen: (p) => [
      `${K('import')} dev.gantry.Gantry;`,
      ``,
      `Gantry gantry = ${K('new')} ${FN('Gantry')}(System.${FN('getenv')}(${S('"GANTRY_KEY"')}));`,
      C('// wrap once — same client, now traced'),
      `${K('var')} client = gantry.${FN('wrap')}(${K('new')} ${FN(p.client + 'Client')}());`,
      ``,
      `${K('var')} res = client.${MHL(p.method)}(Request.${FN('builder')}()`,
      `    .${FN('model')}(${S(`"${p.model}"`)})`,
      ...(p.maxTokens ? [`    .${FN('maxTokens')}(${V('1024')})`] : []),
      `    .${FN(p.inputKey)}(${p.inputVal})`,
      `    .${FN('gantry')}(Tag.${FN('feature')}(${S(`"${p.feature}"`)}))`,
      `    .${FN('build')}());`,
    ],
  },
  {
    id: 'ruby', label: 'Ruby', file: 'trace.rb',
    node: <RubyLogo />,
    gen: (p) => [
      `${K('require')} ${S('"gantry"')}`,
      `${K('require')} ${S(`"${p.pkgPy}"`)}`,
      ``,
      `gantry = Gantry.${FN('new')}(api_key: ENV[${S('"GANTRY_KEY"')}])`,
      C('# wrap once — same client, now traced'),
      `client = gantry.${FN('wrap')}(${p.client}.${FN('new')})`,
      ``,
      `res = client.${MHL(p.method)}(`,
      `  model: ${S(`"${p.model}"`)},`,
      ...(p.maxTokens ? [`  max_tokens: ${V('1024')},`] : []),
      `  ${p.inputKey}: ${p.inputVal},`,
      `  gantry: { feature: ${S(`"${p.feature}"`)} }`,
      `)`,
    ],
  },
];

export default function VisionCode() {
  const [langId, setLangId] = useState('node');
  const [tabId, setTabId] = useState('openai');
  const [copied, setCopied] = useState(false);

  const lang = LANGS.find(l => l.id === langId)!;
  const provider = PROVIDERS.find(p => p.id === tabId)!;
  const lines = lang.gen(provider);

  const copy = () => {
    const plain = lines.map(l => l.replace(/<[^>]+>/g, '')).join('\n');
    navigator.clipboard?.writeText(plain);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };

  return (
    <section className="lp-sec lp-vision" id="integrate">
      <div className="lp-wrap" style={{ maxWidth: 1000 }}>

        {/* ── header ── */}
        <ScrollReveal>
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{
              width: 76, height: 76, borderRadius: 18, marginBottom: 28,
              background: 'linear-gradient(160deg, var(--bg-2), var(--bg-inset))',
              border: '1px solid var(--border-strong)',
              boxShadow: '0 12px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05), 0 0 0 1px rgba(0,229,153,0.08)',
              display: 'grid', placeItems: 'center', position: 'relative', overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(60% 60% at 50% 30%, rgba(0,229,153,0.18), transparent 70%)' }} />
              <svg width="34" height="34" viewBox="0 0 48 48" fill="none" style={{ position: 'relative' }}>
                <path d="M14 6 V42 M14 30 L34 13" stroke="#fff" strokeWidth="3.4" strokeLinecap="square" />
                <path d="M34 13 V42" stroke="var(--accent)" strokeWidth="3.4" strokeLinecap="square" />
              </svg>
            </div>

            <h2 style={{ fontSize: 'clamp(32px, 4.5vw, 52px)', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.05, margin: '0 0 18px' }}>
              <span style={{ color: 'var(--text-0)' }}>Integrate in </span>
              <span style={{
                background: 'linear-gradient(90deg, #FFFFFF 0%, var(--accent) 60%, var(--accent-700) 100%)',
                WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>one line of code</span>
            </h2>

            <p style={{ fontSize: 18, color: 'var(--text-2)', maxWidth: 580, lineHeight: 1.6, margin: 0 }}>
              A drop-in wrap around your existing client. SDKs for every language you ship in,
              and any OpenAI-compatible endpoint — no migration, no new infrastructure.
            </p>
          </div>
        </ScrollReveal>

        {/* ── language row ── */}
        <ScrollReveal>
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 12, margin: '44px 0 36px' }}>
            {LANGS.map(l => {
              const active = langId === l.id;
              return (
                <button key={l.id} onClick={() => setLangId(l.id)}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 9, background: 'transparent', border: 'none', cursor: 'pointer', padding: 0, width: 72 }}
                >
                  <span style={{
                    width: 58, height: 58, borderRadius: 12, display: 'grid', placeItems: 'center',
                    background: active ? 'var(--accent-soft)' : 'var(--bg-1)',
                    border: `1px solid ${active ? 'var(--accent-line)' : 'var(--border)'}`,
                    color: active ? 'var(--accent)' : 'var(--text-2)',
                    boxShadow: active ? '0 0 18px rgba(0,229,153,0.15)' : 'none',
                    transition: 'all 160ms',
                  }}>
                    {l.node}
                  </span>
                  <span style={{ fontSize: 12.5, color: active ? 'var(--text-0)' : 'var(--text-3)', fontWeight: active ? 600 : 400, transition: 'color 160ms' }}>{l.label}</span>
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* ── code editor ── */}
        <ScrollReveal>
          <div style={{ background: 'var(--bg-inset)', border: '1px solid var(--border-strong)', borderRadius: 12, overflow: 'hidden', boxShadow: '0 24px 60px rgba(0,0,0,0.55)' }}>
            {/* provider tabs */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '10px 12px', borderBottom: '1px solid var(--hair)', overflowX: 'auto' }}>
              {PROVIDERS.map(p => {
                const active = tabId === p.id;
                const Icon = p.Icon;
                return (
                  <button key={p.id} onClick={() => setTabId(p.id)}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 13px', borderRadius: 8, whiteSpace: 'nowrap',
                      fontSize: 13, cursor: 'pointer',
                      background: active ? 'var(--bg-2)' : 'transparent',
                      border: `1px solid ${active ? 'var(--border-strong)' : 'transparent'}`,
                      color: active ? 'var(--text-0)' : 'var(--text-3)',
                      fontWeight: active ? 500 : 400, transition: 'all 150ms',
                    }}
                  >
                    <span style={{ display: 'grid', placeItems: 'center', opacity: active ? 1 : 0.6, transition: 'opacity 150ms' }}>
                      <Icon size={16} />
                    </span>
                    {p.label}
                  </button>
                );
              })}
              <button onClick={copy} aria-label="Copy code"
                style={{ marginLeft: 'auto', flexShrink: 0, display: 'grid', placeItems: 'center', width: 32, height: 32, borderRadius: 7, cursor: 'pointer', background: 'transparent', border: '1px solid var(--border)', color: copied ? 'var(--accent)' : 'var(--text-3)', transition: 'all 150ms' }}
              >
                {copied
                  ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M20 6 9 17l-5-5" /></svg>
                  : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="11" height="11" rx="1.5" /><path d="M5 15V5a2 2 0 0 1 2-2h10" /></svg>}
              </button>
            </div>

            {/* code + line numbers */}
            <div style={{ display: 'flex', fontFamily: mono, fontSize: 13, lineHeight: '1.85', overflowX: 'auto' }}>
              <div style={{ flexShrink: 0, padding: '20px 0', borderRight: '1px solid var(--hair)', background: 'rgba(0,0,0,0.18)', textAlign: 'right', userSelect: 'none' }}>
                {lines.map((_, i) => <div key={i} style={{ padding: '0 14px', color: 'var(--text-4)' }}>{i + 1}</div>)}
              </div>
              <pre className="lp-code" style={{ margin: 0, padding: '20px 22px', flex: 1 }}>
                <code dangerouslySetInnerHTML={{ __html: lines.map(l => l || ' ').join('\n') }} />
              </pre>
            </div>

            {/* footer */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 18px', borderTop: '1px solid var(--hair)', background: 'var(--bg-1)' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'var(--accent)', fontFamily: mono }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 5px rgba(0,229,153,0.7)' }} />
                traced automatically
              </span>
              <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--text-4)', fontFamily: mono }}>{lang.file} · {provider.label}</span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
