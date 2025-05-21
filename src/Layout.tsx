import React, { useState } from 'react'

import CanvasView from './CanvasView'
import ButtonsView from './ButtonsView'

const containerStyle: React.CSSProperties = {
    height: '100dvh',
    width: '100dvw',
}

const mainStyle: React.CSSProperties = {
    background: '#14141d',
    position: 'relative',
    height: '100%',
    width: '100%',
}

export default function Layout() {
    const [color, setColor] = useState<string>('#cccccc');

    return (
        <div style={containerStyle}>

            <main style={mainStyle}>
                <CanvasView color={color} />
                <ButtonsView setColor={setColor} />
            </main>
        </div>
    )
}
