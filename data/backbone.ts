// Transatlantic systems NextGen is connected to (per nextgen.ng: "redundant
// connections to trans-Atlantic submarine cables with automated failover
// support, including Equiano, MainOne, SAT-3 and WACS"). Coordinates are a
// representative landing point per system, for an ILLUSTRATIVE globe —
// not surveyed routes.

export const LAGOS: [number, number] = [6.45, 3.39];

export const backboneLandings: { cable: string; place: string; at: [number, number] }[] = [
  { cable: "WACS", place: "Highbridge, UK", at: [51.22, -2.97] },
  { cable: "Equiano", place: "Sesimbra, Portugal", at: [38.44, -9.1] },
  { cable: "MainOne", place: "Seixal, Portugal", at: [38.64, -8.95] },
  { cable: "SAT-3", place: "Melkbosstrand, South Africa", at: [-33.72, 18.44] },
];
