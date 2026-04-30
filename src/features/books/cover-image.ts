const localCoverPreviewUrls = new Map<string, string>()

function getBackendAssetOrigin() {
  const apiUrl = import.meta.env.VITE_API_URL

  if (!apiUrl || !/^https?:\/\//.test(apiUrl)) {
    return ""
  }

  try {
    return new URL(apiUrl).origin
  } catch {
    return ""
  }
}

export function createCoverImagePath(file: File) {
  const safeFileName = file.name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "")

  return `/uploads/covers/${Date.now()}-${safeFileName || "cover-image"}`
}

export function registerLocalBookCoverPreview(coverImagePath: string, file: File) {
  const previousPreviewUrl = localCoverPreviewUrls.get(coverImagePath)

  if (previousPreviewUrl) {
    URL.revokeObjectURL(previousPreviewUrl)
  }

  const previewUrl = URL.createObjectURL(file)
  localCoverPreviewUrls.set(coverImagePath, previewUrl)

  return previewUrl
}

export function resolveBookCoverImageSrc(coverImage: string) {
  const trimmedCoverImage = coverImage.trim()

  if (!trimmedCoverImage) {
    return ""
  }

  const localPreviewUrl = localCoverPreviewUrls.get(trimmedCoverImage)

  if (localPreviewUrl) {
    return localPreviewUrl
  }

  if (/^(https?:|data:|blob:)/.test(trimmedCoverImage)) {
    return trimmedCoverImage
  }

  const backendAssetOrigin = getBackendAssetOrigin()

  if (!backendAssetOrigin) {
    return trimmedCoverImage
  }

  return new URL(
    trimmedCoverImage.startsWith("/")
      ? trimmedCoverImage
      : `/${trimmedCoverImage}`,
    backendAssetOrigin
  ).toString()
}
