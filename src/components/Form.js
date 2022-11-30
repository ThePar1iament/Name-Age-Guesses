import React, { useState, useEffect } from 'react';

export default function Form() {
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [nameServiceData, setNameServiceData] = useState([]);
  const [count, setCount] = useState(0);

  const api = 'https://api.agify.io/?name=' + name;
  const handleBlur = (e) => {
    setName(e.target.value);
    console.log('name', name);
  };

  // https://randomuser.me/api/
  // https://api.agify.io/?name=
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleClick = (event) => {
    console.log(name);
    if (name != '') {
      fetch(api)
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            if (nameServiceData.length > 0) {
              setNameServiceData([
                ...nameServiceData,
                { name: data.name, age: data.age },
              ]);
            } else {
              setNameServiceData([{ name: data.name, age: data.age }]);
            }
          }
        });
      setCount(nameServiceData.length + 1);
    }
  };
  useEffect(() => {
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
        <h4>{message}</h4>
        <label htmlFor="name" className="input">
          Please enter a name here
        </label>
        <input
          name="name"
          className="mb-4"
          onChange={handleBlur}
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
