/// <reference types="vite/client" />

interface ImportMetaEnv {
  // No client-side environment variables needed
  // OpenAI API key is now handled server-side
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
