import React, { createContext, useContext } from 'react';
import { Grid } from '@mui/material';
import { HelpOutline } from '@mui/icons-material';

export const FormLayoutContext = createContext(null);
export const useFormLayout = () => useContext(FormLayoutContext);

const getItemColsProps = (props) => {
  const { xs, sm, md, lg, xl } = props || {};
  const newProps = {};
  if (xs) newProps.xs = xs;
  if (sm)newProps.sm = sm;
  if (md)newProps.md = md;
  if (lg)newProps.lg = lg;
  if (xl) newProps.xl = xl;
  return newProps;
};

export const FormLayout = (props) => {
  const {
    // eslint-disable-next-line no-unused-vars
    colon, labelAlign, labelLayout, labelPosition, wrapperAlign, labelWrap, labelWidth, wrapperWidth, wrapperWrap, fullWidth, tooltipIcon, tooltipLayout, showFeedback, feedbackLayout,
    xs, sm, md, lg, xl, defaultCols,
    children,
    ...restProps
  } = props;
  const itemBaseProps = getItemColsProps((xs || sm || md || lg || xl) ? { xs, sm, md, lg, xl } : defaultCols);
  return (
    <FormLayoutContext.Provider value={{ colon, labelAlign, labelLayout, labelPosition, wrapperAlign, labelWrap, labelWidth, wrapperWidth, wrapperWrap, fullWidth, tooltipIcon, tooltipLayout, showFeedback, feedbackLayout }}>
      <Grid {...restProps} container>
        { React.Children.map(children, (child) => {
          if (!child) return null;
          if (child.props.item === true || child.props.container === true) return child;
          return (
            <Grid item {...{ ...itemBaseProps, ...getItemColsProps(child.props) }}>
              {child}
            </Grid>
          );
        })}
      </Grid>
    </FormLayoutContext.Provider>
  );
};

FormLayout.defaultProps = {
  defaultCols: { xs: 6, sm: 4, md: 3, xl: 2 },
  labelWidth: 80,
  tooltipLayout: 'icon',
  tooltipIcon: <HelpOutline fontSize='small' />,
  feedbackLayout: 'text',
};

export default FormLayout;
