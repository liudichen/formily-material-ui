import React from 'react';
import { observer, useForm } from '@formily/react';
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
    colon, labelAlign, labelLayout, labelPosition, wrapperAlign, labelWrap, labelWidth, wrapperWidth, wrapperWrap, fullWidth, tooltipIcon, tooltipLayout, showFeedback, feedbackLayout,
    xs, sm, md, lg, xl, defaultCols, noField, noForm,
    children,
    ...restProps
  } = props;
  const itemBaseProps = getItemColsProps((xs || sm || md || lg || xl) ? { xs, sm, md, lg, xl } : defaultCols);
  let form = useForm();
  if (noForm) form = null;
  return (
    <FormLayoutContext.Provider value={{ colon, labelAlign, labelLayout, labelPosition, wrapperAlign, labelWrap, labelWidth, wrapperWidth, wrapperWrap, fullWidth, tooltipIcon, tooltipLayout, showFeedback, feedbackLayout, noField }}>
      <Grid {...restProps} container>
        { React.Children.map(children, (child) => {
          if (!child) { return null; }
          if ((child.type?.displayName || child.type?.render?.name)?.startsWith('Grid')) {
            return child;
          }
          if (form && child.type?.displayName === 'Field') {
            const name = child.props.name;
            if (!name) { return null; }
            const field = form?.query(`${name}`)?.take()?.display ?? form?.query(`*.${name}`)?.take()?.display;
            if (field && field !== 'visible') {
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
};

export default FormLayout;
