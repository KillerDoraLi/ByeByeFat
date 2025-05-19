/**
 * 日期格式化工具
 */

/**
 * 将日期字符串转换为 ISO 格式
 * @param dateStr 日期字符串，格式为 YYYY-MM-DD HH:mm:ss
 * @returns ISO 格式的日期字符串，如 2023-05-12T15:30:45Z
 */
export const formatToISO = (dateStr: string): string => {
  if (!dateStr) return '';
  return new Date(dateStr).toISOString();
};

/**
 * 将 ISO 格式的日期字符串转换为本地格式
 * @param isoStr ISO 格式的日期字符串，如 2023-05-12T15:30:45Z
 * @returns 本地格式的日期字符串，如 2023-05-12 15:30:45
 */
export const formatFromISO = (isoStr: string): string => {
  if (!isoStr) return '';
  const date = new Date(isoStr);
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).replace(/\//g, '-');
}; 

// 根据传入的类型返回不同的日期格式
export const formatDate = (dateInput: string, type = 'default') => {
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return 'Invalid Date';

  const padZero = (n: number) => n.toString().padStart(2, '0');
  const year = date.getFullYear();
  const month = padZero(date.getMonth() + 1);
  const day = padZero(date.getDate());
  const hour = padZero(date.getHours());
  const minute = padZero(date.getMinutes());
  const second = padZero(date.getSeconds());

  switch (type) {
    case 'YYYY-MM-DD':
      return `${year}-${month}-${day}`;
    case 'YYYY/MM/DD':
      return `${year}/${month}/${day}`;
    case 'YYYY-MM-DD HH:mm:ss':
      return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    case 'MM/DD/YYYY':
      return `${month}/${day}/${year}`;
    case 'timestamp':
      return date.getTime(); // 返回时间戳
    case 'CN': // 中文格式
      return `${year}年${month}月${day}日`;
    case 'HH:mm':
      return `${hour}:${minute}`;
    case 'ISO':
      return date.toISOString(); // ISO格式
    default:
      return date.toString(); // 默认格式
  }
}