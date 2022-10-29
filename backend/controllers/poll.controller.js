

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
