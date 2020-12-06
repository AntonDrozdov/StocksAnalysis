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
    title:'',
    ticker: '',
    industry: ''
};


 const CommonStockData = ({classes, ...props}) => {

    const {addToast} = useToasts()

    const validate = (fieldValues = values) => {
        let temp = {...errors}
        if('title' in fieldValues)
            temp.title = fieldValues.title ? "" : "Наименование обязательно";
        if('ticker' in fieldValues)    
            temp.ticker = fieldValues.ticker ? "" : "Тикер обязателен";
        if('industry' in fieldValues)     
            temp.industry = fieldValues.industry ? "" : "Отрасль обязательна";

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
                            name = "title"
                            variant="outlined"
                            label="Наименование"
                            value={values.title}
                            onChange={handleInputChange}
                            // error={true}
                            // helperText={errors.title}
                            {...(errors.title && {error:true, helperText:errors.title})}
                        />
                        <TextField
                            name = "ticker"
                            variant="outlined"
                            label="Тикер"
                            value={values.ticker}
                            onChange={handleInputChange}
                            //error={true}
                            //helperText={errors.ticker}
                            {...(errors.ticker && {error:true, helperText:errors.ticker})}
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
                                name='industry'
                                value={values.industry}
                                onChange={handleInputChange}
                                label="Отрасль"

                                // {...(errors.industry && {error:true, helperText:errors.industry})}
                            >                        
                                <MenuItem value="Нефть/Газ">Нефть/Газ</MenuItem>
                                <MenuItem value="Финансы">Финансы</MenuItem>
                                <MenuItem value="Электроэнергетика">Электроэнергетика</MenuItem>
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

CommonStockData.propTypes = {
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

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(CommonStockData));