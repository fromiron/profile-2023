'use client';
import { useState } from "react"

export default function Home() {
    const [size, setSize] = useState(200);
    const [scale, setScale] = useState(0.1);
    const sizeUp = () => setSize(size + 100);
    const scaleUp = () => setScale(scale + 0.1);
    return (
        <main>
            {/* <div className={`bg-primary w-40 `} style={{
                
                height:`${size}px`,
                scale: scale

                }}>{size}</div>
            <button onClick={sizeUp} >size up!</button>
            <button onClick={scaleUp} >scale up!</button> */}

        </main>
    )
}
