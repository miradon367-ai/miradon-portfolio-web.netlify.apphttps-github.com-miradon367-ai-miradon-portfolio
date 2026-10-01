import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Extracts YouTube video ID from various YouTube URL formats
 */
export function getYoutubeId(url?: string): string | null {
  if (!url) return null;
  const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
  const match = url.match(regExp);
  return match && match[1] ? match[1] : null;
}

/**
 * Returns a valid high-res image URL, automatically converting YouTube links to maxres thumbnails
 */
export function getValidImageUrl(url?: string, fallback = "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200"): string {
  if (!url || typeof url !== "string") return fallback;
  const cleaned = url.trim();

  // If the user pasted a youtube watch link into the image field
  const youtubeId = getYoutubeId(cleaned);
  if (youtubeId) {
    return `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
  }

  // If it's a corrupted double URL e.g. "httphttps://.../images.unsplash.com..."
  if (cleaned.includes("https://images.unsplash.com") || cleaned.includes("http://images.unsplash.com")) {
    const idx = cleaned.indexOf("https://images.unsplash.com");
    if (idx !== -1) return cleaned.substring(idx);
  }

  if (cleaned.startsWith("http://") || cleaned.startsWith("https://") || cleaned.startsWith("/")) {
    return cleaned;
  }

  return fallback;
}

interface EmbedOptions {
  autoplay?: boolean;
  mute?: boolean;
  loop?: boolean;
}

/**
 * Converts standard YouTube watch/share links into clean embed URLs with full autoplay and device compatibility
 */
export function formatVideoEmbedUrl(
  url?: string,
  options: boolean | EmbedOptions = true
): string {
  if (!url) return "";
  const cleaned = url.trim();

  const opts: EmbedOptions =
    typeof options === "boolean"
      ? { autoplay: options, mute: false, loop: false }
      : { autoplay: true, mute: false, loop: false, ...options };

  const youtubeId = getYoutubeId(cleaned);
  if (youtubeId) {
    const params = new URLSearchParams({
      rel: "0",
      modestbranding: "1",
      playsinline: "1",
      enablejsapi: "1",
    });

    if (opts.autoplay) {
      params.set("autoplay", "1");
    }
    if (opts.mute) {
      params.set("mute", "1");
    }
    if (opts.loop) {
      params.set("loop", "1");
      params.set("playlist", youtubeId);
    }

    return `https://www.youtube.com/embed/${youtubeId}?${params.toString()}`;
  }

  if (cleaned.includes("vimeo.com")) {
    const match = cleaned.match(
      /vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/[^\/]*\/videos\/|album\/(?:\d+\/)?video\/|)(\d+)(?:$|\/|\?)/
    );
    if (match && match[1]) {
      const autoParam = opts.autoplay ? (opts.mute ? "?autoplay=1&muted=1" : "?autoplay=1") : "";
      return `https://player.vimeo.com/video/${match[1]}${autoParam}`;
    }
  }

  return cleaned;
}


