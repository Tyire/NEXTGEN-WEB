// AUTO-UPDATED by scripts/fetch-images.ts — slot definitions + fetched metadata.
export type ImageSlot = { id: string; query: string; orientation: 'landscape'|'portrait'|'square'; src: string|null; alt: string; avgColor: string; photographer: string|null; photographerUrl: string|null };

export const imagery: Record<string, ImageSlot> = {
  "hero": {
    "id": "hero",
    "query": "family relaxing home laptop couch",
    "orientation": "landscape",
    "src": "/images/people/hero",
    "alt": "Elderly woman working on a laptop at home while grandchildren relax on the couch.",
    "avgColor": "#7C6750",
    "photographer": "cottonbro studio",
    "photographerUrl": "https://www.pexels.com/@cottonbro"
  },
  "fiber": {
    "id": "fiber",
    "query": "african family happy at home together sofa",
    "orientation": "landscape",
    "src": "/images/people/fiber",
    "alt": "Full body of cheerful African American parents with children looking at camera while sitting on sofa in room with fireplace",
    "avgColor": "#9C8770",
    "photographer": "Monstera Production",
    "photographerUrl": "https://www.pexels.com/@gabby-k"
  },
  "voice": {
    "id": "voice",
    "query": "professional call center agent headset office team",
    "orientation": "portrait",
    "src": "/images/people/voice",
    "alt": "A diverse team of customer service representatives wearing headsets and smiling.",
    "avgColor": "#ACA6A3",
    "photographer": "Mikhail Nilov",
    "photographerUrl": "https://www.pexels.com/@mikhail-nilov"
  },
  "enterprise": {
    "id": "enterprise",
    "query": "black african businessman laptop modern office",
    "orientation": "landscape",
    "src": "/images/people/enterprise",
    "alt": "Professional man sitting at a desk working on a laptop in a modern office environment.",
    "avgColor": "#D7D8D8",
    "photographer": "Thirdman",
    "photographerUrl": "https://www.pexels.com/@thirdman"
  },
  "why": {
    "id": "why",
    "query": "african entrepreneur small business owner laptop",
    "orientation": "landscape",
    "src": "/images/people/why",
    "alt": "Professional black woman smiling at desk using laptop and smartphone in office.",
    "avgColor": "#ACA59D",
    "photographer": "RDNE Stock project",
    "photographerUrl": "https://www.pexels.com/@rdne"
  },
  "banner-connectivity": {
    "id": "banner-connectivity",
    "query": "fiber optic patch panel",
    "orientation": "landscape",
    "src": "/images/people/banner-connectivity",
    "alt": "Fiber-optic patch panel with teal and yellow LC connectors plugged into a network switch.",
    "avgColor": "#080808",
    "photographer": "Brett Sayles",
    "photographerUrl": "https://www.pexels.com/@brett-sayles"
  },
  "banner-voice": {
    "id": "banner-voice",
    "query": "light trails signal motion",
    "orientation": "landscape",
    "src": "/images/people/banner-voice",
    "alt": "Long-exposure orange light trails swirling against a deep blue background.",
    "avgColor": "#586878",
    "photographer": "Jorge Ural",
    "photographerUrl": "https://www.pexels.com/@jorgeural"
  },
  "banner-enterprise": {
    "id": "banner-enterprise",
    "query": "abstract data center circuitry",
    "orientation": "landscape",
    "src": "/images/people/banner-enterprise",
    "alt": "Abstract 3D render of glowing orange data-center towers and circuitry.",
    "avgColor": "#080808",
    "photographer": "Pachon in Motion",
    "photographerUrl": "https://www.pexels.com/@pachon-in-motion-426015731"
  },
  "banner-plans": {
    "id": "banner-plans",
    "query": "fiber cables warm gradient",
    "orientation": "landscape",
    "src": "/images/people/banner-plans",
    "alt": "Slender fiber-optic cables curving across a warm pink and orange gradient.",
    "avgColor": "#f89898",
    "photographer": "Marek Piwnicki",
    "photographerUrl": "https://www.pexels.com/@marek-piwnicki-3907296"
  },
  "banner-contact": {
    "id": "banner-contact",
    "query": "contact nextgen office lagos",
    "orientation": "landscape",
    "src": "/images/people/banner-contact",
    "alt": "NextGen Telcoms contact — reach our team in Lagos.",
    "avgColor": "#181828",
    "photographer": null,
    "photographerUrl": null
  }
};

export const photoCredits = Object.values(imagery).filter((s) => s.src && s.photographer).map((s) => ({ name: s.photographer!, url: s.photographerUrl! }));
