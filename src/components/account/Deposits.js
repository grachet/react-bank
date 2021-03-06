/* eslint-disable no-script-url */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits({ account, deposits }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  let ref;
  return (
    <React.Fragment>
      <Title>Actual Deposits</Title>
      <Typography component="p" variant={Math.abs(deposits) > 9999 ? "h6" : "h4"}>
        {/* 3,024.00 */}
        {deposits.toLocaleString(
          undefined, // leave undefined to use the browser's locale,
          // or use a string like 'en-US' to override it.
          { minimumFractionDigits: 2 }
        )}€
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        on {new Date().toDateString()}
      </Typography>
      <div>
        <Button color="primary" onClick={() => setOpen(!open)}>
          View your RIB
        </Button>
      </div>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogContent>
          <TextField
            inputRef={r => ref = r}
            margin="dense"
            fullWidth
            variant={"outlined"}
            value={account.RIB}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Close
          </Button>
          <Button onClick={() => {
            ref.select();
            ref.setSelectionRange(0, 99999);
            document.execCommand("copy");
          }} color="primary">
            Copy
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
