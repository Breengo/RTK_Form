import React from "react";
import { JobData } from "../App";
import getDiffedYear from "../helpers/getDiffedYear";

interface Props {
  id: string;
  setJobs: (value: JobData[] | ((prevVar: JobData[]) => JobData[])) => void;
  bDate: string;
  title: string;
}

const JobBox = ({ id, setJobs, bDate, title }: Props) => {
  const [sDate, setSDate] = React.useState("");
  const [lDate, setLDate] = React.useState("");
  const [error, setError] = React.useState("");

  function onDelete() {
    setJobs((prev) => {
      const data = prev.filter((job) => job.id !== id);
      return data;
    });
  }

  function onTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const title = e.target.value;
    setJobs((prev) => {
      const jobIndex = prev.findIndex((job) => job.id === id);
      prev[jobIndex].title = title;

      return [...prev];
    });
  }

  return (
    <div className="flex gap-5">
      <input
        className={`py-2 px-4 outline-none border  ${
          error ? "border-red-600" : ""
        }`}
        onChange={onTitleChange}
        onBlur={() => (title ? setError("") : setError("Введите название"))}
        type="text"
      />
      <input
        min={bDate ? getDiffedYear(18, bDate) : ""}
        max={getDiffedYear(0)}
        type="date"
        value={sDate}
        onChange={(e) => setSDate(e.target.value)}
      />
      <input
        min={sDate}
        max={getDiffedYear(0)}
        type="date"
        value={lDate}
        onChange={(e) => setLDate(e.target.value)}
      />
      <button onClick={onDelete} type="button">
        Удалить
      </button>
    </div>
  );
};
export default JobBox;
