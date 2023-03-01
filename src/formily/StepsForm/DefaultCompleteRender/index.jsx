import React from 'react';
import { useMemoizedFn } from 'ahooks';
import { observer } from '@formily/react';
import { Button } from '@mui/material';
import { Space } from '@iimm/react-shared';
import { Result } from 'mui-component';

const DefaultCompleteRender = observer((props) => {
  const { resultActions, resultTitle, resultSubTitle, showResultReset, resultResetText, resultResetProps, onResultReset, handleStepChange, form } = props;
  const handleReset = useMemoizedFn(() => {
    onResultReset?.();
    form?.reset('*');
    handleStepChange(0);
  });
  return (
    <Result
      status='success'
      title={resultTitle}
      subTitle={resultSubTitle}
      actions={
        <Space>
          { showResultReset && (
            <Button
              variant='outlined'
              {...(resultResetProps || {})}
              onClick={handleReset}
            >
              {resultResetText}
            </Button>
          )}
          { resultActions }
        </Space>
      }
    />
  );
}, { displayName: 'iimm.Mui.Formily.StepsForm.DefaultCompleteRender' });

DefaultCompleteRender.defaultProps = {
  resultTitle: '操作成功',
  resultSubTitle: '点击返回以再次操作',
  resultResetText: '返回',
};

DefaultCompleteRender.displayName = 'iimm.Mui.Formily.StepsForm.DefaultCompleteRender';

export default DefaultCompleteRender;
