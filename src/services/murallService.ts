import OpenAI from 'openai';

// Type definitions
export interface WallpaperGenerationRequest {
  prompt: string;
  size?: '1024x1024' | '1792x1024' | '1024x1792';
  quality?: 'standard' | 'hd';
}

export interface WallpaperGenerationResult {
  imageUrl: string;
  revisedPrompt?: string;
}

export interface MurallError {
  message: string;
  retryable: boolean;
}

// Initialize OpenAI client
const getOpenAIClient = () => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error('OpenAI API key is not configured. Please add VITE_OPENAI_API_KEY to your .env file.');
  }

  return new OpenAI({
    apiKey,
    dangerouslyAllowBrowser: true // Note: In production, this should go through a backend proxy
  });
};

// Generate wallpaper using DALL·E 3
export const generateWallpaper = async (
  request: WallpaperGenerationRequest
): Promise<WallpaperGenerationResult> => {
  try {
    const client = getOpenAIClient();

    // Call OpenAI Images API (DALL·E 3)
    const response = await client.images.generate({
      model: 'dall-e-3',
      prompt: request.prompt,
      n: 1,
      size: request.size || '1024x1024',
      quality: request.quality || 'standard',
      response_format: 'url',
    });

    if (!response.data || response.data.length === 0) {
      throw new Error('No image data returned from API');
    }

    const imageData = response.data[0];

    if (!imageData?.url) {
      throw new Error('No image URL returned from API');
    }

    return {
      imageUrl: imageData.url,
      revisedPrompt: imageData.revised_prompt,
    };
  } catch (error) {
    console.error('Murall service error:', error);

    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        throw {
          message: 'OpenAI API key not configured. Please add your API key to the .env file.',
          retryable: false,
        } as MurallError;
      }

      if (error.message.includes('rate limit')) {
        throw {
          message: 'Rate limit exceeded. Please try again in a moment.',
          retryable: true,
        } as MurallError;
      }

      if (error.message.includes('content policy')) {
        throw {
          message: 'Your prompt violates content policy. Please try a different prompt.',
          retryable: false,
        } as MurallError;
      }

      throw {
        message: `Generation failed: ${error.message}`,
        retryable: true,
      } as MurallError;
    }

    throw {
      message: 'Something went wrong. Please try again.',
      retryable: true,
    } as MurallError;
  }
};

// Save image to local storage (download to user's device)
export const saveImageToDevice = async (imageUrl: string, filename: string = 'murall-wallpaper.png'): Promise<void> => {
  try {
    // Try to fetch with CORS mode first
    try {
      const response = await fetch(imageUrl, { mode: 'cors' });

      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        return;
      }
    } catch (fetchError) {
      // If CORS fetch fails, fall back to direct link method
      console.log('CORS fetch failed, using direct link method');
    }

    // Fallback: Create a direct link download (works for OpenAI URLs)
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = filename;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Save image error:', error);
    throw new Error('Failed to save image. Please try again.');
  }
};

// Generate filename with timestamp
export const generateFilename = (prompt: string): string => {
  const timestamp = new Date().getTime();
  const sanitizedPrompt = prompt
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .substring(0, 30);

  return `murall-${sanitizedPrompt}-${timestamp}.png`;
};
