import { ChartDataPoint } from "./types";

export const MOCK_CHART_DATA: ChartDataPoint[] = [
  { name: '1月', value: 4000, secondary: 2400 },
  { name: '2月', value: 3000, secondary: 1398 },
  { name: '3月', value: 2000, secondary: 9800 },
  { name: '4月', value: 2780, secondary: 3908 },
  { name: '5月', value: 1890, secondary: 4800 },
  { name: '6月', value: 2390, secondary: 3800 },
  { name: '7月', value: 3490, secondary: 4300 },
];

export const SCENARIOS = [
  { id: 'finance', title: '智慧财务', icon: '💰' },
  { id: 'gov', title: '智慧政企', icon: '🏛️' },
  { id: 'contract', title: '智慧合同', icon: '📝' },
  { id: 'supply', title: '智慧供应链', icon: '🔗' },
  { id: 'mining', title: '智慧矿产', icon: '⛏️' },
];

export const CAPABILITIES = [
  { 
    id: 'query', 
    title: '智能问数', 
    desc: '解决一线取数难用数难',
    accuracy: '99.7%+',
    color: 'from-blue-500 to-cyan-400'
  },
  { 
    id: 'report', 
    title: '智能报表', 
    desc: '解决报表制作成本高的问题',
    efficiency: '300%+',
    color: 'from-indigo-500 to-blue-400'
  },
  { 
    id: 'analysis', 
    title: '智能报告', 
    desc: '解决业务人员分析慢的问题',
    speed: '秒级响应',
    color: 'from-cyan-500 to-teal-400'
  }
];

export const ENGINES = [
  '语义理解引擎', '数据语义引擎', '代码生成引擎', '报告生成引擎'
];

export const MODEL_LAYERS = [
  '意图识别', '实体识别', '代码生成', '文本生成', '工具调用', '任务规划'
];
