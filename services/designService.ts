
import { RoomType, DesignStyle, DesignResult } from '../types';

const HISTORY_KEY = 'lumina_design_history';

/**
 * High-fidelity Mock Image Database
 * Mapped by [RoomType][DesignStyle]
 */
const MOCK_IMAGE_POOL: Record<string, Record<string, string[]>> = {
  [RoomType.LIVING_ROOM]: {
    [DesignStyle.MODERN]: [
      'https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1583847268964-b28dc2f51ac9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1505691938895-1758d7eaa511?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80'
    ],
    [DesignStyle.LUXURY]: [
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ],
    [DesignStyle.JAPANDI]: [
      'https://images.unsplash.com/photo-1615529328331-f8917597711f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1615873968403-89e068629275?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1617103996702-96ff29b1c467?auto=format&fit=crop&w=1200&q=80'
    ],
    [DesignStyle.MINIMALIST]: [
      'https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  [RoomType.BEDROOM]: {
    [DesignStyle.MODERN]: [
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80'
    ],
    [DesignStyle.SCANDINAVIAN]: [
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1200&q=80'
    ],
    [DesignStyle.LUXURY]: [
      'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1616594831707-320d03a4f222?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  [RoomType.KITCHEN]: {
    [DesignStyle.INDUSTRIAL]: [
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1528697203043-733dafaba316?auto=format&fit=crop&w=1200&q=80'
    ],
    [DesignStyle.MODERN]: [
      'https://images.unsplash.com/photo-1556909212-d5b604ad056f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dcea46e99?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  [RoomType.OFFICE]: {
    [DesignStyle.MINIMALIST]: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80'
    ],
    [DesignStyle.MODERN]: [
      'https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  [RoomType.BATHROOM]: {
    [DesignStyle.LUXURY]: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=80'
    ],
    [DesignStyle.MODERN]: [
      'https://images.unsplash.com/photo-1620626011761-9963d7b59a7a?auto=format&fit=crop&w=1200&q=80'
    ]
  }
};

// Fallback image if category combination is missing
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80';

const STYLE_META: Record<DesignStyle, { palette: string[], brief: string, recs: string[] }> = {
  [DesignStyle.MODERN]: {
    palette: ['#2C3E50', '#ECF0F1', '#34495E', '#BDC3C7'],
    brief: 'Focuses on clean lines, geometric shapes, and a monochromatic color palette for a sleek, functional atmosphere.',
    recs: ['Integrate low-profile seating', 'Use accent lighting on textures', 'Incorporate matte black hardware']
  },
  [DesignStyle.MINIMALIST]: {
    palette: ['#FFFFFF', '#F5F5F5', '#E0E0E0', '#9E9E9E'],
    brief: 'Emphasizes "less is more" with sparse furniture, hidden storage, and an abundance of negative space.',
    recs: ['Declutter all surfaces', 'Focus on single high-quality materials', 'Maximize natural light infiltration']
  },
  [DesignStyle.LUXURY]: {
    palette: ['#1A1A1A', '#D4AF37', '#E5E4E2', '#2F4F4F'],
    brief: 'A grand architectural statement utilizing opulent materials like marble, gold leaf, and velvet textures.',
    recs: ['Add a statement chandelier', 'Layer multiple high-end rugs', 'Install floor-to-ceiling drapery']
  },
  [DesignStyle.SCANDINAVIAN]: {
    palette: ['#F8F9FA', '#D3D3D3', '#8E9775', '#E28E8E'],
    brief: 'Blending functionality with beauty through light woods, organic textiles, and soft, warm tones.',
    recs: ['Add "Hygge" elements like throws', 'Use light oak flooring', 'Introduce indoor greenery']
  },
  [DesignStyle.INDUSTRIAL]: {
    palette: ['#4B4B4B', '#A52A2A', '#DCDCDC', '#000000'],
    brief: 'Raw, unfinished look inspired by urban factories. Features exposed brick, pipes, and weathered wood.',
    recs: ['Leave structural elements exposed', 'Use metal-framed furniture', 'Introduce leather accents']
  },
  [DesignStyle.BOHEMIAN]: {
    palette: ['#8B4513', '#DEB887', '#556B2F', '#CD853F'],
    brief: 'A vibrant, eclectic mix of patterns, vintage furniture, and a global, free-spirited aesthetic.',
    recs: ['Mix varied textile patterns', 'Use floor cushions and low tables', 'Display hand-crafted artifacts']
  },
  [DesignStyle.ART_DECO]: {
    palette: ['#000000', '#D4AF37', '#223344', '#E5E4E2'],
    brief: 'Glamorous and symmetrical, defined by bold geometric patterns and luxurious lacquered finishes.',
    recs: ['Use sunburst patterns', 'Incorporate mirrored furniture', 'Choose jewel-toned upholstery']
  },
  [DesignStyle.FARMHOUSE]: {
    palette: ['#F5F5DC', '#8B4513', '#FFFFFF', '#2F4F4F'],
    brief: 'Warm, rustic charm with a modern twist. Emphasizes reclaimed wood, shiplap, and cozy furnishings.',
    recs: ['Install apron-front sinks', 'Use barn-door sliding mechanisms', 'Feature exposed wooden beams']
  },
  [DesignStyle.JAPANDI]: {
    palette: ['#EAE7E2', '#C0B7B1', '#403D39', '#F5F5F5'],
    brief: 'The perfect fusion of Japanese aesthetic and Scandinavian functionality. Zen meets comfort.',
    recs: ['Focus on paper lanterns', 'Keep furniture low to the ground', 'Use a neutral, earth-toned palette']
  }
};

export const designService = {
  generateDesign: async (image: string, roomType: RoomType, style: DesignStyle): Promise<DesignResult> => {
    // Simulate network and processing latency (AI "Thinking")
    await new Promise(resolve => setTimeout(resolve, 5000));

    try {
      // 1. Image Selection Logic
      const pool = MOCK_IMAGE_POOL[roomType]?.[style] || [];
      const generatedImage = pool.length > 0 
        ? pool[Math.floor(Math.random() * pool.length)] 
        : FALLBACK_IMAGE;

      // 2. Metadata Extraction
      const meta = STYLE_META[style];

      // 3. Create Result Object
      const result: DesignResult = {
        id: 'd_' + Date.now(),
        originalImage: image,
        generatedImage,
        roomType,
        style,
        palette: meta.palette,
        recommendations: meta.recs,
        description: `Visual reconstruction of your ${roomType} using ${style} principles. ${meta.brief}`,
        createdAt: new Date().toISOString()
      };

      // 4. Persistence
      const history = designService.getHistory();
      localStorage.setItem(HISTORY_KEY, JSON.stringify([result, ...history]));
      
      return result;
    } catch (error) {
      console.error("Mock Design Service Error:", error);
      throw new Error("The neural design engine encountered a simulated conflict.");
    }
  },

  getHistory: (): DesignResult[] => {
    const data = localStorage.getItem(HISTORY_KEY);
    return data ? JSON.parse(data) : [];
  },

  deleteDesign: (id: string) => {
    const history = designService.getHistory().filter(d => d.id !== id);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  }
};
