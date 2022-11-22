import React from 'react';
import { useDropzone } from 'react-dropzone';

export const UploadZone = React.forwardRef((props, ref) => {
  const { children, ...restProps } = props;
  const { getInputProps, getRootProps, inputRef, open, rootRef } = useDropzone({ ...restProps });
  React.useImperativeHandle(ref, () => ({ inputRef, rootRef, open }));
  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {children}
    </div>
  );
});

UploadZone.defaultProps = {
  useFsAccessApi: false,
};

UploadZone.displayName = 'UploadZone';

export default UploadZone;
