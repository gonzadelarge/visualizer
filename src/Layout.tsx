import React, { useState } from 'react'
import CanvasView from './CanvasView'
import ButtonsView from './ButtonsView'


export default function Layout() {
    const [color, setColor] = useState<string>('#cccccc');

    return (
        <div className="flex h-screen w-full">

            <main className="flex-1 relative">
                <ButtonsView setColor={setColor} />
                <CanvasView color={color} />
            </main>
        </div>
    )
}
