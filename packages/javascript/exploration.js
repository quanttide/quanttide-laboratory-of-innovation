// PoC 数据模型

export class Poc {
  constructor({ id, name, status = 'pending' }) {
    this.id = id;
    this.name = name;
    this.status = status; // 'done' | 'pending' | 'in_progress'
  }
}

export class Lab {
  constructor({ id, name, repo, domain, status = 'active', description = '', pocs = [] }) {
    this.id = id;
    this.name = name;
    this.repo = repo;
    this.domain = domain;
    this.status = status; // 'active' | 'archived' | 'deprecated'
    this.description = description;
    this.pocs = pocs.map(p => p instanceof Poc ? p : new Poc(p));
  }

  get pocCount() { return this.pocs.length; }
  get doneCount() { return this.pocs.filter(p => p.status === 'done').length; }
}

export class ExplorationLog {
  constructor({ time, mode, hypothesis, method, conclusion, reason, scores = {} }) {
    this.time = time;
    this.mode = mode;        // 'quick' | 'full'
    this.hypothesis = hypothesis;
    this.method = method;     // 'experiment' | 'prototype' | 'research'
    this.conclusion = conclusion; // 'adopt' | 'adjust' | 'abandon'
    this.reason = reason;
    this.scores = scores;     // { feasibility, cost, risk, benefit }
  }
}

export class EvaluationCriteria {
  constructor({ feasibility = 3, cost = 3, risk = 3, benefit = 3, weights = {} } = {}) {
    this.dimensions = [
      { key: 'feasibility', label: '可行性', value: feasibility, weight: weights.feasibility ?? 25 },
      { key: 'cost', label: '成本', value: cost, weight: weights.cost ?? 25 },
      { key: 'risk', label: '风险', value: risk, weight: weights.risk ?? 25 },
      { key: 'benefit', label: '收益', value: benefit, weight: weights.benefit ?? 25 },
    ];
  }

  get total() {
    const sum = this.dimensions.reduce((acc, d) =>
      acc + (d.value / 5) * (d.weight / 100), 0);
    return +(sum * 5).toFixed(2);
  }

  update(key, value) {
    const dim = this.dimensions.find(d => d.key === key);
    if (dim) dim.value = value;
  }

  updateWeight(key, weight) {
    const dim = this.dimensions.find(d => d.key === key);
    if (dim) dim.weight = weight;
  }
}

export const LAB_STATUS_LABELS = {
  active: '活跃',
  archived: '已归档',
  deprecated: '已废弃',
};

export const POC_STATUS_LABELS = {
  done: '完成',
  pending: '待开始',
  in_progress: '进行中',
};

export const CONCLUSION_LABELS = {
  adopt: '采纳',
  adjust: '调整',
  abandon: '放弃',
};
