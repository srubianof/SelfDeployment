const cloudservice = (() =>{
    const postApp = (app,callback) =>{
        axios.post('/newApp',JSON.stringify(app)).then(res=>{
            callback();
        })
    }
    const getApps = (callback) =>{
        axios.get('/apps').then(res=>{
            callback(res);
        })
    }

    return{
        postApp:postApp,
        getApps:getApps
    }
})();
