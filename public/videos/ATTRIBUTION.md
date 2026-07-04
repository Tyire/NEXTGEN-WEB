# Video attribution

- `hero-video.vid` — landing-page hero background.
  Source: `New-Banner.mp4` (client-supplied), transcoded for web
  (H.264, audio stripped, faststart) via ffmpeg. Served with a `.vid`
  extension and fetched as a blob (re-typed to video/mp4 in the browser)
  so IDM cannot hijack the request with a download popup.
