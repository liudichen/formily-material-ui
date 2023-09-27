import { useEffect, useImperativeHandle, Children, cloneElement } from "react";
import type { ComponentType, RefObject, ReactNode } from "react";
import { useCreation, useMemoizedFn, useSafeState } from "ahooks";
import { createForm, type IFormProps, type Form } from "@formily/core";
import { toJS } from "@formily/reactive";
import { FormProvider, ObjectField } from "@formily/react";
import {
  Box,
  Step,
  StepContent,
  StepIcon,
  StepLabel,
  Stepper,
  type StepperProps,
  type StepContentProps,
  type StepIconProps,
} from "@mui/material";

import { StepForm, type StepFormProps } from "./StepForm";
import DefaultCompleteRender, { type ResultRenderProps as StepsFormResultRenderProps } from "./DefaultCompleteRender";

interface StepsFormProps
  extends StepperProps,
    Omit<StepsFormResultRenderProps, "values" | "form" | "handleStepChange"> {
  form?: Form;
  direction?: "horizontal" | "vertical";
  labelPlacement?: "horizontal" | "vertical";
  onFinish?:
    | ((values?: object, allValues?: object) => void | boolean)
    | ((values?: object, allValues?: object) => Promise<void | boolean>);
  /** 传递给createForm的参数
   * @default {validateFirst:true}
   */
  createFormOptions?: IFormProps;

  ResultRender?: ComponentType<StepsFormResultRenderProps>;

  stepContentProps?: StepContentProps;
  /** 重建form实例的depend项 */
  depend?: any;
  /** 获取form实例 */
  formRef?: RefObject<Form>;
  showReset?: boolean;
  children?: ReactNode;
}

const StepsForm = (props: StepsFormProps) => {
  const {
    children,
    onFinish,
    createFormOptions,
    ResultRender = DefaultCompleteRender,
    resultTitle,
    resultSubTitle,
    showResultReset,
    resultActions,
    resultResetText,
    resultResetProps,
    onResultReset,
    resultContent,
    stepContentProps,
    direction = "horizontal",
    orientation,
    alternativeLabel,
    labelPlacement = "horizontal",
    depend,
    formRef,
    form: formProp,
    showReset: showResetParent,
    ...restProps
  } = props;
  const [stepsCount, setStepCount] = useSafeState(() => Children.count(children));
  const getCount = useMemoizedFn(() => {
    let count = 0;
    Children.map(children, (child) => {
      if (child) {
        count += 1;
      }
    });
    return count;
  });
  const count = getCount();
  useEffect(() => {
    setStepCount(count);
  }, [count]);
  const [activeStep, setActiveStep] = useSafeState(0);
  const form = useCreation(
    () => formProp || createForm(createFormOptions || { validateFirst: true }),
    [depend, createFormOptions, formProp]
  );
  useImperativeHandle(formRef, () => form, [form]);
  const handleStepChange = useMemoizedFn((step) => {
    if (typeof step === "number") {
      setActiveStep(step);
    } else {
      if (step === "next") {
        setActiveStep((s) => s + 1);
      } else if (step === "previous") {
        setActiveStep((s) => s - 1 || 0);
      }
    }
  });
  const handleReset = useMemoizedFn(() => {
    form?.reset("*");
    setActiveStep(0);
  });
  return (
    <Box>
      <FormProvider form={form}>
        <Stepper
          activeStep={activeStep}
          orientation={direction ?? orientation}
          alternativeLabel={alternativeLabel ?? labelPlacement === "vertical"}
          {...restProps}
        >
          {Children.map(children, (child, index) => {
            if (!child) {
              return null;
            }
            // @ts-ignore
            const {
              title,
              subTitle,
              icon = StepIcon,
              onFinish: onFinishProp,
              name,
              showReset: showResetProp,
              onReset,
              // @ts-ignore
            } = child?.props || {};
            const showReset = showResetProp ?? showResetParent;
            const overwriteProps: Partial<StepFormProps> = {
              handleStepChange,
              current: activeStep,
              stepIndex: index,
              stepsCount,
              showReset,
            };
            if (!onFinishProp && index + 1 === stepsCount && onFinish) {
              overwriteProps.onFinish = onFinish;
            }
            if (showReset) {
              overwriteProps.onReset = () => {
                handleReset();
                onReset?.();
              };
            }
            return (
              <Step>
                <StepLabel optional={subTitle} StepIconComponent={icon}>
                  {title}
                </StepLabel>
                {(direction ?? orientation) === "vertical" && (
                  <StepContent {...(stepContentProps || {})}>
                    <ObjectField name={name ?? index}>
                      {(field) => {
                        return <>{cloneElement(child as any, { ...overwriteProps, field })}</>;
                      }}
                    </ObjectField>
                  </StepContent>
                )}
              </Step>
            );
          })}
        </Stepper>
        {(direction ?? orientation) !== "vertical" &&
          Children.map(children, (child, index) => {
            if (!child) {
              return null;
            }
            // @ts-ignore
            const { onFinish: onFinishProp, name, showReset: showResetProp, onReset } = child?.props || {};
            const showReset = showResetProp ?? showResetParent;
            const overwriteProps: Partial<StepFormProps> = {
              handleStepChange,
              current: activeStep,
              stepIndex: index,
              stepsCount,
              showReset,
            };
            if (!onFinishProp && index + 1 === stepsCount && onFinish) {
              overwriteProps.onFinish = onFinish;
            }
            if (showReset) {
              overwriteProps.onReset = () => {
                handleReset();
                onReset?.();
              };
            }
            return (
              <ObjectField name={name ?? index}>
                {(field) => {
                  return (
                    <Box sx={index !== activeStep ? { display: "none" } : {}}>
                      {cloneElement(child as any, { ...overwriteProps, field })}
                    </Box>
                  );
                }}
              </ObjectField>
            );
          })}
        {activeStep === stepsCount && stepsCount !== 0 && (
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
            resultContent={resultContent}
          />
        )}
      </FormProvider>
    </Box>
  );
};
StepsForm.defaultProps = {
  showResultReset: true,
  resultResetText: "返回",
};

StepsForm.StepForm = StepForm;

export { StepsForm, type StepsFormProps, type StepFormProps, type StepIconProps, type StepsFormResultRenderProps };
