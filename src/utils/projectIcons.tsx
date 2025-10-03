import {
  Code2,
  Database,
  Webhook,
  Zap,
  Server,
  FileText,
  GitBranch,
  Clock,
  Settings,
  Package,
  Cpu,
  Network,
  LucideIcon
} from 'lucide-react';

// Map tools to their corresponding icons
export const getToolIcon = (tool: string): LucideIcon => {
  const toolLower = tool.toLowerCase();

  if (toolLower.includes('python')) return Code2;
  if (toolLower.includes('notion')) return Database;
  if (toolLower.includes('api')) return Webhook;
  if (toolLower.includes('fastapi')) return Server;
  if (toolLower.includes('automation')) return Zap;
  if (toolLower.includes('csv') || toolLower.includes('file')) return FileText;
  if (toolLower.includes('scheduling') || toolLower.includes('schedule')) return Clock;
  if (toolLower.includes('git')) return GitBranch;
  if (toolLower.includes('websocket')) return Network;
  if (toolLower.includes('sqlalchemy') || toolLower.includes('sqlite')) return Database;
  if (toolLower.includes('pandas')) return Package;
  if (toolLower.includes('yaml')) return FileText;
  if (toolLower.includes('buttons') || toolLower.includes('relations')) return Settings;

  // Default icon
  return Code2;
};

// Get project category icon based on title/tools
export const getProjectIcon = (title: string, tools: string[]): LucideIcon => {
  const titleLower = title.toLowerCase();
  const toolsLower = tools.join(' ').toLowerCase();

  if (titleLower.includes('api') || titleLower.includes('integration')) return Webhook;
  if (titleLower.includes('automation') || titleLower.includes('payment')) return Zap;
  if (titleLower.includes('notion') || titleLower.includes('system')) return Database;
  if (titleLower.includes('validation') || titleLower.includes('meter')) return Cpu;
  if (toolsLower.includes('fastapi') || toolsLower.includes('server')) return Server;

  // Default
  return Package;
};

// Color scheme for project categories
export const getProjectColor = (title: string): string => {
  const titleLower = title.toLowerCase();

  if (titleLower.includes('api') || titleLower.includes('integration')) return 'from-blue-500 to-blue-600';
  if (titleLower.includes('automation') || titleLower.includes('payment')) return 'from-green-500 to-green-600';
  if (titleLower.includes('notion') || titleLower.includes('system')) return 'from-purple-500 to-purple-600';
  if (titleLower.includes('validation') || titleLower.includes('meter')) return 'from-orange-500 to-orange-600';

  // Default
  return 'from-indigo-500 to-indigo-600';
};
