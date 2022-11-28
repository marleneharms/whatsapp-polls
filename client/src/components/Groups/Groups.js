import { useState, useEffect } from "react";
import groupService from "../../services/group.service";
import peopleService from "../../services/people.service";
import authService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";

import "./Groups.styles.css";

export default function Groups() {
    const [groups, setGroups] = useState([]);
    const [people, setPeople] = useState([]);
    const [error, setError] = useState(undefined);
    const [formVisible, setFormVisible] = useState(false);
    const [newGroup, setNewGroup] = useState({
        name: "",
        people: [],
    });

    const navigate = useNavigate();

    useEffect(() => {
        groupService.getAllGroups().then(
            (response) => {
                console.log(response.data.data);
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

        peopleService.getAllPeople().then(
            (response) => {
                console.log(response.data.data);
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
    }, []);

    function handleCreateGroup(e) {
        e.preventDefault();
        // validate form
        if (newGroup.name === "" || newGroup.people.length === 0) {
            setError("Please fill all the fields");
            return;
        }

        groupService.createGroup(newGroup).then(
            (response) => {
                console.log(response.data.data);
                setGroups([...groups, response.data.data]);
                setNewGroup({
                    name: "",
                    people: [],
                });
                setFormVisible(false);
            },
            (error) => {
                console.log(error);
                setError(error.response.data.message);
            }
        );
    }

    function handleDelete(id) {
        groupService.deleteGroup(id).then(
            (response) => {
                console.log(response);
                setGroups(groups.filter((group) => group.id !== id));
            },
            (error) => {
                console.log(error);
            }
        );
    }

    function handleGetGroupById(id) {
        groupService.getGroupById(id).then(
            (response) => {
                console.log(response);
                setGroups(groups.filter((group) => group.id !== id));
            },
            (error) => {
                console.log(error);
            }
        );
    }

    return (
        <div className="groups-container">
            <h1>Groups</h1>
            <button
                onClick={() => setFormVisible(!formVisible)}
                className="createBtn"
            >
                {formVisible ? "Cancel" : "Create Group"}
            </button>
            {formVisible && (
                <form
                    onSubmit={handleCreateGroup}
                    className="create-group-form"
                >
                    <h2>Create</h2>
                    <input
                        type="text"
                        placeholder="Group Name"
                        required
                        value={newGroup.name}
                        onChange={(e) =>
                            setNewGroup({ ...newGroup, name: e.target.value })
                        }
                    />
                    {/* Select wich people add to the group */}
                    <select
                        multiple
                        value={newGroup.people}
                        onChange={(e) => {
                            const selectedPeople = Array.from(
                                e.target.selectedOptions,
                                (option) => option.value
                            );
                            setNewGroup({
                                ...newGroup,
                                people: selectedPeople,
                            });
                        }}
                    >
                        {people.map((person) => (
                            <option key={person.id} value={person.id}>
                                {person.name}
                            </option>
                        ))}
                    </select>

                    {/* Set notification on error */}
                    {error && (
                        <div role="alert" className="errorMsg">
                            {error}
                        </div>
                    )}
                    <button type="submit">Create</button>
                </form>
            )}

            <div className="groups">
                {groups.map((group) => (
                    <div className="group" key={group.id}>
                        <div className="group-preview">
                            <h6>Group</h6>
                            <h2>{group.name}</h2>
                            <button
                                className="delete"
                                onClick={() => handleDelete(group.id)}
                            >
                                Delete
                            </button>
                        </div>
                        <div className="group-info">
                            <h6>{group.people.length} members</h6>
                            {/* <button
                                className="btn"
                                onClick={() => handleGetGroupById(group.id)}
                            >
                                {" "}
                                See more
                            </button> */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
