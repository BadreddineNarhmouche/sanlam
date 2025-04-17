const styles = {
  root: {
    div: {
      height: '40px',
      borderRadius: '2px',
    },
  },
  selected: {
    backgroundColor: '#E6F1FA', // Selected page color
    color: '#0075C9',
    border: '1px solid #0075C9',
    borderRadius: '4px',
    height: '40px',
  },
  nonSelectedHover: {
    '&:hover': {
      borderRadius: '2px', // Example border radius
      height: '40px',
    },
  },
};

export default styles;
