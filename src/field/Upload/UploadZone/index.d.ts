import React from 'react';

export interface UploadZoneProps {
  accept?: string | string[],
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

export declare const UploadZone: React.ForwardRefRenderFunction<unknown, UploadZoneProps>;
