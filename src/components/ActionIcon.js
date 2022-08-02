import {Icon} from "@iconify/react";

const IconStyle = (color) => ({
    color,
    fontSize: '24px',
    margin: (0, 10, 0, 10)
});

export default function ActionIcon({ icon, color, action }) {
    return <Icon style={IconStyle(color)} icon={icon} onClick={action} />;
}