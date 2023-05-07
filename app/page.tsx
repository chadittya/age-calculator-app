"use client";

import iconArrow from "@/public/images/icon-arrow.svg";
import Image from "next/image";
import React, { useState } from "react";

export default function Home() {
  const [day, setDay] = useState<number | null>(null);
  const [month, setMonth] = useState<number | null>(null);
  const [year, setYear] = useState<number | null>(null);
  const [age, setAge] = useState({
    years: "--",
    months: "--",
    days: "--",
  });
  const [showAge, setShowAge] = useState(false);
  const [isValid, setIsValid] = useState<boolean>(true);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let formIsValid = true;
    let isValidMonth = true;
    // check if all field are filled
    if (!day || !month || !year) {
      setIsValid(false);
      setDay((prev) => prev ?? null);
      setMonth((prev) => prev ?? null);
      setYear((prev) => prev ?? null);
      formIsValid = false;
    }

    // check if day is valid
    if (day && (day < 1 || day > 31)) {
      setIsValid(false);
      setDay(null);
      formIsValid = false;
    }

    // check if month is valid and also in the past
    if (month && (month < 1 || month > 12)) {
      setIsValid(false);
      setMonth(null);
      formIsValid = false;
    } else if (
      year === new Date().getFullYear() &&
      month &&
      month > new Date().getMonth() + 1
    ) {
      setIsValid(false);
      setMonth(null);
      isValidMonth = false;
      formIsValid = false;
    }

    // check if year is in the past
    if (year && year > new Date().getFullYear()) {
      setIsValid(false);
      setYear(null);
      formIsValid = false;
    }

    // check if date is valid
    if (day && month && year && isValidMonth) {
      const isValidDate = !isNaN(new Date(`${year}-${month}-${day}`).getTime());
      if (!isValidDate) {
        setIsValid(false);
        setDay(null);
        formIsValid = false;
      }
    }

    if (formIsValid) {
      setIsValid(true);
      let countdown = 20;
      const timer = setInterval(() => {
        if (countdown <= 0) {
          clearInterval(timer);
          // calculate age
          const birthDate = new Date(`${year}-${month}-${day}`);
          const today = new Date();
          const years = today.getFullYear() - birthDate.getFullYear();
          const months = today.getMonth() - birthDate.getMonth();
          const days = today.getDate() - birthDate.getDate();
          setAge({
            years: years.toString(),
            months: months.toString(),
            days: days.toString(),
          });
          setShowAge(true);
        } else {
          setAge({
            years: Math.floor(Math.random() * 100).toString(),
            months: Math.floor(Math.random() * 12).toString(),
            days: Math.floor(Math.random() * 31).toString(),
          });
          countdown--;
        }
      }, 100);

      setTimeout(() => {
        setShowAge(false);
      }, 1000);
    }
  };
  return (
    <main className="flex justify-center items-center min-h-screen">
      <div className="bg-white rounded-t-xl rounded-bl-xl rounded-br-[5rem] max-w-md relative">
        <div className="mx-10 my-10">
          <form
            onSubmit={handleSubmit}
            className="flex flex-row text-slate-500 gap-3 mb-7"
          >
            <div className="flex flex-col gap-1 relative">
              <label className="text-[0.4rem] tracking-[0.5em] uppercase">
                Day
              </label>
              <input
                className="border border-slate-400 rounded-[8px] max-w-[150px] py-1 px-2 outline-none focus:border-chPurple text-black"
                type="number"
                min={0}
                max={31}
                placeholder="DD"
                value={day ?? ""}
                onChange={(e) => setDay(parseInt(e.target.value))}
              />
              {!isValid && (
                <span className="text-chLightRed italic text-[0.42rem] absolute -bottom-3">
                  This field is required
                </span>
              )}
              {day && (day < 1 || day > 31) && (
                <span className="text-chLightRed italic text-[0.42rem] absolute -bottom-3">
                  Must be valid day
                </span>
              )}
            </div>
            <div className="flex flex-col gap-1 relative">
              <label className="text-[0.4rem] tracking-[0.5em] uppercase">
                Month
              </label>
              <input
                className="border border-slate-400 rounded-[8px] max-w-[150px] py-1 px-2 outline-none focus:border-chPurple text-black"
                type="number"
                min={0}
                max={12}
                placeholder="MM"
                value={month ?? ""}
                onChange={(e) => setMonth(parseInt(e.target.value))}
              />
              {!isValid && (
                <span className="text-chLightRed italic text-[0.42rem] absolute -bottom-3">
                  This field is required
                </span>
              )}
              {month && (month < 1 || month > 12) && (
                <span className="text-chLightRed italic text-[0.42rem] absolute -bottom-3">
                  Must be valid month
                </span>
              )}
              {year === new Date().getFullYear() &&
                month &&
                month > new Date().getMonth() + 1 && (
                  <span className="text-chLightRed italic text-[0.42rem] absolute -bottom-6">
                    Must be a valid Month in the past
                  </span>
                )}
            </div>
            <div className="flex flex-col gap-1 mr-12 relative">
              <label className="text-[0.4rem] tracking-[0.5em] uppercase">
                Year
              </label>
              <input
                className="border border-slate-400 rounded-[8px] max-w-[150px] py-1 px-2 outline-none focus:border-chPurple text-black"
                type="number"
                min={1900}
                max={new Date().getFullYear()}
                placeholder="YYYY"
                value={year ?? ""}
                onChange={(e) => setYear(parseInt(e.target.value))}
              />
              {!isValid && (
                <span className="text-chLightRed italic text-[0.42rem] absolute -bottom-3">
                  This field is required
                </span>
              )}
              {year && year > new Date().getFullYear() && (
                <span className="text-chLightRed italic text-[0.42rem] absolute -bottom-6">
                  Must be a valid year in the past
                </span>
              )}
            </div>
            <div className="absolute right-6 top-[5.9rem]">
              <button type="submit">
                <Image
                  src={iconArrow}
                  alt=""
                  className="bg-chPurple rounded-full w-11 px-2 py-2 hover:bg-black active:bg-chLightGrey active:text-black transition-all"
                />
              </button>
            </div>
          </form>
          <hr className="mb-6" />
          <div className="flex flex-col font-extrabold italic text-5xl">
            <label>
              <span
                className={`text-chPurple ${showAge ? "animate-bounce" : ""}`}
              >
                {age.years}
              </span>{" "}
              years
            </label>
            <label>
              <span
                className={`text-chPurple ${showAge ? "animate-bounce" : ""}`}
              >
                {age.months}
              </span>{" "}
              months
            </label>
            <label>
              <span
                className={`text-chPurple ${showAge ? "animate-bounce" : ""}`}
              >
                {age.days}
              </span>{" "}
              days
            </label>
          </div>
        </div>
      </div>
    </main>
  );
}
