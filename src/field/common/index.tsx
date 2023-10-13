import { Box, type BoxProps } from "@mui/material";

export const BoxWithFullWidth = ({ fullWidth, ...rest }: BoxProps & { fullWidth?: boolean }) => <Box {...rest} />;
