import { useState, useEffect } from "react";
import peopleService from "../../services/people.service";
import authService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import formatDistance from 'date-fns/formatDistance'

import './People.styles.css'
import { notifyError, notifySuccess, notifySuccessWithCallback, notifyWarning } from "../../utils/Toast";


export default function People() {
  const [people, setPeople] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [newPerson, setNewPerson] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [error, setError] = useState(undefined);

  const navigate = useNavigate();

  useEffect(() => {
    peopleService.getAllPeople().then(
      (response) => {
        setPeople(response.data.data);
      },
      (error) => {
        notifyWarning("You are not authorized to view this page");
        // Invalid token
        if (error.response && error.response.status === 401) {
          authService.logout();
          navigate("/login");
          window.location.reload();
        }
      }
    );
  }, []);

  const handleCreatePeople = async (e) => {
    e.preventDefault();

    const { name, phone, email } = newPerson;

    if (name === "" || phone === "" || email === "") {
      setError("Please fill in all fields");
      notifyWarning("Please fill in all fields");
      return;
    }

    try {
      await peopleService.createPeople({name, phone, email}).then(
        (response) => {
          setPeople([...people, response.data.data]);
          setNewPerson({
            name: "",
            phone: "",
            email: "",
          });
          setFormVisible(false);
          setError(undefined);
          notifySuccess(`${response.data.data.name.toUpperCase()} created successfully`);
        },
        (error) => {
          if (error.response.status === 500 || error.response.data.message !== undefined) {
            const { message } = error.response.data;
            setError(message);
            notifyError(message);
          }
        }
      );
    } catch (error) {
      notifyError("There was an error creating the people. Please try again later");
    }
  };

  const handleDeletePeople = async (id) => {
    try {
      await peopleService.deletePeople(id).then(
        (response) => {
          setPeople(people.filter((people) => people.id !== id));
          notifySuccess(`${response.data.data.name.toUpperCase()} deleted successfully`);
        },
        (error) => {
          notifyError(error.response.data.message);
        }
      );
    } catch (error) {
      notifyError("There was an error deleting the people. Please try again later");
    }
  };

  const convertDate = (date) => {
    return formatDistance(new Date(date), new Date());
  };

  return (
      <div className="people-container">
        <h1>People</h1>
        <button onClick={() => setFormVisible(!formVisible)} className="createBtn">
          {formVisible ? "Hide" : "Create People"}
        </button>
        {formVisible && (
          <form onSubmit={handleCreatePeople} className="create-person-form">
            <h2>Create</h2>
            <input
              type="text"
              placeholder="Name"
              value={newPerson.name}
              maxLength="17"
              required
              onChange={(e) => setNewPerson({ ...newPerson, name: e.target.value.trim() })}
            />
            {/* validate only numbers on phone */}
            <input
              type="text"
              placeholder="Phone Number"
              value={newPerson.phone}
              maxLength="12"
              minLength="12"
              pattern="[0-9]*"
              required
              onChange={(e) => setNewPerson({ ...newPerson, phone: e.target.value.trim() })}
            />
            <input
              type="text"
              placeholder="Email"
              value={newPerson.email}
              required
              onChange={(e) => setNewPerson({ ...newPerson, email: e.target.value.trim() })}
            />

            {
              error && (
                <div role="alert" className="errorMsg">
                  {error}
                </div>
              )
            }

            <button type="submit">Create</button>
          </form>
        )}

        <div className="people">
          {
            people.map((person) => (
              <div className="person" key={person.id}>
                <div className="person-preview">
                  <h6>person</h6>
                  <h2>{person.name}</h2>
                  <button className="delete" onClick={() => handleDeletePeople(person.id)}>Delete</button>
                </div>
                <div className="person-info">
                  <h6>{convertDate(person.date)}</h6>
                  <h2>{person.phone}</h2>
                  <div className="poll-info-bottom">
                    <div className="poll-info-bottom-left">
                      <h6>{person.email}</h6>
                    </div>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
  );
}
