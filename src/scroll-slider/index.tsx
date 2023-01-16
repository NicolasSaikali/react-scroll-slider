import React from "react";
import { ScrollSlideType, ScrollSliderState, ScrollSliderType } from "../types";
import { ScrollSlide } from "../scroll-slide";
import { styles } from "./styles";


export default class ScrollSlider extends React.Component<ScrollSliderType, ScrollSliderState>{
    private animationOptions: KeyframeAnimationOptions = {
        duration: 700,
        direction: "normal",
        fill: "forwards",
        easing: "ease-in-out"
    };

    constructor(props: ScrollSliderType) {
        super(props);
        this.state = {
            activeSlide: 0,
            refs: new Array(props?.slides?.length || 0),
            options: {
                ...this.animationOptions,
                ...props.animationOptions
            },
            lastTouchY: Infinity
        }
    }

    public _getState() {
        return this.state
    }

    public animateForward = () => {
        for (let i = 0; i <= this.state.activeSlide + 1; i++) {
            const animation = {
                top: `-${(this.state.activeSlide - i + 1) * window.innerHeight}px`,
            }
            this.state.refs[i].animate([animation], this.animationOptions)
        }
    }

    public animateBackwards = () => {
        for (let i = this.state.activeSlide; i >= 0; i--) {
            const animation = {
                top: `${(i - this.state.activeSlide + 1) * window.innerHeight}px`,

            }
            this.state.refs[i].animate([animation], this.animationOptions)
        }
    }

    public updateRefsAtIndex = (index: number, value: HTMLDivElement) => {
        const clone = this.state.refs
        clone[index] = value
        this.setState({ refs: clone })
    }

    public showNextSlide = () => {
        if (this.state.activeSlide < this.props.slides?.length - 1) {
            this.props?.onSlideChange?.(this.state.activeSlide + 1)
            this.props?.onProgress?.((this.state.activeSlide + 1) / (this.props.slides.length - 1))
            this.animateForward()
            this.setState({ activeSlide: this.state.activeSlide + 1 })
        }
    }
    public showPreviousSlide = () => {
        if (this.state.activeSlide > 0) {
            this.props?.onSlideChange?.(this.state.activeSlide - 1)
            this.props?.onProgress?.((this.state.activeSlide - 1) / (this.props.slides.length - 1))
            this.animateBackwards()
            this.setState({ activeSlide: this.state.activeSlide - 1 })
        }
    }

    public handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        console.log(e.currentTarget.closest(".scroll-slide"))
        const dy = (e?.nativeEvent as any)?.['deltaY']
        if (dy > 0)
            this.showNextSlide()
        else this.showPreviousSlide()
    }

    public handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        this.setState({ lastTouchY: e.touches[0]?.clientY })
    }

    public handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
        if (e.changedTouches[0]?.clientY < this.state.lastTouchY)
            this.showNextSlide()
        else this.showPreviousSlide()
    }
    public renderItem = (item: ScrollSlideType, index: number) => {
        return <ScrollSlide
            {...item}
            getRef={ref => {
                if (!!ref && this.state?.refs?.indexOf(ref) === -1) this.updateRefsAtIndex(index, ref)
            }}
            style={{
                ...item.style,
                zIndex: index * 10
            }}
            key={index}
            index={index}
            active={index === this.state.activeSlide} />
    }
    public renderProgress = () => {
        if (this.props.withProgress)
            return this.props.progressComponent
                ? this.props.progressComponent
                : (
                    <div style={{
                        ...progressStyle,
                        ...this.props.progressStyle,
                        width: `${(this.state.activeSlide / (this.props.slides.length - 1)) * 100}vw`
                    }}
                        className='progress'>
                    </div>
                )
    }

    public navigateToIndex(index: number) {
        let direction = "forwards"
        let delay = this.animationOptions.duration
        
        if(index === this.state.activeSlide)
            return

        else if (index < this.state.activeSlide) {
            direction = "backwards"
        }

        if (!!delay)
            delay = parseInt(delay?.toString())
        else delay = 500

        if (direction === "backwards") {
            for(let i = this.state.activeSlide; i>=0; i--){
                const animation = {
                    top: `${(i - index) * window.innerHeight}px`
                }
                this.state.refs[i].animate([animation], this.animationOptions)
            }
        } else {
            for(let i = 0; i<this.state.refs.length; i++){
                const animation = {
                    top: `-${(index - i) * window.innerHeight}px`
                }
                this.state.refs[i].animate([animation], this.animationOptions)
            }
        }

        this.setState({ activeSlide: index })
        this.props?.onSlideChange?.(index)
        this.props?.onProgress?.((index + 1) / (this.props.slides.length - 1))
    }

    render() {
        return <div
            onTouchStart={this.handleTouchStart}
            onTouchEnd={this.handleTouchEnd}
            onWheel={this.handleScroll}
            style={{ ...styles, ...this.props.style }}>
            {this.renderProgress()}
            {this.props?.slides?.map(this.renderItem)}
        </div>
    }

}

const progressStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 20,
    transition: '200ms',
    height: '10px',
    backgroundColor: "lightblue",
}
