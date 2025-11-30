import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { Dimension } from '../types';

interface Props {
  scores: Record<string, number>;
  lang: 'bn' | 'en';
}

const SimpleRadarChart: React.FC<Props> = ({ scores, lang }) => {
  // Select top 6 dimensions to avoid clutter, or key dimensions
  // For better visual, let's pick 6 diverse ones or high scoring ones
  // To make it deterministic, let's map specific dimensions to axes
  
  const axes = [
    Dimension.Analytical,
    Dimension.Creativity,
    Dimension.Social,
    Dimension.Leadership,
    Dimension.Practical,
    Dimension.Curiosity
  ];

  const data = axes.map(dim => ({
    subject: dim, // In real app, might translate this
    A: scores[dim] || 0,
    fullMark: 100,
  }));

  return (
    <div className="w-full h-64 sm:h-80">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke="#cbd5e1" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#475569', fontSize: 10 }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
          <Radar
            name="Skills"
            dataKey="A"
            stroke="#0ea5e9"
            strokeWidth={2}
            fill="#0ea5e9"
            fillOpacity={0.5}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SimpleRadarChart;
