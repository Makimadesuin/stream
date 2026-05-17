function extractGDriveEmbedUrl(input) {
  if (!input || typeof input !== 'string') return input;
  const id = extractGDriveId(input);
  return id ? `https://drive.google.com/file/d/${id}/preview` : input;
}

function extractGDriveId(input) {
  if (!input || typeof input !== 'string') return null;
  let m = input.match(/\/file\/d\/([a-zA-Z0-9_-]+)\//);
  if (m) return m[1];
  m = input.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (m) return m[1];
  m = input.match(/(?:https?:\/\/)?drive\.google\.com\/open\?id=([a-zA-Z0-9_-]+)/);
  if (m) return m[1];
  m = input.match(/(?:https?:\/\/)?drive\.google\.com\/uc\?.*[&]?id=([a-zA-Z0-9_-]+)/);
  if (m) return m[1];
  m = input.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (m) return m[1];
  return null;
}

module.exports = { extractGDriveEmbedUrl, extractGDriveId };
