// Utility for Hugging Face Inference API image generation

const HUGGINGFACE_TOKEN = import.meta.env.VITE_HF_TOKEN ||;
const DEFAULT_MODEL = "stabilityai/stable-diffusion-xl-base-1.0";

export async function generateImageFromPrompt(prompt: string, model: string = DEFAULT_MODEL): Promise<string | null> {
  const response = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${HUGGINGFACE_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ inputs: prompt })
  });

  if (!response.ok) {
    return null;
  }

  // The API returns an image as a blob if successful
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.startsWith("image/")) {
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  }

  // If not an image, try to parse error message
  try {
    const data = await response.json();
    if (data.error) {
      throw new Error(data.error);
    }
  } catch (e) {
    // ignore
  }
  return null;
}

export async function generateAudioFromPrompt(prompt: string, model: string = "facebook/musicgen-small") : Promise<string | null> {
  const response = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${HUGGINGFACE_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ inputs: prompt })
  });

  if (!response.ok) {
    return null;
  }

  const contentType = response.headers.get("content-type");
  if (contentType && contentType.startsWith("audio/")) {
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  }

  // If not audio, try to parse error message
  try {
    const data = await response.json();
    if (data.error) {
      throw new Error(data.error);
    }
  } catch (e) {
    // ignore
  }
  return null;
} 