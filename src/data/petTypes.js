export const PET_TYPES = {
  ironback: {
    id: 'ironback',
    name: 'Ironback',
    category: 'fitness',
    description: 'Creatura corazzata, muscolare, tipo tartaruga/golem',
    palette: ['#EF4444', '#F97316', '#9CA3AF'],
    emoji: '🏋️',
  },
  lumino: {
    id: 'lumino',
    name: 'Lumino',
    category: 'learning',
    description: 'Creatura luminosa con occhi grandi, tipo gufo/volpe arcana',
    palette: ['#3B82F6', '#EAB308', '#FFFFFF'],
    emoji: '📚',
  },
  zephyr: {
    id: 'zephyr',
    name: 'Zephyr',
    category: 'mindfulness',
    description: 'Creatura eterea, fluttuante, tipo medusa/spirito',
    palette: ['#A855F7', '#06B6D4', '#E2E8F0'],
    emoji: '🧘',
  },
  gearling: {
    id: 'gearling',
    name: 'Gearling',
    category: 'productivity',
    description: 'Creatura meccanica, precisa, tipo robot/insetto steampunk',
    palette: ['#6B7280', '#F59E0B', '#B45309'],
    emoji: '💼',
  },
  bloomie: {
    id: 'bloomie',
    name: 'Bloomie',
    category: 'health',
    description: 'Creatura naturale, rigogliosa, tipo pianta/drago verde',
    palette: ['#22C55E', '#EC4899', '#92400E'],
    emoji: '🍎',
  },
  prismo: {
    id: 'prismo',
    name: 'Prismo',
    category: 'balanced',
    description: 'Creatura prismatica che combina tratti di tutti',
    palette: ['#00D4FF', '#A855F7', '#22C55E', '#F59E0B', '#EF4444'],
    emoji: '✨',
  },
};

export const PET_STAGES = {
  cucciolo: { id: 'cucciolo', name: 'Cucciolo', minLevel: 1, maxLevel: 3, emoji: '🥚' },
  giovane: { id: 'giovane', name: 'Giovane', minLevel: 4, maxLevel: 6, emoji: '🐣' },
  adulto: { id: 'adulto', name: 'Adulto', minLevel: 7, maxLevel: 9, emoji: '🐲' },
  leggendario: { id: 'leggendario', name: 'Leggendario', minLevel: 10, maxLevel: Infinity, emoji: '👑' },
};

export const PET_SKINS = {
  default: { id: 'default', name: 'Originale', description: 'Aspetto originale' },
  cristallina: { id: 'cristallina', name: 'Cristallina', description: 'Variante cristallina scintillante' },
  ombra: { id: 'ombra', name: 'Ombra', description: 'Variante oscura e misteriosa' },
  rocciosa: { id: 'rocciosa', name: 'Rocciosa', description: 'Variante minerale e solida' },
  elettrica: { id: 'elettrica', name: 'Elettrica', description: 'Variante elettrica e tempestosa' },
  infernale: { id: 'infernale', name: 'Infernale', description: 'Variante infuocata' },
  glaciale: { id: 'glaciale', name: 'Glaciale', description: 'Variante di ghiaccio eterno' },
};

export const CATEGORIES = {
  fitness: { id: 'fitness', name: 'Fitness', emoji: '🏋️', color: '#EF4444' },
  learning: { id: 'learning', name: 'Apprendimento', emoji: '📚', color: '#3B82F6' },
  mindfulness: { id: 'mindfulness', name: 'Mindfulness', emoji: '🧘', color: '#A855F7' },
  productivity: { id: 'productivity', name: 'Produttività', emoji: '💼', color: '#F59E0B' },
  health: { id: 'health', name: 'Salute', emoji: '🍎', color: '#22C55E' },
  custom: { id: 'custom', name: 'Custom', emoji: '✨', color: '#00D4FF' },
};
