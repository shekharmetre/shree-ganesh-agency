import Image from "next/image";

const pharmaDistributorWorkers = [
    {
      name: "Ravi Kumar",
      role: "Senior Sales Executive",
      experience: "8 Years in Pharmaceutical Distribution",
      contact: "+91 9876543210",
      location: "Bidar, Karnataka",
      image : "/hero/boy-user.png"
    },
    {
      name: "Ayesha Patel",
      role: "Inventory Manager",
      experience: "5 Years in Pharmaceutical Stock Management",
      contact: "+91 9123456789",
      location: "Andur, Bidar",
        image : "/hero/girl-user.png"
    },
    {
      name: "Sameer Khan",
      role: "Distribution Officer",
      experience: "6 Years in Logistics and Distribution",
      contact: "+91 9654321987",
      location: "Chondi, Bidar",
        image : "/hero/boy-user.png"
    },
    {
      name: "Priya Mehta",
      role: "Procurement Specialist",
      experience: "4 Years in Pharmaceutical Procurement",
      contact: "+91 8901234567",
      location: "Pune, Maharashtra",
        image : "/hero/girl-user.png"
    },
    {
      name: "Anil Singh",
      role: "Warehouse Supervisor",
      experience: "7 Years in Warehouse Operations",
      contact: "+91 9956781234",
      location: "Hyderabad, Telangana",
        image : "/hero/boy-user.png"
    }
  ];
  

export function Worker(){
    return (
        <div className="p-5">
                <h1 className="md:text-7xl text-2xl text-center my-5 text-[#7961DC] md:max-w-7xl m-auto font-extrabold">Trusted Professionals for Your Pharma Orders</h1>
                <div className="flex justify-between overflow-x-auto gap-5">
                {pharmaDistributorWorkers.map((item,index)=>(
                    <Image src={item.image} alt={item.name} width={200} height={200} className="w-full hover:scale-105 hover:shadow-sm hover:shadow-black cursor-pointer duration-150 ease-linear" />
                ))}
                 </div>
        </div>
    )
}