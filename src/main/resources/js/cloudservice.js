const cloudservice = (() =>{
    const postApp = (app,callback) =>{
        axios.post('/newApp',JSON.stringify(app)).then(res=>{
            console.log(app)
            callback();
        })
    }
    const getApps = (callback) =>{
        axios.get('/apps').then(res=>{
            console.log(res)
            callback(res);
        })
    }

    return{
        postApp:postApp,
        getApps:getApps
    }
})();
