
# react-scroll-slider

A package developed to design web application based on a vertical slider. Where each page / section is a slide.

## Usage
```typescript
function App(){
    const ref: Ref<ScrollSlider> = useRef(null)
    const [activeIndex, setActiveIndex] = useState(0)
    const [progress, setProgress] = useState(0)
    
    return (
        <ScrollSlider
            ref={ref}
            withProgress={true}
            onSlideChange={setActiveIndex}
            onProgress={setProgress}
            sensitivity={ScrollSliderSensitivity.HIGH}
            animationOptions={{
                easing: 'linear'
            }}
            slides={[
                {
                    children: <h1> Slide 1 </h1>
                },
                {
                    children: <h1> Slide 2 </h1>
                },
                {
                    children: <h1> Slide 3 </h1>
                },
            ]}
        >
    )
}
```

## Properties
Property | Required | Type | Description
--- | --- | --- | --- 
ref | false | Ref<ScrollSliderOOP> \| null \| undefined; | Ref object to use in the screen
slides | true | Array<{ children: any }> | The slides to show
sensitivity | false | ScrollSliderSensitivity | The sensitivity of the mouse wheel
progressComponent | false | JSX.Element | Custom progress component
withProgress | false | boolean | Defined whether to show the progress component or not
animationOptions | false | KeyframeAnimationOptions | Custom animation options
progressStyle | false | CSSProperties | Custom styles of the default progress component
style | false | CSSProperties | Custom styles for the slider
preventDefaultOn | false | string[] | List of selectors to lock scrolling on (when mouse pointer is over any of them)
onSlideChange | false | (index:number)=>void | callback to execute when active slide changes
onProgress | false | (progress: number)=>void | callback to execute on progress (0~1)

### ref
#### Example
```typescript
<Button
    onClick={() => ref?.current?.navigateToIndex(1)}
>
//...
```

### sensitivity
#### Example
```typescript
<ScrollSlider
    sensitivity={ScrollSliderSensitivity.HIGH}
>
//...
```

### animationOptions
#### Example 
```typescript
<ScrollSlider
    animationOptions={{
        easing: 'linear'
    }}>
//...
```