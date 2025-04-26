import React from 'react'

import ButtonItem from './components/ButtonItem'

type ButtonsViewProps = {
    setColor: (color: string) => void;
};

const style: React.CSSProperties = {
    position: 'absolute',
    gap: 12,
    top: 20,
    left: 20,
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
}

const ButtonsView: React.FC<ButtonsViewProps> = ({ setColor }) => {

    return (
        <div style={style}>
            <ButtonItem value={'#cccccc'} setColor={setColor} text={"Gray"} />
            <ButtonItem value={'#8A2BE2'} setColor={setColor} text={"Violet"} />
            <ButtonItem value={'#156dd1'} setColor={setColor} text={"Blue"} />
            <ButtonItem value={'#FFD700'} setColor={setColor} text={"Gold"} />
            <ButtonItem value={'#00CED1'} setColor={setColor} text={"Cyan"} />
            <ButtonItem value={'#d9761a'} setColor={setColor} text={"Orange"} />
        </div>
    )
}

export default ButtonsView