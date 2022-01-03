import { useTheme } from "@mui/material"
import { AppColor } from "../theme/appTheme"


export const useAppColor = (color: AppColor) => {
    return useTheme().appColors[color];
}