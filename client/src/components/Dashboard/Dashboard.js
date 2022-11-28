import { useState, useEffect } from "react";
import useQuery from "../../utils/useQuery";
import { notifyError } from "../../utils/Toast";
import { useNavigate } from "react-router-dom";
import pollService from "../../services/polls.service";
import formatDistance from "date-fns/formatDistance";
import { Line } from "react-chartjs-2";
import "./Dashboard.styles.css";

export default function Dashboard() {
    const [poll, setPoll] = useState(undefined);
    const [id, setId] = useState(undefined);
    const navigate = useNavigate();

    const query = useQuery();

    useEffect(() => {
        checkIdAndQuery();
    }, []);

    function checkIdAndQuery() {
        const id = query.get("id");
        if (id === undefined) {
            notifyError("No poll id provided");
            navigate("/polls");
            return;
        }
        setId(id);
        pollService.getPollById(id).then(
            (response) => {
                setPoll(response.data.data);
            },
            (error) => {
                notifyError(error);
            }
        );
    }

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    function convertDate(date) {
        return formatDistance(new Date(date), new Date(), {
            addSuffix: true,
        });
    }

    return (
        <div className="container">
            {poll && (
                <div className="dashboard-container">
                    <h1>Dashboard</h1>
                    <div className="poll" key={poll.id}>
                        <div className="poll-preview">
                            <h6>Poll</h6>
                            <h2>{poll.title}</h2>
                        </div>
                        <div className="poll-info">
                            <div className="progress-container">
                                <div className="progress"></div>
                                <span className="progress-text">
                                    {getRandomInt(poll.phoneNumbers.length)} /{" "}
                                    {poll.phoneNumbers.length} answered`
                                </span>
                            </div>
                            <h2>{poll.question}</h2>
                            {poll.options.map((option, index) => (
                                <div
                                    className="poll-info-bottom"
                                    key={`${poll.id}${index}`}
                                >
                                    <div className="poll-info-bottom-left">
                                        <h6>{option}</h6>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
