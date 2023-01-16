import { CSSProperties } from "react";
import { ScrollSlideType } from "../types";

export const styles : (props: ScrollSlideType) => CSSProperties = (props: ScrollSlideType) => {
    return {
        position: 'absolute',
        left: 0,
        width: '100%',
        height: window.innerHeight,
        top: (props?.index || 0) * window.innerHeight,
        overflowY: "visible",
    }
}