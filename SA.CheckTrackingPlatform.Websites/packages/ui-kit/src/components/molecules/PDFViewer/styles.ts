import * as CSS from 'csstype';
interface CustomCSSProperties extends CSS.Properties {
    '--scale-factor'?: number;
}
const buttonStyle = {
    cursor: 'pointer',
    border: 'none',
    borderRadius: '4px',
    padding: '4px 8px',
    '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, .1)',
        transition: 0.7
    }
};

const viewer : CustomCSSProperties  = {
    height: '160vh',
    width: '100%',
    overflowY: 'auto',
    "--scale-factor": 1,
};

export {
    buttonStyle,
    viewer,
};