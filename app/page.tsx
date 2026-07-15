import { ModeToggle } from "@/components/ui/mode-toggle";
import { UserButton } from "@clerk/nextjs";
import React from "react";

const Home = () => {
  return (
    <div>
      <ModeToggle />
      <h1>This is home page of the chat gpt</h1>
      <UserButton />
    </div>
  );
};

export default Home;
