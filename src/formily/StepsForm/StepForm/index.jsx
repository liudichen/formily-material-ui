import React from 'react';
import { useMemoizedFn, useSafeState } from 'ahooks';
import { toJS } from '@formily/reactive';
import { observer, useParentForm } from '@formily/react';
import { Box, Button, Grid } from '@mui/material';
import { Space } from 'mui-component';

import { LoadingButton } from '../../../utils';

const StepForm = observer((props) => {
  const { stepIndex, stepsCount, onFinish, onPrevious, nextProps, nextText, previousText, previousProps, children, handleStepChange, onSubmitFail,
    // eslint-disable-next-line no-unused-vars
    title, subTitle, icon, name,
    ...restProps } = props;
  const [loading, setLoading] = useSafeState(false);
  const field = useParentForm();
  const onSubmit = useMemoizedFn(async () => {
    try {
      setLoading(true);
      await field.validate();
      if (field.valid) {
        let res = false;
        const allValues = toJS(field?.form?.values || {});
        if (stepIndex + 1 !== stepsCount) {
          res = await onFinish?.(toJS(field.value), allValues);
        } else {
          const valuesArr = Object.values(allValues);
          let values = {};
          for (let i = 0; i < valuesArr.length; i++) {
            values = { ...values, ...(valuesArr[i] || {}) };
          }
          res = await onFinish?.(values, allValues);
        }
        setLoading(false);
        if (res !== false) {
          handleStepChange?.('next');
        }
      } else {
        setLoading(false);
      }
    } catch (error) {
      onSubmitFail?.(error, toJS(field?.value));
      setLoading(false);
    }
  });
  const onPreviousClick = useMemoizedFn(() => {
    onPrevious?.();
    handleStepChange?.('previous');
  });

  return (
    <Box
      {...restProps}
    >
      <Grid container spacing={1}>
        <Grid item xs={12}>
          {children}
        </Grid>
        <Grid item xs={12}>
          <Space sx={{}}>
            { !!stepIndex && (
              <Button
                {...(previousProps || {})}
                onClick={onPreviousClick}
              >
                {previousText}
              </Button>
            )}
            <LoadingButton
              variant='contained'
              loading={loading}
              size='small'
              {...(nextProps || {})}
              onClick={onSubmit}
            >
              { stepIndex + 1 === stepsCount ? nextText?.[1] : nextText?.[0] }
            </LoadingButton>
          </Space>
        </Grid>
      </Grid>
    </Box>
  );
});

StepForm.defaultProps = {
  nextText: ['下一步', '提交'],
  previousText: '上一步',
};

StepForm.displayName = 'muiFormilyStepForm';

export default StepForm;
