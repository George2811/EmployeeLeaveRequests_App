import dayjs from 'dayjs';

export const renderTableCellValue = (value: unknown): React.ReactNode => {
  if (value === null || value === undefined) {
    return '-';
  }

  if (typeof value === 'string' && dayjs(value).isValid()) {
    if (value.includes('T')) {
      return dayjs(value).format('DD/MM/YYYY');
    }
  }
};
