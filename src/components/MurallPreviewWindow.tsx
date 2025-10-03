import { useState } from 'react';
import { saveImageToDevice, generateFilename } from '../services/murallService';

interface MurallPreviewWindowProps {
  imageUrl: string | null;
  revisedPrompt?: string;
  error: string | null;
  onSetWallpaper: (imageUrl: string) => void;
  onClearError: () => void;
}

export const MurallPreviewWindow: React.FC<MurallPreviewWindowProps> = ({
  imageUrl,
  revisedPrompt,
  error,
  onSetWallpaper,
  onClearError,
}) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  const handleDownload = async () => {
    if (!imageUrl) return;

    setIsDownloading(true);
    setDownloadError(null);

    try {
      const filename = generateFilename(revisedPrompt || 'wallpaper');
      await saveImageToDevice(imageUrl, filename);
    } catch (err) {
      setDownloadError(err instanceof Error ? err.message : 'Download failed');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleSetWallpaper = () => {
    if (imageUrl) {
      onSetWallpaper(imageUrl);
    }
  };

  // Error Dialog Component
  const ErrorDialog = ({ message, onClose }: { message: string; onClose: () => void }) => (
    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        className="bg-white border-2 shadow-lg w-80"
        style={{
          borderTopColor: '#ffffff',
          borderLeftColor: '#ffffff',
          borderRightColor: '#808080',
          borderBottomColor: '#808080',
        }}
      >
        {/* Title Bar */}
        <div
          className="h-6 px-2 flex items-center"
          style={{
            background: 'var(--window-title-bg)',
            fontFamily: 'var(--font-tahoma)',
          }}
        >
          <span className="text-xs font-bold text-white">Murall.exe</span>
        </div>

        {/* Content */}
        <div className="p-4 flex items-start gap-3">
          <div className="text-3xl">⚠️</div>
          <div className="flex-1">
            <p className="text-xs mb-4" style={{ fontFamily: 'var(--font-tahoma)' }}>
              {message}
            </p>
            <button
              onClick={onClose}
              className="px-4 py-1 border-2 text-xs font-bold hover:bg-gray-300"
              style={{
                borderTopColor: '#ffffff',
                borderLeftColor: '#ffffff',
                borderRightColor: '#808080',
                borderBottomColor: '#808080',
                backgroundColor: '#c0c0c0',
              }}
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div
      className="h-full flex flex-col"
      style={{
        fontFamily: 'var(--font-tahoma)',
        background: '#c0c0c0',
      }}
    >
      {/* Preview Area */}
      <div className="flex-1 flex items-center justify-center p-4 relative">
        {!imageUrl && !error && (
          <div className="text-center text-gray-600">
            <div className="text-6xl mb-4">🖼️</div>
            <p className="text-sm font-bold mb-1">No wallpaper generated yet.</p>
            <p className="text-xs">Enter a prompt in the Prompt window to begin.</p>
          </div>
        )}

        {imageUrl && (
          <div className="w-full h-full flex items-center justify-center">
            <div
              className="border-2 bg-white max-w-full max-h-full overflow-hidden"
              style={{
                borderTopColor: '#808080',
                borderLeftColor: '#808080',
                borderRightColor: '#ffffff',
                borderBottomColor: '#ffffff',
              }}
            >
              <img
                src={imageUrl}
                alt="Generated wallpaper"
                className="max-w-full max-h-[400px] object-contain"
              />
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      {imageUrl && (
        <div className="p-4 border-t-2" style={{ borderTopColor: '#ffffff' }}>
          <div className="flex gap-2">
            <button
              onClick={handleSetWallpaper}
              className="flex-1 px-4 py-2 border-2 font-bold text-sm hover:bg-gray-300"
              style={{
                borderTopColor: '#ffffff',
                borderLeftColor: '#ffffff',
                borderRightColor: '#808080',
                borderBottomColor: '#808080',
                backgroundColor: '#c0c0c0',
                color: '#000000',
              }}
            >
              Set as Wallpaper
            </button>
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="flex-1 px-4 py-2 border-2 font-bold text-sm disabled:opacity-50 hover:bg-gray-300"
              style={{
                borderTopColor: '#ffffff',
                borderLeftColor: '#ffffff',
                borderRightColor: '#808080',
                borderBottomColor: '#808080',
                backgroundColor: '#c0c0c0',
                color: '#000000',
              }}
            >
              {isDownloading ? 'Downloading...' : 'Download'}
            </button>
          </div>

          {downloadError && (
            <div className="mt-2 px-2 py-1 bg-red-100 border border-red-400 text-xs text-red-700">
              {downloadError}
            </div>
          )}
        </div>
      )}

      {/* Error Dialog */}
      {error && (
        <ErrorDialog
          message={error}
          onClose={onClearError}
        />
      )}
    </div>
  );
};
