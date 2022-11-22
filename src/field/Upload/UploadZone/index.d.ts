/* eslint-disable jsdoc/check-tag-names */
import React from 'react';
import {} from 'react-dropzone';

interface IAccept {
  [key: string]: string[]
}

export interface UploadZoneProps {
  /** 接受文件类型，格式为{mimeType: ext[]}
   * @exmaple
   * ```javascript
   *  accept: {"image/*":[".png",".jpg"]}
   * ```
   * */
  accept?: IAccept,
  style?: object,
  multiple?: boolean,
  preventDropOnDocument?: boolean,
  noClick?: boolean,
  noKeyboard?: boolean,
  noDrag?: boolean,
  noDragEventsBubbling?: boolean,
  minSize?: number,
  maxSize?: number,
  maxFiles?: number,
  disabled?: boolean,
  getFilesFromEvent?: (event: Event) => void,
  onFileDialogCancel?: () => void,
  onFileDialogOpen?: () => void,
  useFsAccessApi?: boolean,
  onDragEnter?: (event: Event) => void,
  onDragLeave?: (event: Event) => void,
  onDragOver?: (event: Event) => void,
  onDrop?: (File: File[], FileRejection: File[], event: Event) => void,
  onDropAccepted?: (File: File[], event: Event) => void,
  onDropRejected?: (FileRejection: File[], event: Event) => void,
  validator?: (file: File) => any,
}

export declare const UploadZone: React.ForwardRefExoticComponent<UploadZoneProps>;

export default UploadZone;
