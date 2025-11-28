export interface Message {
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
  type?: 'text' | 'chart';
  chartData?: any[]; // For simplistic demo chart data
}

export interface ChartDataPoint {
  name: string;
  value: number;
  secondary?: number;
}

export enum ScenarioType {
  QUERY = 'QUERY',
  REPORT = 'REPORT',
  ANALYSIS = 'ANALYSIS'
}