import { useMemo } from "react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { GlassCard, GlassCardContent, GlassCardHeader, GlassCardTitle } from "@/components/ui/glass-card";
import { TrendingUp, BarChart3, PieChart as PieChartIcon, Activity } from "lucide-react";

interface AnalyticsData {
  date: string;
  audits: number;
  score: number;
  vulnerabilities: number;
  gasOptimizations: number;
}

interface AnalyticsChartProps {
  data: AnalyticsData[];
  type?: "line" | "area" | "bar" | "pie";
  title?: string;
  metric?: "audits" | "score" | "vulnerabilities" | "gasOptimizations";
  height?: number;
}

export function AnalyticsChart({ 
  data, 
  type = "line", 
  title,
  metric = "audits",
  height = 300 
}: AnalyticsChartProps) {
  
  const chartData = useMemo(() => {
    return data.map(item => ({
      ...item,
      date: new Date(item.date).toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      })
    }));
  }, [data]);

  const pieData = useMemo(() => {
    if (type !== "pie") return [];
    
    const total = data.reduce((sum, item) => sum + item[metric], 0);
    return [
      { name: "High Score (80+)", value: data.filter(d => d.score >= 80).length, color: "#10b981" },
      { name: "Medium Score (60-79)", value: data.filter(d => d.score >= 60 && d.score < 80).length, color: "#f59e0b" },
      { name: "Low Score (<60)", value: data.filter(d => d.score < 60).length, color: "#ef4444" }
    ];
  }, [data, type, metric]);

  const getIcon = () => {
    switch (type) {
      case "bar": return <BarChart3 className="h-5 w-5" />;
      case "pie": return <PieChartIcon className="h-5 w-5" />;
      case "area": return <Activity className="h-5 w-5" />;
      default: return <TrendingUp className="h-5 w-5" />;
    }
  };

  const getMetricLabel = () => {
    switch (metric) {
      case "score": return "Average Score";
      case "vulnerabilities": return "Vulnerabilities Found";
      case "gasOptimizations": return "Gas Optimizations";
      default: return "Total Audits";
    }
  };

  const getColor = () => {
    switch (metric) {
      case "score": return "#10b981"; // secondary
      case "vulnerabilities": return "#ef4444"; // destructive  
      case "gasOptimizations": return "#8b5cf6"; // accent
      default: return "#3b82f6"; // primary
    }
  };

  const renderChart = () => {
    const color = getColor();

    switch (type) {
      case "area":
        return (
          <ResponsiveContainer width="100%" height={height}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id={`gradient-${metric}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={color} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
              <XAxis 
                dataKey="date" 
                stroke="#9ca3af" 
                fontSize={12}
                tickLine={false}
              />
              <YAxis 
                stroke="#9ca3af" 
                fontSize={12}
                tickLine={false}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Area 
                type="monotone" 
                dataKey={metric} 
                stroke={color} 
                strokeWidth={2}
                fill={`url(#gradient-${metric})`}
              />
            </AreaChart>
          </ResponsiveContainer>
        );

      case "bar":
        return (
          <ResponsiveContainer width="100%" height={height}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
              <XAxis 
                dataKey="date" 
                stroke="#9ca3af" 
                fontSize={12}
                tickLine={false}
              />
              <YAxis 
                stroke="#9ca3af" 
                fontSize={12}
                tickLine={false}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Bar 
                dataKey={metric} 
                fill={color}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        );

      case "pie":
        return (
          <ResponsiveContainer width="100%" height={height}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        );

      default: // line
        return (
          <ResponsiveContainer width="100%" height={height}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
              <XAxis 
                dataKey="date" 
                stroke="#9ca3af" 
                fontSize={12}
                tickLine={false}
              />
              <YAxis 
                stroke="#9ca3af" 
                fontSize={12}
                tickLine={false}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Line 
                type="monotone" 
                dataKey={metric} 
                stroke={color} 
                strokeWidth={3}
                dot={{ fill: color, strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: color, strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        );
    }
  };

  return (
    <GlassCard>
      <GlassCardHeader>
        <GlassCardTitle className="flex items-center gap-2">
          {getIcon()}
          {title || getMetricLabel()}
        </GlassCardTitle>
      </GlassCardHeader>
      <GlassCardContent>
        {renderChart()}
      </GlassCardContent>
    </GlassCard>
  );
}