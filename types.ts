export interface ROI {
  label: string;
  tags: string[];
  box: {
    t: number; // top %
    l: number; // left %
    w: number; // width %
    h: number; // height %
  };
}

export interface SearchResult {
  id: string;
  thumbnail: string;
  preview: string;
  camera: string;
  timestamp: string;
  score: number;
  tags: string[];
  displayScore?: number;
  currentMatchScore?: number;
  rois?: ROI[];
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