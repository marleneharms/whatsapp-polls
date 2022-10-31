import { useState, useEffect } from "react";
import peopleService from "../../services/people.service";
import authService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import formatDistance from 'date-fns/formatDistance'

import './People.styles.css'


export default function People() {
  const [people, setPeople] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(undefined);

  const navigate = useNavigate();

  useEffect(() => {
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

  // handle create people using form

  const handleCreatePeople = async (e) => {
    e.preventDefault();

    if (name === "" || phone === "" || email === "") {
      setError("Please fill in all fields");
      return;
    }

    const data = {
      name,
      phone,
      email,
    };

    try {
      await peopleService.createPeople(data).then(
        () => {
          setFormVisible(false);
          window.location.reload();
        },
        (error) => {
          if (error.response.status === 500 || error.response.data.message !== undefined) {
            console.log(error.response.data.message);
            setError(error.response.data.message);
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  // handle delete people
  const handleDeletePeople = async (id) => {
    try {
      await peopleService.deletePeople(id).then(
        () => {
          window.location.reload();
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetPeopleById = async (id) => {
    try {
      await peopleService.getPeopleById(id).then(
        (response) => {
          console.log(response.data.data);
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (error) {
      console.log(error);
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
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

                <button className="btn" onClick={() => handleGetPeopleById(person.id)}>See More</button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}
