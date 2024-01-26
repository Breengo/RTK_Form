import React from "react";
import JobBox from "./components/JobBox";

import getUID from "./helpers/getUID";
import checkEmail from "./helpers/checkEmail";
import getDiffedYear from "./helpers/getDiffedYear";

export interface JobData {
  title: string;
  fDate: string;
  lDate: string;
  id: string;
}

function App() {
  const [jobs, setJobs] = React.useState<JobData[]>([]);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [sex, setSex] = React.useState("М");
  const [bDate, setBDate] = React.useState("");
  const [errors, setErrors] = React.useState({ name: "", email: "" });

  function addJobs() {
    setJobs((prev) => [
      ...prev,
      { title: "", fDate: "", lDate: "", id: getUID() },
    ]);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const formData = { name, email, sex, bDate, jobs };
    console.log(formData);
  }

  function validateName(e: React.FocusEvent<HTMLInputElement>) {
    if (e.target.value.split(" ").length < 3) {
      setErrors((prev) => ({ ...prev, name: "Неправильное фио" }));
    } else setErrors((prev) => ({ ...prev, name: "" }));
  }

  function validateEmail(e: React.FocusEvent<HTMLInputElement>) {
    if (!checkEmail(e.target.value)) {
      setErrors((prev) => ({ ...prev, email: "Неправильный email" }));
    } else setErrors((prev) => ({ ...prev, email: "" }));
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-neutral-800">
      <form
        onSubmit={(e) => onSubmit(e)}
        className="flex flex-col gap-4 items-center justify-center"
      >
        <label className="text-white">ФИО</label>
        <input
          className={`py-2 px-4 outline-none border ${
            errors.name ? "border-red-600" : ""
          }`}
          onBlur={validateName}
          type="text"
          placeholder="FIO"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <p className="text-red-500">{errors.name}</p>

        <label className="text-white">Пол</label>
        <select
          value={sex}
          onChange={(e) => setSex(e.target.value)}
          className="py-2 px-4 outline-none"
        >
          <option value="М">М</option>
          <option value="Ж">Ж</option>
        </select>

        <label className="text-white">Дата рождения</label>
        <input
          min={"1900-01-01"}
          max={getDiffedYear(-18)}
          type="date"
          className="py-2 px-4 outline-none"
          value={bDate}
          onChange={(e) => setBDate(e.target.value)}
        />

        <label className="text-white">Email</label>
        <input
          type="text"
          placeholder="email"
          className={`py-2 px-4 outline-none border ${
            errors.email ? "border-red-600" : ""
          }`}
          value={email}
          onBlur={validateEmail}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p className="text-red-500">{errors.email}</p>

        <label className="text-white">Места работы</label>
        {jobs.map((data) => (
          <JobBox
            title={data.title}
            bDate={bDate}
            id={data.id}
            setJobs={setJobs}
            key={data.id}
          />
        ))}
        <button
          type="button"
          onClick={addJobs}
          className="text-white border py-2 w-64"
        >
          Добавить место работы
        </button>

        <input
          type="reset"
          onClick={() => setJobs([])}
          value={"Очистить"}
          className="text-white border py-2 w-64 cursor-pointer"
        />

        <input
          type="submit"
          value={"Отправить"}
          className="text-white border py-2 w-64 cursor-pointer"
        />
      </form>
    </div>
  );
}

export default App;
