import React from "react";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import { withStyles} from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import * as actions from "../actions/stocks";
import CommonStockData from "./CommonStockData";

const styles = theme => ({
    offset: theme.mixins.toolbar,
    formControl: {
        margin: theme.spacing(1),
        minWidth: 230,
      },
    root:{
    '& .MuiTextField-root': {
        margin: theme.spacing(1),
        minWidth: 230,
      }
    },
    smMargin:{
        margin: theme.spacing(1),
    },    
    paper:{
        margin:theme.spacing(2),
        padding:theme.spacing(2)
    },
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
})

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });


const StockFormDialog = ({classes, ...props}) => {

    const { onClose, open, currentId, setCurrentId } = props;

    const handleClose = () => {
        debugger;
        // resetForm();
        setCurrentId(0);
        onClose();
    };

    return (        
        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
            <AppBar  position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        {"Создание/Обновление ЦБ"}
                    </Typography>

                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                </Toolbar>
                {/* <div className={classes.offset} /> */}
            </AppBar>

            <CommonStockData
                currentId = {currentId}
                setCurrentId = {setCurrentId}
            />
            <CommentStockData
                currentId = {currentId}
                setCurrentId = {setCurrentId}
            />
           
      </Dialog>
    );
}

StockFormDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
  };
  
const mapStateToProps = state => ({    
    StocksList: state.Stocks.list    
})

const mapActionToProps = {
    createStock: actions.create,
    updateStock: actions.update
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(StockFormDialog));

 