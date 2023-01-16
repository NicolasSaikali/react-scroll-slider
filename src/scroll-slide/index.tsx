import React, { Ref } from 'react'
import { styles } from './styles'
import { ScrollSlideType } from '../types'


export const ScrollSlide = React.forwardRef((props: ScrollSlideType, ref: Ref<HTMLDivElement>) => {
    const _styles = styles(props)
    return <div
     ref={ref => props?.getRef?.(ref)}
     className={`scroll-slide ${props.className}`}
     style={{..._styles, ...props.style}}>
        {
            props.children
        }
    </div>
})