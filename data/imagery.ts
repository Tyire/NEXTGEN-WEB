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
    "query": "fiber optic",
    "orientation": "landscape",
    "src": "/images/people/banner-connectivity",
    "alt": "Close-up of illuminated fiber optic lights in blue and green colors, showcasing modern technology.",
    "avgColor": "#0C3A4A",
    "photographer": "Atlantic Ambience",
    "photographerUrl": "https://www.pexels.com/@freestockpro"
  },
  "banner-voice": {
    "id": "banner-voice",
    "query": "communication tower",
    "orientation": "landscape",
    "src": "/images/people/banner-voice",
    "alt": "A low-angle shot of a tall metal communications tower with multiple antennas against a clear blue sky.",
    "avgColor": "#66829A",
    "photographer": "Edouard Matte",
    "photographerUrl": "https://www.pexels.com/@edouard-matte-50967295"
  },
  "banner-enterprise": {
    "id": "banner-enterprise",
    "query": "server room data center",
    "orientation": "landscape",
    "src": "/images/people/banner-enterprise",
    "alt": "Close-up of server racks in a data center highlighting modern technology infrastructure.",
    "avgColor": "#244D4F",
    "photographer": "panumas nikhomkhai",
    "photographerUrl": "https://www.pexels.com/@cookiecutter"
  },
  "banner-plans": {
    "id": "banner-plans",
    "query": "lagos nigeria city skyline",
    "orientation": "landscape",
    "src": "/images/people/banner-plans",
    "alt": "Scenic view of Lagos skyline featuring modern buildings and a motorboat in the lagoon under a bright sky.",
    "avgColor": "#A7B1A8",
    "photographer": "Onakoya Opeyemi",
    "photographerUrl": "https://www.pexels.com/@onakoya-opeyemi-316476857"
  },
  "banner-contact": {
    "id": "banner-contact",
    "query": "abstract network connection technology",
    "orientation": "landscape",
    "src": "/images/people/banner-contact",
    "alt": "A robotic hand reaching into a digital network on a blue background, symbolizing AI technology.",
    "avgColor": "#0F3F6D",
    "photographer": "Tara Winstead",
    "photographerUrl": "https://www.pexels.com/@tara-winstead"
  }
};

export const photoCredits = Object.values(imagery).filter((s) => s.src && s.photographer).map((s) => ({ name: s.photographer!, url: s.photographerUrl! }));
