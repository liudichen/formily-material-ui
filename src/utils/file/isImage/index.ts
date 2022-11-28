import { IUploadedFile } from '../../../types';

const isImageFileType = (type: string) => type.indexOf('image/') === 0;
const extname = (url = '') => {
  const temp = url?.split('/');
  const filename = temp?.[temp?.length - 1];
  const filenameWithoutSuffix = filename?.split(/#|\?/)?.[0];
  return (/\.[^./\\]*$/.exec(filenameWithoutSuffix) || [ '' ])[0];
};


export const isImage = (file: IUploadedFile) => {
  if (file.type && !file.thumbUrl && !file.url) {
    return isImageFileType(file.type);
  }
  const url = file.thumbUrl || file.url || '';
  const extension = extname(url);
  if (
    /^data:image\//.test(url) ||
    /(webp|svg|png|gif|jpg|jpeg|jfif|bmp|dpg|ico)$/i.test(extension)
  ) {
    return true;
  }
  if (/^data:/.test(url)) {
    // other file types of base64
    return false;
  }
  if (extension) {
    // other file types which have extension
    return false;
  }
  return false;
};
