import React, {useEffect} from "react";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import { Paper, Grid, TextField, withStyles, FormControl, InputLabel, Select, MenuItem, Button, FormHelperText } from "@material-ui/core";
import useForm from "./useForm";
import { useToasts } from "react-toast-notifications";
import * as actions from "../actions/stocks";

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

const initialFieldValues = {
    content:'',
    rating: ''
};


 const CommentStockData = ({classes, ...props}) => {

    const {addToast} = useToasts()

    const validate = (fieldValues = values) => {
        let temp = {...errors}
        if('content' in fieldValues)
            temp.title = fieldValues.title ? "" : "Комментарий обязателен";
        if('rating' in fieldValues)    
            temp.ticker = fieldValues.ticker ? "" : "Рейтинг обязателен";
        
        setErrors({
            ...temp
        })

        if(fieldValues === values)
            return Object.values(temp).every(x => x=== "");
    }

    const { values, setValues, errors, setErrors, handleInputChange, resetForm } 
    = useForm(initialFieldValues, validate, props.setCurrentId);

    const handleSubmit = e => {
        debugger;
        e.preventDefault();
        
        console.log(values);

        if(validate()) {
            
            const onSuccess = (message) => {
                debugger;                
                addToast(message, {appearance: 'success'} )
            }

            if(props.currentId === 0){
                debugger;
                props.createStock(values, onSuccess("Запись добавлена успешно"))
            }                
            else{
                debugger;
                props.updateStock(props.currentId, values, onSuccess("Запись обновлена успешно"))
            }
        }
    }

    useEffect(() => {
        debugger;
        if(props.currentId !== 0) {

            let currentStock = props.StocksList.find(x => x.id === props.currentId)
            setValues({
                ...currentStock,
                industry : currentStock.industry.title                
            })
        }
    }, [props.currentId]) 



     return (  
        <Paper className={classes.paper} elevation={1}>
            <form autoComplete="off" noValidate className = {classes.root} onSubmit = {handleSubmit}> 
                <Grid container>
                    <Grid                 
                        item xs={6}
                    >
                        <TextField
                            name = "content"
                            variant="outlined"
                            label="Комментарий"
                            value={values.content}
                            onChange={handleInputChange}
                            // error={true}
                            // helperText={errors.title}
                            {...(errors.title && {error:true, helperText:errors.title})}
                        />                     

                        <FormControl 
                            variant="outlined" 
                            className={classes.formControl}
                            //error={true}
                            //helperText={errors.industry}
                            {...(errors.industry && {error: true})}
                            >
                            <InputLabel>Отрасль</InputLabel>
                            <Select                        
                                name='rating'
                                value={values.rating}
                                onChange={handleInputChange}
                                label="Рейтинг"

                                // {...(errors.industry && {error:true, helperText:errors.industry})}
                            >                        
                                <MenuItem value="покупать">Нефть/Газ</MenuItem>
                                <MenuItem value="держать">Финансы</MenuItem>
                                <MenuItem value="продавать">Электроэнергетика</MenuItem>
                            </Select>
                            {errors.industry&&<FormHelperText>{errors.industry}</FormHelperText>}
                        </FormControl>                
                    </Grid>
                    <Grid item xs={6}>
                        <div>
                            <Button
                                className={classes.smMargin}
                                variant="contained"
                                color="primary"
                                type="submit"
                            >
                                Сохранить
                            </Button>

                            <Button
                                className={classes.smMargin}
                                variant="contained"
                                onClick={resetForm}
                            >
                                Сбросить
                            </Button>                       
                        </div>
                    </Grid>
                </Grid> 
            </form> 
     </Paper>
                );
}

CommentStockData.propTypes = {
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

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(CommentStockData));