import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import * as actions from "../actions/stocks";
import { Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, withStyles, ButtonGroup, Button } from "@material-ui/core";
import StockFormDialog from "./StockFormDialog";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useToasts } from "react-toast-notifications";


const styles = theme => ({
    root:{
        "& .MuiTableCell-head":{
            fontSize:"1.5rem"
        }
    },
    paper:{
        margin:theme.spacing(2),
        padding:theme.spacing(2)
    }
})


const StocksList = ({classes, ...props}) => {

    const {addToast} = useToasts();

    const [currentId, setCurrentId] = useState(0);

    useEffect(() => {
        props.fetchAllStocks()
    }, [])

    const onUpdate = id => {
        setCurrentId(id)
        setOpen(true);
    }

    const onDelete = id => {
        if(window.confirm('Вы уверены?'))
            props.deleteStock(id, ()=>addToast("Запись удалена успешно", {appearance: 'info'}));
    }
   

    //---for dialog open

    const [open, setOpen] = React.useState(false);
      
    const handleOpen = () => {
        setOpen(true);
    };
  
    const handleClose = (value) => {
        setOpen(false);
    };

    //---

    return (
        <Paper className={classes.paper} elevation={1}>
            <Grid container>
                 <Grid item xs={12}>
                    <Button variant="outlined" color="primary" onClick={handleOpen}>
                        Добавить +
                    </Button>
                    <StockFormDialog 
                        currentId = {currentId}
                        setCurrentId = {setCurrentId}
                        open={open} 
                        onClose={handleClose} 
                    /> 

                    <TableContainer>
                        <Table>
                            <TableHead className={classes.root}>
                                <TableRow>
                                    <TableCell>Наименование</TableCell>
                                    <TableCell>Тикер</TableCell>
                                    <TableCell>Отрасль</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    props.StocksList.map((record,index)=>{
                                        return (<TableRow key={index} hover>
                                            <TableCell>{record.title}</TableCell>
                                            <TableCell>{record.ticker}</TableCell>
                                            <TableCell>{record.industry.title}</TableCell> 
                                            <TableCell>
                                                <ButtonGroup variant="text">
                                                    <Button>
                                                        <EditIcon color="primary"
                                                            onClick={()=>{onUpdate(record.id)}}
                                                        />
                                                    </Button>
                                                    <Button>
                                                        <DeleteIcon color="secondary"
                                                            onClick={()=>{onDelete(record.id)}}/>
                                                    </Button>
                                                </ButtonGroup>
                                            </TableCell> 
                                        </TableRow>)
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>            
            </Grid>        
        </Paper>
    );
}

const mapStateToProps = state => ({    
        StocksList: state.Stocks.list    
})

const mapActionToProps = {
    fetchAllStocks: actions.fetchAll,
    deleteStock: actions.Delete
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(StocksList));
