
export enum RoomType {
  LIVING_ROOM = 'Living Room',
  BEDROOM = 'Bedroom',
  KITCHEN = 'Kitchen',
  OFFICE = 'Office',
  BATHROOM = 'Bathroom'
}

export enum DesignStyle {
  MODERN = 'Modern',
  MINIMALIST = 'Minimalist',
  LUXURY = 'Luxury',
  SCANDINAVIAN = 'Scandinavian',
  INDUSTRIAL = 'Industrial',
  BOHEMIAN = 'Bohemian',
  ART_DECO = 'Art Deco',
  FARMHOUSE = 'Farmhouse',
  JAPANDI = 'Japandi'
}

export enum LightingType {
  NATURAL = 'Natural',
  AMBIENT = 'Ambient',
  TASK = 'Task Lighting',
  ACCENT = 'Accent Lighting'
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface PlacedFurniture {
  id: string;
  assetId: string;
  x: number;
  y: number;
  scale: number;
  rotation: number;
  imageUrl: string;
}

export interface FurnitureAsset {
  id: string;
  name: string;
  category: 'Seating' | 'Tables' | 'Decor' | 'Lighting';
  imageUrl: string;
}

export interface DesignResult {
  id: string;
  originalImage: string;
  generatedImage: string;
  roomType: RoomType;
  style: DesignStyle;
  lighting?: LightingType;
  colors?: string[];
  usage?: string;
  palette: string[];
  recommendations: string[];
  description: string;
  createdAt: string;
  placedFurniture?: PlacedFurniture[];
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}
