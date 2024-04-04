import { observer } from "@formily/react";

import { useFormilyFieldProps } from "../../hooks";
import { SwitchBase, type SwitchBaseProps } from "./SwitchBase";

export const Switch = observer(
  (props: SwitchBaseProps) => {
    const formilyFieldProps = useFormilyFieldProps(props, { required: true, error: true });
    return <SwitchBase {...formilyFieldProps} />;
  },
  { displayName: "iimm.Mui.Formily.Switch" }
);
