import { forwardRef } from 'react';
import { useDropzone } from 'react-dropzone';

export const UploadZone = forwardRef((props, ref) => {
  const { children, ...restProps } = props;
  const { getInputProps, getRootProps } = useDropzone({ ...restProps });
  return (
    <div {...getRootProps()}>
      <input ref={ref} {...getInputProps()} />
      {children}
    </div>
  );
});

UploadZone.defaultProps = {
  useFsAccessApi: false,
};

UploadZone.displayName = 'UploadZone';

export default UploadZone;
