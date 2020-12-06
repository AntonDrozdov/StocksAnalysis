import api from "./api"

export const ACTION_TYPES={
    CREATE :'CREATE',
    UPDATE :'UPDATE',
    DELETE :'DELETE',
    FETCH_ALL :'FETCH_ALL'
}

const formatData = data =>({
    ...data,
    industry:{title: data.industry}
}) 

export const fetchAll = () => dispatch =>{  
    api.Stocks()
        .fetchAll()
        .then(response => {
            dispatch({
                type: ACTION_TYPES.FETCH_ALL,
                payload: response.data
            })
        })
        .catch(err=>console.log(err))
}

export const create = (data, onSuccess) => dispatch => {
    data = formatData(data);
    api.Stocks()
    .create(data)
    .then(response => {
        dispatch({
            type:ACTION_TYPES.CREATE,
            payload: response.data
        })
        onSuccess()    
    })
    .catch(err=>console.log(err))
}

export const update = (id, data, onSuccess) => dispatch => {
    data = formatData(data);
    api.Stocks()
    .update(id, data)
    .then(response => {
        dispatch({
            type:ACTION_TYPES.UPDATE,
            payload: {id, ...data}
        })
        onSuccess()    
    })
    .catch(err=>console.log(err))
}

export const Delete = (id, onSuccess) => dispatch => {
    api.Stocks()
    .delete(id)
    .then(response => {
        dispatch({
            type:ACTION_TYPES.DELETE,
            payload: id
        })
        onSuccess()    
    })
    .catch(err=>console.log(err))
}


