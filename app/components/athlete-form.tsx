"use client";

import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface FormInputType {
  name: string;
  age: number;
  sport: string;
  nationality: string;
  duration: number;
  "start-date": Date;
  "end-date": Date;
  "base-salary": number;
  "signing-bonus": number | undefined;
}

export const AthleteForm = () => {
  const { register, handleSubmit } = useForm<FormInputType>();

  const onSubmit: SubmitHandler<FormInputType> = (data: FormInputType) =>
    console.log(data);

  const inputContainerStyles = "grid grid-cols-[200px_1fr] items-center gap-4";

  return (
    <div className="border-red-500 flex flex-row ">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold border-b pb-2">
            Athlete Information
          </h2>

          <div className="inputContainerStyles">
            <label className="font-medium">Athlete name</label>
            <input
              {...register("name", { required: true })}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div className="inputContainerStyles">
            <label className="font-medium">Age</label>
            <input
              type="number"
              {...register("age", { required: true })}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div className="inputContainerStyles">
            <label className="font-medium">Sport</label>
            <input
              {...register("sport", { required: true })}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div className="inputContainerStyles">
            <label className="font-medium">Nationality</label>
            <input
              {...register("nationality", { required: true })}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div className="inputContainerStyles">
            <label className="font-medium">Contract Duration</label>
            <input
              {...register("duration", { required: true })}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div className="inputContainerStyles">
            <label className="font-medium">Start Date</label>
            <input
              type="date"
              {...register("start-date", { required: true })}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div className="inputContainerStyles">
            <label className="font-medium">End Date</label>
            <input
              type="date"
              {...register("end-date", { required: true })}
              className="w-full p-2 border rounded-md"
            />
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold border-b pb-2">Financials</h2>

          <div className="inputContainerStyles">
            <label className="font-medium">Base salary</label>
            <input
              type="number"
              {...register("base-salary", { required: true })}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div className={inputContainerStyles}>
            <label className="font-medium">Signing bonus</label>
            <input
              type="number"
              {...register("signing-bonus", { required: false })}
              className="w-full p-2 border rounded-md"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
