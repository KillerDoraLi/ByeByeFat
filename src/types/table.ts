export interface ColumnType {
  prop?: string;
  label: string;
  width?: string | number;
  minWidth?: string | number;
  align?: 'left' | 'center' | 'right';
  fixed?: 'left' | 'right';
  showOverflowTooltip?: boolean;
  formatter?: (row: any) => string;
  type?: 'index' | 'slot';
  slotType?: string;
} 