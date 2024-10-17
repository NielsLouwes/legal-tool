"use client";

import React, { Dispatch, SetStateAction } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { generateContract } from "../utils/document-generator";
import { nationalities } from "../data/nationalities";
import { useRouter } from "next/navigation";

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
  country: string;
  postalCode: string;
  city: string;
  streetAddress: string;
  gender: string;
  "todays-date": Date;
  place: string;
  "passport-number": string;
}

export const AthleteForm = ({
  setFormActive,
  sport,
}: {
  setFormActive: Dispatch<SetStateAction<boolean>>;
  sport: string;
}) => {
  const { register, handleSubmit, reset } = useForm<FormInputType>();
  const router = useRouter();

  const onSubmit: SubmitHandler<FormInputType> = async (
    data: FormInputType
  ) => {
    try {
      await generateContract(data);
      reset();
      setFormActive(false);
      router.push("/");
    } catch (error) {
      console.error("Error generating contract:", error);
    }
  };

  const inputContainerStyles = "grid grid-cols-[200px_1fr] items-center gap-4";
  const inputStyles = "w-full p-2 border rounded-md";

  return (
    <div className="border-red-500 flex flex-row ">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-6">
          <div className="inputContainerStyles">
            <label className="font-medium">Todays date</label>
            <input
              {...register("todays-date", { required: true })}
              className={inputStyles}
              type="date"
            />
          </div>

          <div className="inputContainerStyles">
            <label className="font-medium">Place</label>
            <input
              {...register("place", { required: true })}
              className={inputStyles}
              type="text"
            />
          </div>

          <h2 className="text-2xl font-semibold border-b pb-2">
            Athlete Information
          </h2>

          <div className="inputContainerStyles">
            <label className="font-medium">Athlete name</label>
            <input
              {...register("name", { required: true })}
              className={inputStyles}
            />
          </div>

          <div className="inputContainerStyles">
            <label className="font-medium">Age</label>
            <input
              type="number"
              {...register("age", { required: true, maxLength: 2 })}
              className={inputStyles}
            />
          </div>

          <div className="inputContainerStyles">
            <label className="font-medium pr-8">Nationality</label>
            <select
              {...register("nationality", { required: true })}
              className={inputStyles}
            >
              {nationalities.map((nat, index) => (
                <option value={nat} key={index}>
                  {nat}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-row gap-4">
            <div className="inputContainerStyles">
              <label className="font-medium">Passport number</label>
              <input
                {...register("passport-number", {
                  required: true,
                  maxLength: 30,
                })}
                className={inputStyles}
              />
            </div>
          </div>

          <div className="inputContainerStyles">
            <label className="font-medium">Gender</label>
            <select
              {...register("gender", { required: true })}
              className={inputStyles}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <h2 className="text-2xl font-semibold border-b pb-2">Location</h2>

          <div className="flex flex-row gap-4">
            <div className="inputContainerStyles">
              <label className="font-medium">Country</label>
              <input
                {...register("country", { required: true })}
                className={inputStyles}
              />
            </div>
          </div>

          <div className="inputContainerStyles">
            <label className="font-medium">Postal Code</label>
            <input
              {...register("postalCode", { required: true })}
              className={inputStyles}
            />
          </div>

          <div className="inputContainerStyles">
            <label className="font-medium">City</label>
            <input
              {...register("city", { required: true })}
              className={inputStyles}
            />
          </div>

          <div className="inputContainerStyles">
            <label className="font-medium">Street Address</label>
            <input
              {...register("streetAddress", { required: true })}
              className={inputStyles}
            />
          </div>

          <h2 className="text-2xl font-semibold border-b pb-2">
            Contract Information
          </h2>

          <div className="inputContainerStyles">
            <label className="font-medium">Sport</label>
            <input
              defaultValue={sport}
              {...register("sport", { required: true })}
              className={inputStyles}
            />
          </div>

          <div className="inputContainerStyles">
            <label className="font-medium">
              Contract Duration (in months){" "}
            </label>
            <input
              {...register("duration", { required: true })}
              className={inputStyles}
            />
          </div>

          <div className="inputContainerStyles">
            <label className="font-medium">Start Date</label>
            <input
              type="date"
              {...register("start-date", { required: true })}
              className={inputStyles}
            />
          </div>

          <div className="inputContainerStyles">
            <label className="font-medium">End Date</label>
            <input
              type="date"
              {...register("end-date", { required: true })}
              className={inputStyles}
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
              className={inputStyles}
            />
          </div>

          <div className={inputContainerStyles}>
            <label className="font-medium">Signing bonus</label>
            <input
              type="number"
              {...register("signing-bonus", { required: false })}
              className={inputStyles}
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
