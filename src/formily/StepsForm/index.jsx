import React from 'react';
import { useMemoizedFn, useSafeState } from 'ahooks';
import { createForm } from '@formily/core';
import { toJS } from '@formily/reactive';
import { FormProvider, ObjectField, observer } from '@formily/react';
import { Box, Step, StepContent, StepIcon, StepLabel, Stepper } from '@mui/material';

import StepForm from './StepForm';
import DefaultCompleteRender from './DefaultCompleteRender';

export const StepsForm = observer((props) => {
  const {
    children,
    onFinish, createFormOptions,
    ResultRender, resultTitle, resultSubTitle, showResultReset, resultActions, resultResetText, resultResetProps, onResultReset,
    stepContentProps,
    direction, orientation, alternativeLabel, labelPlacement, depend,
    formRef,
    ...restProps
  } = props;
  const [stepsCount, setStepCount] = useSafeState(() => React.Children.count(children));
  const getCount = useMemoizedFn(() => {
    let count = 0;
    React.Children.map(children, (child) => {
      if (child) {
        count += 1;
      }
    });
    return count;
  });
  const count = getCount();
  React.useEffect(() => {
    setStepCount(count);
  }, [count]);
  const [activeStep, setActiveStep] = useSafeState(0);
  const form = React.useMemo(() => createForm(createFormOptions || { validateFirst: true }), [depend]);
  React.useImperativeHandle(formRef, () => form, [form]);
  const handleStepChange = useMemoizedFn((step) => {
    if (typeof step === 'number') {
      setActiveStep(step);
    } else {
      if (step === 'next') {
        setActiveStep((s) => s + 1);
      } else if (step === 'previous') {
        setActiveStep((s) => (s - 1) || 0);
      }
    }
  });
  return (
    <Box>
      <FormProvider form={form}>
        <Stepper
          activeStep={activeStep}
          orientation={direction ?? orientation}
          alternativeLabel={alternativeLabel ?? (labelPlacement === 'vertical')}
          {...restProps}
        >
          { React.Children.map(children, (child, index) => {
            if (!child) { return null; }
            const { title, subTitle, icon = StepIcon, onFinish: onFinishProp, name } = child.props;
            const overwriteProps = {
              handleStepChange,
              current: activeStep,
              stepIndex: index,
              stepsCount,
            };
            if (!onFinishProp && index + 1 === stepsCount && onFinish) {
              overwriteProps.onFinish = onFinish;
            }
            return (
              <Step>
                <StepLabel optional={ subTitle } StepIconComponent={icon}>
                  { title }
                </StepLabel>
                { (direction ?? orientation) === 'vertical' && (
                  <StepContent {...(stepContentProps || {})}>
                    <ObjectField name={name ?? index}>
                      {(field) => {
                        return (
                          <>
                            {React.cloneElement(child, { ...overwriteProps, field })}
                          </>
                        );
                      }}
                    </ObjectField>
                  </StepContent>
                )}
              </Step>
            );
          })}
        </Stepper>
        { (direction ?? orientation) !== 'vertical' && (
          React.Children.map(children, (child, index) => {
            if (!child || index !== activeStep) { return null; }
            const { onFinish: onFinishProp, name } = child.props;
            const overwriteProps = {
              handleStepChange,
              current: activeStep,
              stepIndex: index,
              stepsCount,
            };
            if (!onFinishProp && index + 1 === stepsCount && onFinish) {
              overwriteProps.onFinish = onFinish;
            }
            return (
              <ObjectField name={name ?? index}>
                {(field) => {
                  return (
                    <Box>
                      { React.cloneElement(child, { ...overwriteProps, field })}
                    </Box>
                  );
                }}
              </ObjectField>
            );
          })
        )}
        { activeStep === stepsCount && stepsCount !== 0 && (
          <ResultRender
            handleStepChange={handleStepChange}
            form={form}
            values={toJS(form?.values)}
            resultTitle={resultTitle}
            resultSubTitle={resultSubTitle}
            resultActions={resultActions}
            showResultReset={showResultReset}
            resultResetText={resultResetText}
            resultResetProps={resultResetProps}
            onResultReset={onResultReset}
          />
        )}
      </FormProvider>
    </Box>
  );
}, { forwardRef: true });

StepsForm.defaultProps = {
  direction: 'horizontal',
  labelPlacement: 'horizontal',
  ResultRender: DefaultCompleteRender,
  showResultReset: true,
  resultResetText: '返回',
};

StepsForm.StepForm = StepForm;
StepsForm.displayName = 'muiFormilyStepsForm';
