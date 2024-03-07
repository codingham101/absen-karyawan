const response = (status_code, datas, message, res) =>{
    res.status(status_code)
        .json({
            payload : datas, 
            status_code : status_code,
            message : message
    })
}

module.exports = response;