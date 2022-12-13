import React from 'react';
import { useMemoizedFn } from 'ahooks';
import { toJS } from '@formily/reactive';
import { observer } from '@formily/react';
import { Box, Button, Grid } from '@mui/material';
import { Space } from 'mui-component';

import { Submit } from '../../Submit';

const StepForm = observer((props) => {
  const { stepIndex, stepsCount, onFinish, onPrevious, nextProps, nextText, previousText, previousProps, children, handleStepChange, onSubmitFail,
    // eslint-disable-next-line no-unused-vars
    title, subTitle, icon, name, field,
    ...restProps } = props;

  const onSubmit = useMemoizedFn(async (stepValues) => {
    const allValues = toJS(field?.form?.values || {});
    let v = { ...(stepValues || {}) };
    if (stepIndex + 1 === stepsCount) {
      const valuesArr = Object.values(allValues);
      v = {};
      for (let i = 0; i < valuesArr.length; i++) {
        v = { ...v, ...(valuesArr[i] || {}) };
      }
    }
    const res = await onFinish?.(v, allValues, field);
    if (res !== false) {
      handleStepChange?.('next');
    }
  });
  const onPreviousClick = useMemoizedFn(() => {
    if (field?.submitting) return;
    onPrevious?.(field);
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
            {!!stepIndex && (
              <Button
                disabled={field?.submitting}
                {...(previousProps || {})}
                onClick={onPreviousClick}
              >
                {previousText}
              </Button>
            )}
            <Submit
              variant='contained'
              size='small'
              {...(nextProps || {})}
              onSubmitFailed={onSubmitFail}
              onSubmit={onSubmit}
            >
              {stepIndex + 1 === stepsCount ? nextText?.[1] : nextText?.[0]}
            </Submit>
          </Space>
        </Grid>
      </Grid>
    </Box>
  );
}, { displayName: 'iimm.Mui.Formily.StepsForm.StepForm' });

StepForm.defaultProps = {
  nextText: ['下一步', '提交'],
  previousText: '上一步',
};

StepForm.displayName = 'iimm.Mui.Formily.StepsForm.StepForm';

export default StepForm;
