import { useState, useEffect } from "react";
import pollService from "../../services/polls.service";
import authService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import formatDistance from 'date-fns/formatDistance'

import './Polls.styles.css'

export default function Polls() {
    const [polls, setPolls] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        pollService.getAllPolls().then(
            (response) => {
                console.log(response.data.data);
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
    }, []);

    function handleDelete(id) {
        pollService.deletePoll(id).then(
            (response) => {
                console.log(response);
                setPolls(polls.filter((poll) => poll._id !== id));
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
                            <button className="btn">See More</button>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};
