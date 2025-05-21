import React from 'react'

import ButtonItem from './components/ButtonItem'

type ButtonsViewProps = {
    setColor: (color: string) => void;
};

const style: React.CSSProperties = {
    position: 'absolute',
    width: '100%',
    left: 0,
    bottom: 0,
    zIndex: 1,
    padding: 30,
    display: 'flex',
    justifyContent: 'space-evenly',
}

const ButtonsView: React.FC<ButtonsViewProps> = ({ setColor }) => {

    return (
        <div style={style}>
            <ButtonItem setColor={setColor} text={"gray"} />
            <ButtonItem setColor={setColor} text={"violet"} />
            <ButtonItem setColor={setColor} text={"blue"} />
            <ButtonItem setColor={setColor} text={"gold"} />
            <ButtonItem setColor={setColor} text={"cyan"} />
            <ButtonItem setColor={setColor} text={"orange"} />
        </div>
    )
}

export default ButtonsView