"use client";

import { useState } from "react";
import { AthleteForm } from "./components/athlete-form";
import Image from "next/image";

export default function Home() {
  const [formActive, setFormActive] = useState<boolean>(false);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-row gap-8 row-start-2 items-center sm:items-start">
        <Image
          src="/nike-shoes-one.jpg"
          width={500}
          height={500}
          alt="Picture of the author"
        />
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          {!formActive && (
            <div
              onClick={() => setFormActive(true)}
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            >
              Athlete
            </div>
          )}

          {formActive && <AthleteForm setFormActive={setFormActive} />}
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
