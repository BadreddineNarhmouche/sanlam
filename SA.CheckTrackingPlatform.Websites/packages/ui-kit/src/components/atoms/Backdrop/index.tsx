import { memo } from 'react';
import { Modal, Box, Grid, CircularProgress, Typography } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-100%, -100%)',
};

const BackdropComponent = (props: any) => {
  const isOpen = props.open ?? props.loading ?? false;

  return (
      <Modal hideBackdrop open={isOpen}>
          <Box sx={{ ...style }}>
              <Grid container direction="column" justifyContent="center" alignItems="center" >
                  <Grid item xs={6}>
                      <CircularProgress />
                  </Grid>
                  <Grid item xs={6}>
                      <Typography >Chargement en cours</Typography>
                  </Grid>
              </Grid>
          </Box>
      </Modal>
  );
};

export default memo(BackdropComponent);
