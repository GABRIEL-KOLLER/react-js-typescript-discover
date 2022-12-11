import { useEffect, useState } from "react";
import "./style.css";

import { Card, CardProps } from "../../components/Card";

type APIResponse = {
  name: string;
  avatar_url: string;
};

type User = {
  name: string;
  avatar: string;
};

export function Home() {
  const [studentName, setStudentName] = useState("");
  const [students, setStudents] = useState<CardProps[]>([]);
  const [user, setUser] = useState<User>({} as User);

  function handleAddStudent() {
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString("pt-br", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    };

    setStudents((prevState) => [...prevState, newStudent]);
  }

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "https://api.github.com/users/GABRIEL-KOLLER"
      );
      const data = (await response.json()) as APIResponse;

      setUser({
        name: data.name,
        avatar: data.avatar_url,
      });

      fetchData();
    }
  });

  return (
    <div className="container">
      <header>
        <h1>Programming students</h1>
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="Photo" />
        </div>
      </header>
      <input
        type="text"
        placeholder="Writer your name..."
        onChange={(e) => setStudentName(e.target.value)}
      />
      <button type="button" onClick={handleAddStudent}>
        Add
      </button>

      {students.map((student) => (
        <Card key={student.time} name={student.name} time={student.time} />
      ))}
    </div>
  );
}
