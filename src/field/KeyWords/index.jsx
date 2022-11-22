import React from 'react';
import { useControllableValue, useMemoizedFn, useSafeState, useKeyPress } from 'ahooks';
import { Box, Chip, Divider, IconButton, InputBase, Paper, Stack } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import TelegramIcon from '@mui/icons-material/Telegram';

import { useFormilyFieldProps } from '../../hooks';
import { observer } from '@formily/react';

export const KeyWords = observer((props) => {
  const formilyFieldProps = useFormilyFieldProps(props, { error: true });
  const {
    // eslint-disable-next-line no-unused-vars
    value: valueProp, onChange: onChangeProp, defaultValue, noField,
    readOnly, disabled, error,
    showClear, autoClear,
    textConvert,
    chipsBoxProps, containerStackProps, InputBaseProps, AddIcon, AddButtonProps,
    chipProps, renderChip, InputBasePaperProps,
  } = formilyFieldProps;
  const ref = React.useRef();
  const [text, setText] = useSafeState('');
  const [value, onChange] = useControllableValue(props, { defaultValue: [] });
  const onTextChange = useMemoizedFn((e) => {
    const v = (e.target.value || '').trim();
    setText(v);
  });
  const handleAddKeyWord = useMemoizedFn(() => {
    const txt = typeof textConvert === 'function' ? textConvert(text) : text;
    if (!txt) { return; }
    if (!value?.includes(txt)) {
      const newValue = [...(value || [])];
      newValue.push(txt);
      onChange(newValue);
    }
    if (autoClear) { setText(''); }
  });

  const handleRemoveKeyWord = useMemoizedFn((kw) => {
    const index = (value || []).findIndex((ele) => ele === kw);
    if (index !== -1) {
      const newValue = [...value];
      newValue.splice(index, 1);
      onChange(newValue);
    }
  });
  useKeyPress(['enter'], () => handleAddKeyWord(), { events: ['keyup'], target: ref });
  return (
    <Stack
      spacing={1}
      {...(containerStackProps || {})}
      direction='column'
    >
      {(!readOnly && !disabled) ? (
        <Paper
          {...(InputBasePaperProps || {})}
          sx={{
            p: '0px 4px',
            display: 'flex',
            alignItems: 'center',
            borderRadius: '5px',
            boxShadow: '0px 0px 1px 0px grey',
            ...(InputBasePaperProps?.sx || {}),
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder='输入关键字并添加'
            {...(InputBaseProps || {})}
            value={text}
            onChange={onTextChange}
            ref={ref}
          />
          { (showClear && !!text) ? (
            <IconButton
              size='small'
              sx={{ color: 'InactiveCaptionText' }}
              onClick={() => setText('')}
            >
              <ClearIcon />
            </IconButton>
          ) : null}
          <Divider
            orientation='vertical'
            sx={{
              height: 28,
            }}
          />
          <IconButton
            color='primary'
            disabled={!text || disabled}
            {...(AddButtonProps || {})}
            onClick={handleAddKeyWord}
          >
            { AddIcon }
          </IconButton>
        </Paper>
      ) : null}
      <Box
        display='flex'
        flexWrap='wrap'
        width='100%'
        alignItems='center'
        gap={0.5}
        {...(chipsBoxProps || {})}
      >
        { (value || []).map((ele, index) => {
          if (typeof renderChip === 'function') {
            const Node = renderChip({ item: ele, index, items: value, disabled: disabled || readOnly, handleRemoveKeyWord });
            return Node || null;
          }
          return (
            <Chip
              key={ele}
              label={ele}
              variant={'outlined'}
              disabled={disabled}
              color={error ? 'error' : index % 2 ? 'secondary' : 'info'}
              {...(chipProps || {})}
              onDelete={(readOnly || disabled) ? undefined : () => handleRemoveKeyWord(ele)}
            />
          );
        })}
      </Box>
    </Stack>
  );
});

KeyWords.defaultProps = {
  showClear: true,
  autoClear: true,
  AddIcon: <TelegramIcon />,
};

KeyWords.displayName = 'muiFormilyKeyWords';
