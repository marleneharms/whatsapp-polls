import { useState, useEffect } from "react";
import pollService from "../../services/polls.service";
import peopleService from "../../services/people.service";
import groupService from "../../services/group.service"
import whatsappService from "../../services/whatsapp.service";
import authService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import formatDistance from 'date-fns/formatDistance'

import './Polls.styles.css'

export default function Polls() {
    const [polls, setPolls] = useState([]);
    const [people, setPeople] = useState([]);
    const [groups, setGroups] = useState([]);
    const [selectGroup, setSelectGroup] = useState(false);
    const [error, setError] = useState(undefined);
    const [formVisible, setFormVisible] = useState(false);
    const [newPoll, setNewPoll] = useState({
        title: "",
        question: "",
        options: [
            "",
            "",
            "",
        ],
        phoneNumbers: [

        ],
        group: undefined
    });


    const navigate = useNavigate();

    useEffect(() => {
        pollService.getAllPolls().then(
            (response) => {

                setPolls(response.data.data);
            },
            (error) => {
                console.log("Private page", error.response);
                console.log(error);
                // Invalid token
                if (error.response && error.response.status === 401) {
                    authService.logout();
                    navigate("/login");
                    window.location.reload();
                }
            }
        );

        peopleService.getAllPeople().then(
            (response) => {

                setPeople(response.data.data);
            },
            (error) => {
                console.log("Private page", error.response);
                console.log(error);
                // Invalid token
                if (error.response && error.response.status === 401) {
                    authService.logout();
                    navigate("/login");
                    window.location.reload();
                }
            }
        );

        groupService.getAllGroups().then(
            (response) => {
                setGroups(response.data.data);
            },
            (error) => {
                console.log("Private page", error.response);
                console.log(error);
                // Invalid token
                if (error.response && error.response.status === 401) {
                    authService.logout();
                    navigate("/login");
                    window.location.reload();
                }
            }
        );
    }, []);

    function handleCreatePoll(e) {
        e.preventDefault();

        // validate form
        if (!newPoll.title || !newPoll.question || !newPoll.options) {
            alert("Please fill all the fields");
            return;
        }

        // Check if he chose a group or individual numbers
        if (newPoll.group === undefined) {
            pollService.createPoll(newPoll).then(
                (response) => {
                    setPolls([...polls, response.data.data]);
                    setNewPoll({
                        title: "",
                        question: "",
                        options: [
                            "",
                            "",
                            "",
                        ],
                        phoneNumbers: [],
                        group: undefined
                    });
                    setFormVisible(false);

                    // Send whatsapp message
                    whatsappService.sendWhatsappPoll(response.data.data).then(
                        (response) => {
                            console.log(response);
                        },
                        (error) => {
                            console.log(error);
                        }
                    );
                },
                (error) => {
                    if (error.response.status === 500 || error.response.data.message !== undefined) {
                        console.log(error.response.data.message);
                        setError(error.response.data.message);
                    }

                }
            );
        } else {
            //get all the numbers from the group
            groupService.getGroupById(newPoll.group).then(
                (response) => {
                    let group = response.data.data;
                    let numbers = group.people.map(person => person.phone);
                    newPoll.phoneNumbers = numbers;
                    delete newPoll.group;
                    pollService.createPoll(newPoll).then(
                        (response) => {
                            setPolls([...polls, response.data.data]);
                            setNewPoll({
                                title: "",
                                question: "",
                                options: [
                                    "",
                                    "",
                                    "",
                                ],
                                phoneNumbers: [],
                                group: undefined
                            });
                            setFormVisible(false);

                            // Send whatsapp message
                            whatsappService.sendWhatsappPoll(response.data.data).then(
                                (response) => {
                                    console.log(response);
                                },
                                (error) => {
                                    console.log(error);
                                }
                            );
                        },
                        (error) => {
                            if (error.response.status === 500 || error.response.data.message !== undefined) {
                                console.log(error.response.data.message);
                                setError(error.response.data.message);
                            }

                        }
                    );
                }
            )
        }
    }

    function handleDelete(id) {
        pollService.deletePoll(id).then(
            (response) => {
                console.log(response);
                setPolls(polls.filter((poll) => poll.id !== id));
            },
            (error) => {
                console.log(error);
            }
        );
    }

    function handleGetPollById(id) {
        pollService.getPollById(id).then(
            (response) => {
                console.log(response.data.data);
            },
            (error) => {
                console.log(error);
            }
        );
    }

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    function convertDate(date) {
        return formatDistance(new Date(date), new Date(), { addSuffix: true })
    }

    return (
        <div className="polls-container">
            <h1>Polls</h1>
            <button onClick={() => setFormVisible(!formVisible)} className="createBtn">
                {formVisible ? "Hide" : "Create Poll"}
            </button>

            {formVisible && (
                <form onSubmit={handleCreatePoll} className="create-poll-form" >
                    <h2>Create</h2>
                    <input
                        type="text"
                        placeholder="Title"
                        required
                        value={newPoll.title}
                        onChange={(e) =>
                            setNewPoll({ ...newPoll, title: e.target.value })
                        }
                    />
                    <input
                        type="text"
                        required
                        placeholder="Question"
                        value={newPoll.question}
                        onChange={(e) =>
                            setNewPoll({ ...newPoll, question: e.target.value })
                        }
                    />
                    {/* three input fields for each option */}
                    <input type="text" placeholder="Option 1" value={newPoll.options[0]} onChange={(e) => {
                        const options = newPoll.options;
                        options[0] = e.target.value;
                        setNewPoll({ ...newPoll, options });
                    }} />
                    <input type="text" placeholder="Option 2" value={newPoll.options[1]} onChange={(e) => {
                        const options = newPoll.options;
                        options[1] = e.target.value;
                        setNewPoll({ ...newPoll, options });
                    }} />
                    <input type="text" placeholder="Option 3" value={newPoll.options[2]} onChange={(e) => {
                        const options = newPoll.options;
                        options[2] = e.target.value;
                        setNewPoll({ ...newPoll, options });
                    }} />

                    {/* If checkbox is marked then show group select if not show single number select */}

                    <div className="checkbox-container">
                        <input type="checkbox" id="group" name="group" value={selectGroup} onChange={(e) => {
                            setSelectGroup(e.target.checked);
                            setNewPoll({ ...newPoll, group: undefined, phoneNumbers: [] });
                        }} />
                        <label htmlFor="group">Group</label>
                    </div>

                    {selectGroup ? (
                        <select
                            value={newPoll.group}
                            onChange={(e) => {
                                const group = e.target.value;
                                setNewPoll({ ...newPoll, group });
                            }}
                        >
                            <option value="">Select a group</option>
                            {groups.map((group) => (
                                <option key={group.id} value={group.id}>
                                    {group.name} - {group.people.length} members
                                </option>
                            ))}
                        </select>
                    ) : (
                        <select
                            multiple
                            value={newPoll.phoneNumbers}
                            onChange={(e) => {
                                const phoneNumbers = Array.from(e.target.selectedOptions, (option) => option.value);
                                setNewPoll({ ...newPoll, phoneNumbers });
                            }}
                        >
                            {people.map((person) => (
                                <option key={person.id} value={person.phoneNumber}>
                                    {person.name} - {person.phone}
                                </option>
                            ))}
                        </select>
                    )}

                    {/* Set notification on error  */}
                    {error && (
                        <div role="alert" className="errorMsg" >
                            {error}
                        </div>
                    )}
                    <button type="submit">Create & Send</button>
                </form>
            )
            }

            <div className="polls">
                {
                    polls.map((poll) => (
                        <div className="poll" key={poll.id}>
                            <div className="poll-preview">
                                <h6>Poll</h6>
                                <h2>{poll.title}</h2>
                                <button className="delete" onClick={() => handleDelete(poll.id)}>Delete</button>
                            </div>
                            <div className="poll-info">
                                <div className="progress-container">
                                    <div className="progress"></div>
                                    <span className="progress-text">
                                        {getRandomInt(poll.phoneNumbers.length)} / {poll.phoneNumbers.length} answered`
                                    </span>
                                </div>
                                <h6>{convertDate(poll.date)}</h6>
                                <h2>{poll.question}</h2>
                                {
                                    poll.options.map((option, index) => (
                                        <div className="poll-info-bottom" key={`${poll.id}${index}`}>
                                            <div className="poll-info-bottom-left">
                                                <h6>{option}</h6>
                                            </div>
                                        </div>
                                    ))
                                }
                                <button className="btn" onClick={() => handleGetPollById(poll.id)}>See More</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div >
    );
}
