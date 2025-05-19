/// <reference types="vite/client" />

interface ColumnType {
  prop: string;
  label: string;
  width?: number;
  minWidth?: number;
  align?: string;
  fixed?: string;
  showOverflowTooltip?: boolean;
  type?: string;
  formatter?: Function;
  slotType?: string;
}
