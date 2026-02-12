export interface SearchResult {
  id: string;
  thumbnail: string;
  preview: string;
  camera: string;
  timestamp: string;
  score: number;
  tags: string[];
  // Fix: Added optional properties to support search result similarity scores and match strength in the UI
  displayScore?: number;
  currentMatchScore?: number;
}

export enum AppTab {
  TRY = 'try',
  RULES = 'rules',
  LEARN = 'learn'
}

export interface RouteState {
  tab: AppTab;
  query: string;
  resultId?: string;
}