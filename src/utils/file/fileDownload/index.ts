import { IUploadedFile } from '../../../types';

export const fileDownload = (file: IUploadedFile, fileName?: string) => {
  if (!file) return;
  const href = URL.createObjectURL(file);
  const a = document.createElement('a');
  a.href = href;
  a.download = fileName || file?.name || '文件';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(href);
};
