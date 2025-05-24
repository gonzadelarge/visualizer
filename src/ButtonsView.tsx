import React from 'react'

import ButtonItem from './components/ButtonItem'
import { colors } from './lib/colors';

type ButtonsViewProps = {
    setColor: (color: string) => void;
};

const style: React.CSSProperties = {
    position: 'absolute',
    width: '100%',
    left: '50%',
    bottom: 0,
    zIndex: 1,
    maxWidth: 720,
    display: 'flex',
    margin: '0 auto',
    padding: '36px 18px',
    transform: 'translateX(-50%)',
    justifyContent: 'space-evenly',
}

const ButtonsView: React.FC<ButtonsViewProps> = ({ setColor }) => {

    return (
        <div style={style}>
            {Object.keys(colors).map((key) => (<ButtonItem
                key={key}
                text={key}
                setColor={setColor}
            />))}
        </div>
    )
}

export default ButtonsView