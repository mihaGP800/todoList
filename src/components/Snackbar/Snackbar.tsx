import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {useAppSelector} from '../../app/store';
import {selectError, setErrorAC} from '../../app/app-reducer';
import {useDispatch} from 'react-redux';
import {Slide} from '@mui/material';
import {TransitionProps} from '@mui/material/transitions';


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function TransitionUp(props: TransitionProps) {
    return <Slide {...props} direction="up"/>;
}

export const SnackbarError = () => {

    const error = useAppSelector(selectError)
    const dispatch = useDispatch()

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        dispatch(setErrorAC(null))
    };

    return (
        <Stack spacing={2} sx={{width: '100%'}}>
            <Snackbar open={!!error}
                      anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                      TransitionComponent={TransitionUp}
                      autoHideDuration={3000}
                      onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                    {error}
                </Alert>
            </Snackbar>
        </Stack>
    );
};
