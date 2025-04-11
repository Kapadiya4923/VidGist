import { useState } from "react";
import Chatbot from "./Chatbot";
import Summary from "./Summary";

function Dashboard() {
  const [id, setId] = useState();
  return (
    <div className="grid md:grid-cols-2 grid-cols-1  w-full min-h-screen bg-[#fafbfb]">
        <Summary id={id} setId={setId}/>
      <Chatbot id={id} setId={setId}/>
    </div>
  );
}

export default Dashboard;
