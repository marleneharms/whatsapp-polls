import { useState, useEffect } from "react";
import groupService from "../../services/group.service";
import peopleService from "../../services/people.service";
import authService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";

import "./Groups.styles.css";
import { notifyError, notifySuccess, notifySuccessWithCallback, notifyWarning } from "../../utils/Toast";

export default function Groups() {
    const [groups, setGroups] = useState([]);
    const [people, setPeople] = useState([]);
    const [error, setError] = useState(undefined);
    const [formVisible, setFormVisible] = useState(false);
    const [submitCsvVisible, setSubmitCsvVisible] = useState(false);
    const [csvFile, setCsvFile] = useState(undefined);
    const [newGroup, setNewGroup] = useState({
        name: "",
        people: [],
    });

    const navigate = useNavigate();

    useEffect(() => {
        groupService.getAllGroups().then(
            (response) => {
                setGroups(response.data.data);
            },
            (error) => {
                notifyError("You are not authorized to view this page");
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
                notifyError("You are not authorized to view this page");
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
            notifyWarning("Please fill in all fields");
            setError("Please fill all the fields");
            return;
        }

        groupService.createGroup(newGroup).then(
            (response) => {
                setGroups([...groups, response.data.data]);
                setNewGroup({
                    name: "",
                    people: [],
                });
                setFormVisible(false);
                setError(undefined);
                notifySuccessWithCallback(`${newGroup.name.toUpperCase()} created successfully`, () => {
                    window.location.reload();
                });
            },
            (error) => {
                const { message } = error.response.data;
                setError(message);
                notifyError(message);
            }
        );
    }

    function handleDelete(id) {
        groupService.deleteGroup(id).then(
            (response) => {
                notifySuccess(`${response.data.data.name.toUpperCase()} deleted successfully`);
                setGroups(groups.filter((group) => group.id !== id));
            },
            (error) => {
                notifyError("There was an error deleting the group");
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

    function handleCreateGroupWithCSV(e){
        e.preventDefault();
        if(!csvFile){
            notifyWarning("Please select a file");
            return;
        }
        if(newGroup.name === ""){
            notifyWarning("Please enter a group name");
            return;
        }

        const file = csvFile;
        const reader = new FileReader();

        reader.onload = async (e) => {
            const text = e.target.result;
            const csvArray = proccessCSVFile(text);
            console.log(csvArray);
            createPeopleAndGroupFromCSV(csvArray);
            
        }
        reader.readAsText(file);
    }

    function proccessCSVFile(str, delim = ',') {
        const headers = str.slice(0, str.indexOf("\n")).split(delim);
        const rows = str.slice(str.indexOf("\n") + 1).split("\n");

        const newArray = rows.map((row) => {
            const values = row.split(delim);
            const eachObject = headers.reduce((obj, header, i) => {
                obj[header] = values[i];
                return obj;
            }, {});
            return eachObject;
        });
        return newArray;
    }

    function createPeopleAndGroupFromCSV(csvArray) {
        const peopleCreated = csvArray.map((person) => {
            return peopleService.createPeople(person);
        });

        Promise.all(peopleCreated).then((response) => {
            const peopleIds = response.map((person) => person.data.data.id);
            const group = {
                name: newGroup.name,
                people: peopleIds,
            };
            groupService.createGroup(group).then(
                (response) => {
                    setGroups([...groups, response.data.data]);
                    setNewGroup({
                        name: "",
                        people: [],
                    });
                    setFormVisible(false);
                    setError(undefined);
                    notifySuccessWithCallback(`${newGroup.name.toUpperCase()} created successfully`, () => {
                        window.location.reload();
                    });
                },
                (error) => {
                    const { message } = error.response.data;
                    setError(message);
                    notifyError(message);
                }
            );
        }).catch((error) => {
            notifyError(`${error.response.data.message}`);
        });
    }

    return (
        <div className="groups-container">
            <h1>Groups</h1>
            <button
                onClick={() => {
                    if(people.length === 0){
                        notifyWarning("Please create a person or upload a CSV file before creating a group");
                        return;
                    }
                    setFormVisible(!formVisible);
                    setSubmitCsvVisible(false);
                }}
                className="createBtn"
            >
                {formVisible ? "Cancel" : "Create Group"}
            </button>
            <button
                onClick={() => {
                    setSubmitCsvVisible(!submitCsvVisible);
                    setFormVisible(false);
                }}
                className="csvBtn"
            >
                {submitCsvVisible ? "Cancel" : "Submit CSV"}
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

            {submitCsvVisible && (
                <form
                    onSubmit={handleCreateGroupWithCSV}
                    className="create-group-form"
                >
                    <h2>Submit CSV</h2>
                    <input
                        type="text"
                        placeholder="Group Name"
                        required
                        value={newGroup.name}
                        onChange={(e) =>
                            setNewGroup({ ...newGroup, name: e.target.value })
                        }
                    />
                    <input
                        type="file"
                        placeholder="CSV File"
                        accept=".csv"
                        id="csvFile"
                        onChange={(e) => setCsvFile(e.target.files[0])}
                    />
                    {/* Set notification on error */}
                    {error && (
                        <div role="alert" className="errorMsg">
                            {error}
                        </div>
                    )}
                    <button type="submit" onClick={handleCreateGroupWithCSV}>
                        Submit
                    </button>
                </form>
            )}

            <div className="groups">
                {groups.map((group) => (
                    <div className="group" key={group.id}>
                        <div className="group-preview">
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
                            <ul>
                                {group.people.map((person, index) => (
                                    <li key={`${person.id}${index}`}>
                                        {person.name}
                                    </li>
                                ))}
                            </ul>
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
