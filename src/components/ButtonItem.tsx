import React from 'react'

import { colors } from '../lib/colors';
import { Button } from "../components/ui/button"
import { hexToHexWithAlpha } from '../lib/helpers';

type ButtonItemProps = {
    text: string;
    setColor: (color: string) => void;
};


const ButtonItem: React.FC<ButtonItemProps> = ({ text, setColor }) => {
    const onClick = () => {
        setColor(colors[text]);
    }

    return (
        <Button
            size="icon"
            variant="outline"
            onClick={onClick}
            style={{
                borderColor: colors[text],
                background: hexToHexWithAlpha(colors[text], 0.6),
            }}
        >
        </Button>
    )
}

export default ButtonItem