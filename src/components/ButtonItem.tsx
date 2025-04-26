import React from 'react'

import { Button } from "../components/ui/button"

type ButtonItemProps = {
    text: string;
    value: string;
    setColor: (color: string) => void;
};


const ButtonItem: React.FC<ButtonItemProps> = ({ value, setColor, text }) => {
    const onClick = () => {
        setColor(value);
    }

    return (
        <Button
            color={text}
            onClick={onClick}
            variant="outline"
        >
            {text}
        </Button>
    )
}

export default ButtonItem