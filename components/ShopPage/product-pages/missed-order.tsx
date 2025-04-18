import { Button } from "@/components/ui/button";
import { Clock2, Edit2, Trash2 } from "lucide-react";

export function MissedOrder() {
    return (
        <div className="flex justify-between">
            <div className="relative w-full">
                <span className="flex gap-2 items-center"><Clock2 color="orange" /> <span className="font-medium text-md text-slate-600">Yesterday</span></span>
                <h4 className="font-serif text-2xl mt-3 font-semibold">Total Values</h4>
                <p className="flex gap-2 items-center "><span className="font-semibold text-xl pl-3">Rs.  4500.00</span> <span className="line-through text-sm ">6500.00</span></p>
                <Button variant="destructive" className="absolute -right-10 mt-1">Place Order</Button>
            </div>
            <div className="flex gap-2 text-xs">
                <Edit2 size={20} />
                <Trash2 size={20} color="red" />
            </div>
        </div>
    )
}