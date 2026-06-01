// 实验室目录数据模型
// 不包含具体样本数据，样本见 sample.js

import { Lab } from './exploration.js';

export function queryLabs(source) {
  return {
    getAll: () => source,
    get: (id) => source.find(l => l.id === id),
    byDomain: (domain) => domain ? source.filter(l => l.domain === domain) : source,
    byStatus: (status) => status ? source.filter(l => l.status === status) : source,
    search: (query) => {
      const q = query.toLowerCase();
      return source.filter(l =>
        l.name.toLowerCase().includes(q) ||
        l.description.toLowerCase().includes(q) ||
        l.pocs.some(p => p.name.toLowerCase().includes(q))
      );
    },
    stats: () => ({
      total: source.length,
      active: source.filter(l => l.status === 'active').length,
      totalPocs: source.reduce((s, l) => s + l.pocs.length, 0),
    }),
  };
}
