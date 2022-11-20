import { IUploadedFile } from '../../../types';

export const fileToBase64 = (file: IUploadedFile) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = e => {
      reject(e);
    };
  });
};
