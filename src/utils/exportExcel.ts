import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

interface ExportOptions {
  data: any[];
  columns: {
    prop: string;
    label: string;
    formatter?: (row: any) => any;
  }[];
  fileName?: string;
  sheetName?: string;
}

/**
 * 导出 Excel 文件
 * @param options 导出配置
 * @param options.data 要导出的数据
 * @param options.columns 列配置
 * @param options.fileName 文件名，默认为 '导出数据.xlsx'
 * @param options.sheetName sheet 名称，默认为 'Sheet1'
 */
export const exportExcel = (options: ExportOptions) => {
  const {
    data,
    columns,
    fileName = '导出数据.xlsx',
    sheetName = 'Sheet1',
  } = options;

  // 处理数据
  const exportData = data.map((row) => {
    const newRow: Record<string, any> = {};
    columns.forEach((column) => {
      const value = row[column.prop];
      newRow[column.label] = column.formatter
        ? column.formatter(row)
        : value;
    });
    return newRow;
  });

  // 创建工作簿
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(exportData);

  // 设置列宽
  const colWidths = columns.map(() => ({ wch: 15 }));
  ws['!cols'] = colWidths;

  // 将工作表添加到工作簿
  XLSX.utils.book_append_sheet(wb, ws, sheetName);

  // 生成 Excel 文件
  const wbout = XLSX.write(wb, {
    bookType: 'xlsx',
    type: 'array',
  });

  // 保存文件
  const blob = new Blob([wbout], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  saveAs(blob, fileName);
}; 