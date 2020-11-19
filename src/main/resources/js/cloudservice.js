const cloudservice = (() =>{
    const postApp = (app,callback) =>{
        axios.post('/newApp',JSON.stringify(app)).then(res=>{
            callback(res);
        })
    }

    return{
        postApp:postApp
    }
})();
