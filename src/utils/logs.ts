export interface ErrorLog {
  id: number;
  timestamp: string;
  severity: string;
  message: string;
  source: string;
}

export interface AccessLog {
  id: number;
  timestamp: string;
  user: string;
  action: string;
  status: string;
  ip: string;
}

export const formatErrorLogs = (logs: any[]): ErrorLog[] => {
  return logs.map(log => ({
    id: log.id,
    timestamp: log.timestamp,
    severity: log.level || 'info', // Map level to severity
    message: log.message,
    source: log.source || 'system'
  }));
};

export const formatAccessLogs = (logs: any[]): AccessLog[] => {
  return logs.map(log => ({
    id: log.id,
    timestamp: log.timestamp,
    user: log.user,
    action: log.action,
    status: log.status,
    ip: log.ip
  }));
};

export const getSystemErrors = async (): Promise<any[]> => {
  try {
    const response = await fetch(`${process.env.VITE_API_URL}/system/errors`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
    });
    if (!response.ok) throw new Error('Failed to fetch system errors');
    return response.json();
  } catch (error) {
    console.error('Error fetching system errors:', error);
    return [];
  }
};

export const getAccessLogs = async (): Promise<any[]> => {
  try {
    const response = await fetch(`${process.env.VITE_API_URL}/system/access-logs`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
    });
    if (!response.ok) throw new Error('Failed to fetch access logs');
    return response.json();
  } catch (error) {
    console.error('Error fetching access logs:', error);
    return [];
  }
};