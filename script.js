const json = { "api": { "deviceTree": { "CardReader": [{ "driver": "MicroelectronicaNFC", "modName": "CardReader", "modVersion": 1, "port": "/dev/serial/by-id/usb-Silicon_Labs_CP2104_USB_to_UART_Bridge_Controller_014DF6DF-if00-port0", "status": 0, "statusDescr": "Idling" }], "CashAcceptor": [{ "driver": "ID003", "modName": "Money", "modVersion": 3, "port": "/dev/ttyS0", "status": 0, "type": "JCM", "version": "S(UKR)-03-MW SM-BDP04V029-21 28FEB17     " }], "CashDispenser": [{ "modName": "Dispenser", "modVersion": 2, "products": [] }], "POS": [{ "driver": "Ingenico", "modName": "POS", "modVersion": 1, "options": [{}, { "merchantIdx": "1" }], "port": "/dev/serial/by-id/usb-INGENICO_Ingenico_iUP250-if00", "status": 0 }], "Printer": [{ "driver": "SeaRRO", "modName": "Printer", "modVersion": 1, "papperState": -1, "port": "/dev/serial/by-id/usb-Silicon_Labs_CP2102_USB_to_UART_Bridge_Controller_0001-if00-port0", "status": 0 }], "ProductDispenser": [{ "driver": "ICT-CVD", "modName": "Dispenser", "modVersion": 2, "port": "/dev/ttyS5", "products": [{ "class": "Fare card", "count": 75, "name": "Kharkov fare card" }], "status": 0 }] }, "deviceTreeTypeMap": { "CashDispenser": [{ "products": [] }], "POS": [{ "options": [{}, { "merchantIdx": "number" }, {}] }], "ProductDispenser": [{ "products": [{ "count": "number" }] }] } } };
const jsonADT = json.api.deviceTree;
const jsonADTTM = json.api.deviceTreeTypeMap;
const cardReader = jsonADT.CardReader[0];
const cashAcceptor = jsonADT.CashAcceptor[0];
const cashDispenser = jsonADT.CashDispenser[0];
const pos = jsonADT.POS[0];
const printer = jsonADT.Printer[0];
const productDispenser = jsonADT.ProductDispenser[0];
let numberValue = [];
getNumberValue(jsonADTTM);

function createDOM(objectFromJSON) {
    let h3 = document.createElement('h3');
    let card = document.getElementById('card');

    switch (objectFromJSON) {
        case cardReader:
            h3.innerHTML = '1. Card Reader';
            card.appendChild(h3);
            break;

        case cashAcceptor:
            h3.innerText = '2. Cash Acceptor';
            card.appendChild(h3);
            break;

        case cashDispenser:
            h3.innerText = '3. Cash Dispenser';
            card.appendChild(h3);
            break;

        case pos:
            h3.innerText = '4. POS';
            card.appendChild(h3);
            break;

        case printer:
            h3.innerText = '5. Printer';
            card.appendChild(h3);
            break;

        case productDispenser:
            h3.innerText = '6. Product Dispenser';
            card.appendChild(h3);
            break;

        default:
            h3.innerText = ' ';
            card.appendChild(h3);
    }

    for (key in objectFromJSON) {
        let div = document.createElement('div');

        if (typeof (objectFromJSON[key]) === 'object' && objectFromJSON[key].length >= 0) {
            if (objectFromJSON.hasOwnProperty('products')) {
                if (objectFromJSON[key].length == 0) {
                    div.innerHTML = `<b>${key}:</b> no data returned`;
                    card.appendChild(div);
                } else {
                    div.innerHTML = `<b>${key}:</b> <br>
                        - class: ${objectFromJSON[key][0]['class']}<br>
                        - count: ${objectFromJSON[key][0]['count']}<br>
                        - name: ${objectFromJSON[key][0]['name']}`;
                    card.appendChild(div);

                    
                    if (objectFromJSON[key][0].hasOwnProperty(numberValue[1])) {
                        const form = document.createElement('form');
                        const inputForm = document.createElement('input');
                        const button = document.createElement('button');
                        inputForm.placeholder = `count: ${objectFromJSON[key][0]['count']}`;
                        form.appendChild(inputForm);
                        button.innerText = 'Change';
                        form.appendChild(button);
                        card.appendChild(form);
                    }
                }
            }
            if (objectFromJSON.hasOwnProperty('options')) {
                div.innerHTML = `<b>${key}:</b> <br>
                - merchantIdx: ${objectFromJSON[key][1]['merchantIdx']}<br>`
                card.appendChild(div);

                if (objectFromJSON[key][1].hasOwnProperty(numberValue[0])) {
                    const form = document.createElement('form');
                    const inputForm = document.createElement('input');
                    const button = document.createElement('button');
                    inputForm.placeholder = `merchantIdx: ${objectFromJSON[key][1]['merchantIdx']}`;
                    form.appendChild(inputForm);
                    button.innerText = 'Change';
                    form.appendChild(button);
                    card.appendChild(form);
                }
            }
        } else {
            div.innerHTML = `<b>${key}:</b> ${objectFromJSON[key]}`;
            card.appendChild(div);
        }
    }
    // Разделил каждое устройство горизонтальной линией
    const hr = document.createElement('hr');
    card.appendChild(hr);
    // Убрал горизонтальную полоску после крайнего элемента
    if (objectFromJSON == productDispenser) {
        card.removeChild(hr);
    }
}
createDOM(cardReader);
createDOM(cashAcceptor);
createDOM(cashDispenser);
createDOM(pos);
createDOM(printer);
createDOM(productDispenser);


// Узнаем свойство, значение которого равняется "number"
function getNumberValue(obj) {
    for (let prop in obj) {
        if (typeof (obj[prop]) === 'object') {
            getNumberValue(obj[prop]);
        } else {
            if (obj[prop] == "number") {
                numberValue.push(prop);
            }
        }
    }
}