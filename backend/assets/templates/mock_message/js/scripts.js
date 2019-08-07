async function main(){
    await getUsers();
    await getFunctions();

    document.getElementById('message-to-send').value = localStorage.getItem('curTyped');
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

async function getUsers(){
    let users = await httpSlack('/users');
    if (users) {
        let localUser = localStorage.getItem('user-select');
        let userSelect = document.getElementById('user-select');
        for (let name in users){
            let option = document.createElement('option');
            option.text = name;
            option.value = users[name];
            if (users[name] === localUser) option.selected = true;
            userSelect.add(option);
        }
    }
}

async function getFunctions(){
    let functions = await httpSlack('/functions');
    if (functions) {
        let localFunction = localStorage.getItem('function-select');
        let functionSelect = document.getElementById('function-select');
        for (let i = 0; i < functions.length; i++) {
            const fn = functions[i];
            let option = document.createElement('option');
            option.text = fn.name;
            option.value = fn.name;
            if (fn.name === localFunction) option.selected = true;
            functionSelect.add(option);
        }
    }
}

function onChangeSelect(type){
    let id = type + '-select';
    let select = document.getElementById(id);
    localStorage.setItem(id, select.value);
}

async function postMessage(){
    let fn_name = document.getElementById('function-select').value;
    let user_id = document.getElementById('user-select').value;
    let text = document.getElementById('message-to-send').value;
    let returnEl = document.getElementById('message-returned');

    localStorage.setItem('curTyped', text);

    let data = {fn_name, user_id, text};
    let messageReturned = await httpSlack('/post-message', 'POST', JSON.stringify(data));
    if (messageReturned) returnEl.innerHTML = messageReturned.message;
}

main();
