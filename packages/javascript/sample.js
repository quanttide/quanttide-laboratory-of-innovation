// 实验室样本数据

import { Lab } from './model.js';

const labs = [
  new Lab({
    id: 'human', name: '量潮人力资源实验室',
    repo: 'quanttide/quanttide-laboratory-of-human-resources',
    domain: '人力资源', status: 'active',
    description: '招聘筛选、人才管理相关 PoC',
    pocs: [
      { id: 'p01', name: '招聘筛选网关', status: 'done' },
    ],
  }),
  new Lab({
    id: 'org', name: '量潮组织管理实验室',
    repo: 'quanttide/quanttide-laboratory-of-organization',
    domain: '组织管理', status: 'active',
    description: '职能拆解、组织设计相关 PoC',
    pocs: [
      { id: 'p03', name: '职能目录', status: 'done' },
    ],
  }),
  new Lab({
    id: 'exec', name: '量潮执行管理实验室',
    repo: 'quanttide/quanttide-laboratory-of-execution',
    domain: '执行管理', status: 'active',
    description: '任务分诊、技术职能协作相关 PoC',
    pocs: [
      { id: 'p04', name: '秘书处任务分诊', status: 'done' },
      { id: 'p05', name: '技术职能协作循环', status: 'done' },
    ],
  }),
  new Lab({
    id: 'company', name: '量潮业务实体实验室',
    repo: 'quanttide/quanttide-laboratory-of-business-entity',
    domain: '业务实体', status: 'active',
    description: '章程管理、业务实体相关 PoC',
    pocs: [
      { id: 'p06', name: '章程多维资产视图', status: 'done' },
    ],
  }),
  new Lab({
    id: 'innov', name: '量潮创新实验室',
    repo: 'quanttide/quanttide-laboratory-of-innovation',
    domain: '创新', status: 'active',
    description: '概念验证方法论相关 PoC',
    pocs: [
      { id: 'p07', name: '概念验证探索框架', status: 'done' },
      { id: 'p09', name: '实验室目录', status: 'done' },
    ],
  }),
  new Lab({
    id: 'game', name: '量潮游戏研发实验室',
    repo: 'quanttide/quanttide-laboratory-of-game-developing',
    domain: '游戏', status: 'active',
    description: '回合制战棋游戏开发 PoC',
    pocs: [
      { id: 'g01', name: '六角格地图', status: 'done' },
      { id: 'g02', name: '单位移动', status: 'done' },
      { id: 'g03', name: '地形系统', status: 'done' },
      { id: 'g04', name: '回合流程', status: 'done' },
    ],
  }),
  new Lab({
    id: 'default', name: '量潮创始人实验室',
    repo: 'quanttide/quanttide-example-of-founder',
    domain: '创始人', status: 'active',
    description: '跨领域元 PoC，基础设施与治理',
    pocs: [],
  }),
];

export default labs;
