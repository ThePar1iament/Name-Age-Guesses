import React, { useState, useEffect } from 'react';

// The Form app takes input from the user and sumbmits it to the agify api, returning a json object container an age and name

export default function Form() {
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [nameServiceData, setNameServiceData] = useState([]);
  const [count, setCount] = useState(0);
  const [error, setError] = useState('');
  // regex allows chars and spaces only
  const regEx = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;

  const api = 'https://api.agify.io/?name=' + name;

  // Sets input state name to be checked by regex
  const handleChange = (e) => {
    setName(e.target.value);
  };

  // Form Handler
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  // Where the magic happens, we check to see if the name is valid, afterwhich we do a fetch call, and setting the response
  // into an array to be looped through
  const handleClick = () => {
    if (name != '' && regEx.test(name)) {
      fetch(api)
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            // clears error
            setError('');
            // conditional checks if array has length, sets up first object on else block.
            if (nameServiceData.length > 0) {
              setNameServiceData([
                ...nameServiceData,
                { name: data.name, age: data.age },
              ]);
            } else {
              setNameServiceData([{ name: data.name, age: data.age }]);
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
      // Increases count that is rendered
      setCount(nameServiceData.length + 1);
    } else {
      setError('Invalid Input');
    }
  };
  useEffect(() => {
    // checks if count is even, and displays the message if false
    if (count % 2 == 0) {
      setMessage('');
    } else {
      setMessage('What an odd number of guesses');
    }
  });

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h4 className="mb-4"> Total Guesses: {count}</h4>
        <h4 className="text-danger">{error}</h4>
        <h4>{message}</h4>
        <label htmlFor="name" className="input">
          Please enter a name here
        </label>
        <input
          name="name"
          className="mb-4"
          onChange={handleChange}
          value={name}
        />
        <button type="button" value="Submit" className="" onClick={handleClick}>
          Submit{' '}
        </button>
      </form>
      <h4 className="">All Guesses</h4>
      <ul>
        {nameServiceData.length > 0 &&
          nameServiceData.map((person) => (
            <li key={person.id}>
              {person.name} - {person.age}
            </li>
          ))}
      </ul>
    </div>
  );
}
