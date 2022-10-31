import { useState, useEffect } from "react";
import peopleService from "../../services/people.service";
import authService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";

export default function People() {
  const [people, setPeople] = useState([]);
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

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

    const data = {
      name,
      phone,
      email,
    };

    try {
      await peopleService.createPeople(data).then(
        () => {
          setVisible(false);
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

  // handle delete people
  const handleDeletePeople = async (id) => {
    console.log(id);
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

  return (
    <div>
      <h1>People</h1>
      <button onClick={() => setVisible(!visible)}>Add People</button>
      {visible && (
        <div>
          <h2>Add new</h2>
          <form>
            <input
              type="text"
              placeholder="Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="tel"
              placeholder="Phone number"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              type="text"
              placeholder="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleCreatePeople}>Create</button>
          </form>
        </div>
      )}

      <div>
        {people.map((person) => {
          return (
            <div key={person.id}>
              <h2>{person.name}</h2>
              <h4>{person.phone}</h4>
              <h4>{person.email}</h4>
              <button onClick={() => handleDeletePeople(person.id)}>Delete</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
