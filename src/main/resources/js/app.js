const app = (() => {
    let object = {}
    let containers = [];

    const addToTable = (apps) => {
        console.log(apps)
        let table = $("#containers > tbody");
        table.empty();
        containers = apps.data.map(({AppName, gitRepo, url}) => ({
            AppName: AppName,
            gitRepo: gitRepo,
            url: url,
        }))
        containers.forEach(({AppName, gitRepo, url}) => {
            table.append(
                `<tr> 
                  <td>${AppName}</td>
                  <td>${gitRepo}</td>
                  <td><a href="${url}"></a>${url}</td>
                </tr>`
            );
        })
        console.log("holaaa")
    }
    const mapContainers = () => {
        cloudservice.getApps(addToTable);

    }
    const sanitizeInputs = (string) => {
        string = string.replace(/[^a-zA-Z 0-9,]/gim, "");
    }
    const deploy = (github, appname, mainclass) => {
        const promise = new Promise((resolve) => {
            sanitizeInputs(github);
            sanitizeInputs(appname);
            sanitizeInputs(mainclass);
            object = {"AppName": appname, "gitRepo": github, "mainClass": mainclass};
            resolve();
        })
        promise.then(() => {
            cloudservice.postApp(object, mapContainers);
        })
    }
    return {
        deploy: deploy
    }
})();
