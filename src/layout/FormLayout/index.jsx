import React from 'react';
import { observer, useForm } from '@formily/react';
import { useCreation } from 'ahooks';
import { Grid } from '@mui/material';
import { HelpOutline } from '@mui/icons-material';

export const FormLayoutContext = React.createContext(null);
export const useFormLayout = () => React.useContext(FormLayoutContext);

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

export const FormLayout = observer((props) => {
  const {
    // eslint-disable-next-line no-unused-vars
    colon, labelAlign, labelLayout, labelPosition, wrapperAlign, labelWrap, labelWidth, wrapperWidth, wrapperWrap, fullWidth, tooltipIcon, tooltipLayout, showFeedback, feedbackLayout, withFormItem,
    xs, sm, md, lg, xl, defaultCols, noField, noForm,
    children,
    ...restProps
  } = props;
  const itemBaseProps = getItemColsProps((xs || sm || md || lg || xl) ? { xs, sm, md, lg, xl } : defaultCols);
  const form = useForm();
  const layout = useCreation(() => ({ colon, labelAlign, labelLayout, labelPosition, wrapperAlign, labelWrap, labelWidth, wrapperWidth, wrapperWrap, fullWidth, tooltipIcon, tooltipLayout, showFeedback, feedbackLayout, noField, withFormItem }), [colon, labelAlign, labelLayout, labelPosition, wrapperAlign, labelWrap, labelWidth, wrapperWidth, wrapperWrap, fullWidth, tooltipIcon, tooltipLayout, showFeedback, feedbackLayout, noField, withFormItem]);
  return (
    <FormLayoutContext.Provider value={layout}>
      <Grid {...restProps} container>
        { React.Children.map(children, (child) => {
          if (!child) { return null; }
          if (['Grid', 'Grid2'].includes(child.type?.displayName || child.type?.render?.name)) {
            return child;
          }
          if (!noForm && form && ['Field', 'ObjectField', 'ArrayField', 'VoidField'].includes(child.type?.displayName || child.type?.render?.name)) {
            const name = child.props.name;
            if (!name) { return null; }
            const display = form?.query(`${name}`)?.take()?.display ?? form?.query(`*.${name}`)?.take()?.display;
            if (display && display !== 'visible') {
              return null;
            }
          }
          return (
            <Grid item {...{ ...itemBaseProps, ...getItemColsProps(child.props) }}>
              {child}
            </Grid>
          );
        })}
      </Grid>
    </FormLayoutContext.Provider>
  );
});

FormLayout.defaultProps = {
  defaultCols: { xs: 6, sm: 4, md: 3, xl: 2 },
  labelWidth: 80,
  tooltipLayout: 'icon',
  tooltipIcon: <HelpOutline fontSize='small' />,
  feedbackLayout: 'text',
  spacing: 0.5,
  fullWidth: true,
  withFormItem: true,
};

export default FormLayout;
