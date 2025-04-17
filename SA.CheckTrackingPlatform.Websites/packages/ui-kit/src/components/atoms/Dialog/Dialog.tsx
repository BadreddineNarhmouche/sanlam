import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { memo } from 'react';
import Alert from '../Alert/Alert';
import Grid from '../Grid/Grid';
import Typography from '../Typography/Typography';
import styles from './styles';
import { Button, Icons } from '..';

interface Props {
  open: boolean;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  fullWidth?: boolean;
  title?: any;
  titleVariant?: 'error' | 'warning' | 'info' | 'success';
  content: any;
  actions?: any;
  footerWithBorder?: boolean;
  refContent?: any;
  handleClose?: () => void;
  handleBack?: () => void;
}

// istanbul ignore next
const DialogComponent = ({
  open,
  maxWidth,
  fullWidth = true,
  title,
  titleVariant,
  content,
  actions,
  footerWithBorder = false,
  refContent,
  handleClose,
  handleBack,
}: Props) => (
  <Dialog open={open} maxWidth={maxWidth} fullWidth={fullWidth} disablePortal>
    <DialogTitle>
      <Grid container spacing={2}>
        {handleBack || handleClose ? (
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item display="flex" alignItems="center">
              {handleBack && (
                <Button variant="text" onClick={handleBack}>
                  <Icons.ArrowBack />
                </Button>
              )}

              <Typography variant="h7" style={styles.alert}>
                {title}
              </Typography>
            </Grid>
            {handleClose && (
              <Grid item>
                <Button variant="text" onClick={handleClose}>
                  <Icons.Close />
                </Button>
              </Grid>
            )}
          </Grid>
        ) : (
          <Grid item xs={12}>
            {titleVariant ? (
              <Alert withBoxStyle={false} severity={titleVariant}>
                <Typography variant="h7" style={styles.alert}>
                  {title}
                </Typography>
              </Alert>
            ) : (
              <Typography variant="h7" style={styles.alert}>
                {title}
              </Typography>
            )}
          </Grid>
        )}
      </Grid>
    </DialogTitle>
    <DialogContent {...(refContent && { ref: refContent })}>
      {content}
    </DialogContent>
    {actions && (
      <DialogActions
        style={{
          ...styles.dialogActions,
          ...(footerWithBorder && { borderTop: '1px solid #EBEEF1' }),
        }}
      >
        {actions}
      </DialogActions>
    )}
  </Dialog>
);

export default memo(DialogComponent);
