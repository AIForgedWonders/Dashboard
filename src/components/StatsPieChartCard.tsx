import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Visual', value: 45, color: '#a855f7' },
  { name: 'Text', value: 30, color: '#c084fc' },
  { name: 'Audio', value: 15, color: '#7c3aed' },
  { name: '3D', value: 10, color: '#8b5cf6' },
];

export function StatsPieChartCard() {
  return (
    <div className="bg-gradient-to-br from-purple-900/60 to-slate-900/80 border-2 border-purple-500/40 rounded-2xl shadow-xl p-0 flex flex-col items-center justify-center relative overflow-hidden group">
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="w-full h-full bg-purple-500/10 blur-2xl opacity-60 group-hover:opacity-80 transition" />
      </div>
      <div className="w-full flex flex-col items-center justify-center p-4 z-10">
        <div className="w-full flex items-center justify-between mb-2">
          <span className="text-purple-200 font-semibold text-lg">Category Breakdown</span>
          <span className="text-xs bg-purple-700/30 text-purple-200 px-2 py-1 rounded-full">Pie</span>
        </div>
        <div className="w-full h-48 md:h-56 rounded-xl bg-slate-900/80 border border-purple-700/30 flex items-center justify-center shadow-inner">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={60}
                innerRadius={30}
                fill="#a855f7"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                isAnimationActive
              >
                {data.map((entry, idx) => (
                  <Cell key={`cell-${idx}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: '#2e1065', border: 'none', color: '#fff' }} />
              <Legend iconType="circle" layout="horizontal" align="center" verticalAlign="bottom" wrapperStyle={{ color: '#c4b5fd', fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-3 text-center">
          <span className="text-purple-300 text-sm">Project Types</span>
        </div>
      </div>
      <div className="absolute -inset-1 rounded-2xl border-2 border-purple-500/40 pointer-events-none animate-pulse group-hover:animate-none" />
    </div>
  );
} 