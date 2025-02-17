import Image from "next/image";


export function Offers() {
    const offer = [
        { title: "offer1", image: "/hero/offer3.svg" },
        { title: "offer2", image: "/hero/offer5.png" },
        { title: "offer3", image: "/hero/offer6.png" },
        { title: "offer4", image: "/hero/offer4.png" }
    ]
    return (
        <div className="m-2 p-2 w-full flex gap-2 overflow-x-auto">
            {offer.map((item, index) => (
                <Image src={item.image} key={index} alt={item.title} width={500} height={500} className="w-full" />
            ))}

        </div>
    )
}