const app = (() =>{
    let object = {}
    let containers = [];
    const mapCasesToObjects = (cases) =>{
        let table = $("#tabla > tbody");
        table.empty();
        receivedCases = cases.data.map(({country,deaths,confirmed,recovered}) =>({
            country:country,
            deaths:deaths,
            confirmed:confirmed,
            recovered: recovered
        }))
        receivedCases.forEach(({country, deaths, confirmed,recovered}) => {
            table.append(
                `<tr data-toggle=tab href=#TabCountry onclick=app.getStatsCountry('${country}','${deaths}','${confirmed}','${recovered}') style="cursor: pointer"> 
                      <td>${country}</td>
                      <td>${deaths}</td>
                      <td>${confirmed}</td>
                      <td>${recovered}</td>
                </tr>`
            );
        })
    }
    const mapCasesById = (cases) =>{
        let table = $("#casesByCountry > tbody");
        console.log(cases);
        table.empty();
        casesByCountry = cases.data.map(({province,deaths,confirmed,recovered,localization}) =>({
            province: province,
            deaths:deaths,
            confirmed:confirmed,
            recovered:recovered,
            localization:localization
        }))
        casesByCountry.forEach(({province,deaths,confirmed,recovered}) => {
            table.append(
                `<tr> 
                      <td>${province}</td>
                      <td>${deaths}</td>
                      <td>${confirmed}</td>
                      <td>${recovered}</td>
                </tr>`
            );
        })
        initMap(casesByCountry);
    }
    const getAllCases = () =>{
        coronaservice.getAllCases(mapCasesToObjects);
    }
    const fillTableStats = (country,deaths,confirmed,recovered) =>{
        let table = $("#case > tbody");
        table.empty()
        table.append(
            `<tr> <td>Country</td> <td>${country}</td> </tr>
             <tr> <td>Deaths</td> <td>${deaths}</td> </tr>
             <tr> <td>Infected</td><td>${confirmed}</td></tr>
             <tr> <td>Recovered</td> <td>${recovered}</td></tr>  
            `
        );
    }
    const getStatsByCountry = (country,deaths,confirmed,recovered) =>{
        fillTableStats(country,deaths,confirmed,recovered);
        coronaservice.getCasesByCountry(country,mapCasesById);
    }
    const mapContainers = () =>{

    }
    const deploy = (github,appname,mainclass) =>{
        const promise = new Promise((resolve) =>{
            object = {"AppName":appname,"gitRepo":github,"mainClass":mainclass};
            resolve();
        })
        promise.then( () =>{
            cloudservice.postApp(object,mapContainers);
        })
    }
    return{
        deploy:deploy
    }
})();
