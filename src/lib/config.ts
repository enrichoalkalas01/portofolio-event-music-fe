export const API_URL =
    process.env.NEXT_PUBLIC_URL_API || "http://localhost:5800/api/v1";

export const IMAGE_BASE_URL = (
    process.env.NEXT_PUBLIC_IMAGE_BASE_URL ||
    "https://files.enrichoalkalas.my.id/portofolio-event-music"
).replace(/\/+$/, "");

export const FALLBACK_IMAGE = "/no-image-available.jpg";

export const SITE_NAME = "Endless Event Music";
export const SITE_TAGLINE = "Tiket konser & festival musik Indonesia";

type ImageLike = { name?: string; url?: string } | string | null | undefined;

// Resolves an uploaded object (as stored on events.thumbnail / images) to a public URL.
export function getImageUrl(image: ImageLike, fallback = FALLBACK_IMAGE): string {
    if (!image) return fallback;
    if (typeof image === "string") {
        if (!image) return fallback;
        return /^https?:\/\//.test(image) || image.startsWith("/")
            ? image
            : `${IMAGE_BASE_URL}/${image}`;
    }
    if (image.url) return image.url;
    if (image.name) return `${IMAGE_BASE_URL}/${image.name}`;
    return fallback;
}

export function getThumbnail(
    event: { thumbnail?: ImageLike[] | ImageLike; images?: ImageLike[] } | null | undefined,
): string {
    const thumb = Array.isArray(event?.thumbnail)
        ? event?.thumbnail?.[0]
        : event?.thumbnail;
    if (thumb) return getImageUrl(thumb);
    if (event?.images?.[0]) return getImageUrl(event.images[0]);
    return FALLBACK_IMAGE;
}
