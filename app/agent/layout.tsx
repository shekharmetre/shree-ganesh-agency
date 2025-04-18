import React from "react";
// import AgentNavbar from "./_components/navbar";


export default function Layout({ children }:{children : React.ReactNode}) {
  return (
    <div>
      {/* <AgentNavbar /> */}
      <main>{children}</main>
    </div>
  );
}