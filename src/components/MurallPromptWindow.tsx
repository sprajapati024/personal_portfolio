import { useState } from 'react';

interface MurallPromptWindowProps {
  onGenerate: (prompt: string) => void;
  isGenerating: boolean;
}

export const MurallPromptWindow: React.FC<MurallPromptWindowProps> = ({
  onGenerate,
  isGenerating
}) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isGenerating) {
      onGenerate(prompt.trim());
    }
  };

  const examplePrompts = [
    'A pixel art Tesla under a vibrant sunset',
    'Retro Windows XP bliss wallpaper with neon colors',
    'Abstract geometric patterns in blue and purple',
    'Peaceful mountain landscape in minimal style',
  ];

  return (
    <div
      className="h-full flex flex-col p-4"
      style={{
        fontFamily: 'var(--font-tahoma)',
        background: '#c0c0c0',
      }}
    >
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-lg font-bold mb-1" style={{ color: '#000080' }}>
          AI Wallpaper Generator
        </h2>
        <p className="text-xs text-gray-700">
          Describe your dream wallpaper and let AI bring it to life!
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
        {/* Prompt Input */}
        <div className="mb-4">
          <label
            htmlFor="prompt-input"
            className="block text-xs font-bold mb-2"
          >
            Enter your prompt:
          </label>
          <textarea
            id="prompt-input"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., A cyberpunk city at night with neon lights..."
            disabled={isGenerating}
            className="w-full h-24 px-2 py-1 text-xs border-2 resize-none"
            style={{
              borderTopColor: '#808080',
              borderLeftColor: '#808080',
              borderRightColor: '#ffffff',
              borderBottomColor: '#ffffff',
              background: '#ffffff',
              color: '#000000',
              fontFamily: 'var(--font-tahoma)',
            }}
            maxLength={500}
          />
          <div className="text-xs text-gray-600 mt-1">
            {prompt.length}/500 characters
          </div>
        </div>

        {/* Example Prompts */}
        <div className="mb-4">
          <p className="text-xs font-bold mb-2">Try these examples:</p>
          <div className="space-y-1">
            {examplePrompts.map((example, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setPrompt(example)}
                disabled={isGenerating}
                className="block w-full text-left px-2 py-1 text-xs hover:bg-gray-300 disabled:opacity-50"
                style={{
                  background: '#ffffff',
                  border: '1px solid #808080',
                  color: '#000080',
                }}
              >
                {example}
              </button>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <div className="mt-auto">
          <button
            type="submit"
            disabled={!prompt.trim() || isGenerating}
            className="w-full px-4 py-2 border-2 font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300"
            style={{
              borderTopColor: '#ffffff',
              borderLeftColor: '#ffffff',
              borderRightColor: '#808080',
              borderBottomColor: '#808080',
              backgroundColor: '#c0c0c0',
              color: '#000000',
            }}
          >
            {isGenerating ? 'Generating...' : 'Generate Wallpaper'}
          </button>

          {isGenerating && (
            <div className="mt-3 flex items-center justify-center gap-2">
              <div className="text-xs text-gray-700">
                Creating your wallpaper... This may take 10-30 seconds.
              </div>
            </div>
          )}
        </div>
      </form>

      {/* Info Footer */}
      <div
        className="mt-4 p-2 border-2 text-xs text-gray-700"
        style={{
          borderTopColor: '#808080',
          borderLeftColor: '#808080',
          borderRightColor: '#ffffff',
          borderBottomColor: '#ffffff',
          background: '#ffffcc',
        }}
      >
        <strong>Tip:</strong> Be specific! Mention style, colors, mood, and details for best results.
      </div>
    </div>
  );
};
