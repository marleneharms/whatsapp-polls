const request = require('request');

const dummyPolls = [
    {
        "name": "Poll 1",
        "description": "This is the first poll",
        "phoneNumbers": [
            "1234567890",
            "0987654321"
        ],
        "questions": [
            {
                "question": "What is your favorite color?",
                "options": [
                    "Red",
                    "Blue",
                ]
            },
        ]
    },
    {
        "name": "Poll 2",
        "description": "This is the first poll",
        "phoneNumbers": [
            "1234567890",
            "0987654321"
        ],
        "questions": [
            {
                "question": "What is your favorite color?",
                "options": [
                    "Red",
                    "Blue",
                ]
            },

        ]
    },
];

exports.getAllPolls = (req, res, next) => {
    return res.status(200).json(dummyPolls);
};

exports.testWhats = (req, res, next) => {
    const options = {
        url: 'https://graph.facebook.com/v15.0/' + process.env.IdentificadorNumTel + '/messages',
        headers: {
            'Authorization': 'Bearer ' + process.env.Token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                "messaging_product": "whatsapp",
                "recipient_type": "individual",
                "to": "523315997504",
                "type": "interactive",
                "interactive": {
                    "type": "button",
                    "body": {
                        "text": dummyPolls[0].questions[0].question
                    },
                    "action": {
                        "buttons": [
                            {
                                "type": "reply",
                                "reply": {
                                    "id": "UNIQUE_BUTTON_ID_1",
                                    "title": dummyPolls[0].questions[0].options[0]
                                }
                            },
                            {
                                "type": "reply",
                                "reply": {
                                    "id": "UNIQUE_BUTTON_ID_2",
                                    "title": dummyPolls[0].questions[0].options[1]
                                }
                            }
                        ]
                    }

                }
            })
    };
    request.post(options, (err, res2, body) => {
        if (err) { return res.status(500).send("Pues no funciono la api") }
        res.status(200).json(body)
    });
};
