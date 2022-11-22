const request = require('request');

function transmit(question, possibleAnswers, phone, callback) {

    if (question === undefined || possibleAnswers === undefined || phone === undefined) {
        return callback({
            message: 'Question, Options, and Phone are required'
        });
    }

    const url = 'https://graph.facebook.com/v15.0/' + process.env.IdentificadorNumTel + '/messages';

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + process.env.Token
    };

    const buttons = possibleAnswers.map((option, index) => {
        return {
            type: "reply",
            "reply": {
                "id": `UNIQUE_BUTTON_ID_${index}`,
                "title": option
            }
        }
    });

    const body = {
        "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "to": phone,
        "type": "interactive",
        "interactive": {
            "type": "button",
            "body": {
                "text": question
            },
            "action": {
                "buttons": buttons
            }

        }
    };

    const options = {
        url: url,
        headers: headers,
        body: JSON.stringify(body),
    };

    request.post(options, (err, res, body) => {
        if (err) {
            return callback(err);
        }
        return callback(null, body);
    });
}

function retrive(callback) {

    const mode = "subscribe"

    const token = process.env.Token;

    const url = 'http://localhost:3000/dev/webhook?hub.mode=' + mode + '&hub.verify_token=' + token;

    request.get(url, (err, res, body) => {
        if (err) {
            return callback(err);
        }
        return callback(null, body);
    });
}

module.exports = {
    transmit,
    retrive
};
