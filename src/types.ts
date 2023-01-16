import { CSSProperties, Ref } from "react";
import ScrollSlider from "./scroll-slider";

export type ScrollSlideType = {
    index?: number;
    children: any;
    active?: boolean;
    getRef?: (ref?: HTMLDivElement | null) => void; 
    style?: CSSProperties;
    className?: string;
}

export type ScrollSliderState = {
    activeSlide: number;
    refs: Array<HTMLDivElement>;
    options: KeyframeAnimationOptions;
    lastTouchY: number
}

export type ScrollSliderType = {
    ref?: Ref<ScrollSlider> | null | undefined;
    slides: ScrollSlideType[];
    animationType?: "fade-in" | "translate" | "translate-fade-in";
    progressComponent?: JSX.Element
    withProgress?: boolean;
    animationOptions?: KeyframeAnimationOptions;
    progressStyle?: CSSProperties,
    style?: CSSProperties,
    onSlideChange?: (newSlide: number) => void;
    onProgress?:(progress: number) => void
}