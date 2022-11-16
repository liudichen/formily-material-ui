import React, { forwardRef } from 'react';
import { useMemoizedFn, useSafeState } from 'ahooks';
import { Popover as MuiPopover } from '@mui/material';
import { unstable_useId } from '@mui/material/utils';

export const Popover = forwardRef((props, ref) => {
  const {
    onClose: onCloseProp,
    triggerType, disabled,
    trigger, id: idProp,
    content, children,
    ...restProps
  } = props;
  const [ anchorE1, setAnchorE1 ] = useSafeState(null);
  const id = unstable_useId(idProp);
  const handleColse = useMemoizedFn((e) => {
    if (anchorE1 && !disabled) {
      setAnchorE1(null);
      onCloseProp?.();
    }
  });
  const handleOpen = useMemoizedFn((e) => {
    if (!disabled) { setAnchorE1(e.currentTarget); }
  });
  return (
    <>
      <span
        onMouseEnter={(e) => { if (triggerType === 'hover') handleOpen(e); }}
        onClick={(e) => { if (triggerType === 'click') handleOpen(e); }}
      >
        {trigger}
      </span>
      <MuiPopover
        ref={ref}
        id={id}
        onClose={handleColse}
        anchorEl={anchorE1}
        open={!!anchorE1}
        {...restProps}
        disableRestoreFocus={triggerType === 'hover'}
      >
        {content ?? children}
      </MuiPopover>
    </>
  );
});

Popover.defaultProps = {
  anchorOrigin: { vertical: 'top', horizontal: 'center' },
  transformOrigin: { vertical: 'bottom', horizontal: 'center' },
  PaperProps: { sx: { p: 0.5, borderRadius: 2 } },
};
