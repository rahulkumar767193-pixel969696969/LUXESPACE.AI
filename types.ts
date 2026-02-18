
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
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}
