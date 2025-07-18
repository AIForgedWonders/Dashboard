import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 600 },
  { name: 'Mar', value: 800 },
  { name: 'Apr', value: 700 },
  { name: 'May', value: 1100 },
  { name: 'Jun', value: 900 },
];

export function StatsChartCard() {
  return (
    <div className="bg-gradient-to-br from-purple-900/60 to-slate-900/80 border-2 border-purple-500/40 rounded-2xl shadow-xl p-0 flex flex-col items-center justify-center relative overflow-hidden group">
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="w-full h-full bg-purple-500/10 blur-2xl opacity-60 group-hover:opacity-80 transition" />
      </div>
      <div className="w-full flex flex-col items-center justify-center p-4 z-10">
        <div className="w-full flex items-center justify-between mb-2">
          <span className="text-purple-200 font-semibold text-lg">Usage Trends</span>
          <span className="text-xs bg-purple-700/30 text-purple-200 px-2 py-1 rounded-full">Stats</span>
        </div>
        <div className="w-full h-48 md:h-56 rounded-xl bg-slate-900/80 border border-purple-700/30 flex items-center justify-center shadow-inner">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} style={{ fontFamily: 'inherit' }}>
              <XAxis dataKey="name" stroke="#a855f7" tick={{ fill: '#c4b5fd', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis stroke="#a855f7" tick={{ fill: '#c4b5fd', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: '#2e1065', border: 'none', color: '#fff' }} cursor={{ fill: '#a855f7', opacity: 0.1 }} />
              <Bar dataKey="value" fill="#a855f7" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-3 text-center">
          <span className="text-purple-300 text-sm">Monthly Activity</span>
        </div>
      </div>
      <div className="absolute -inset-1 rounded-2xl border-2 border-purple-500/40 pointer-events-none animate-pulse group-hover:animate-none" />
    </div>
  );
} 