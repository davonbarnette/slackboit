async function main(){

}

async function httpSlack(route, method, data){
    let url = '/slack' + route;
    let params = {
        headers:{"content-type": "application/json"},
        method:method || "GET"
    };
    if (data) params.body = data;
    let res = await fetch(url, params);
    return await res.json();
}

async function reboot(){
    let rebooted = await httpSlack('/reboot');
    let status = document.getElementById('status');
    status.innerHTML = rebooted.message;
}

main();
