import { toast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import Link from "next/link";

export const ToastMessage = (title: string, description: string,link?:string) => {
  console.log(title,description);
  toast({
    title,
    description,
    action: (
      <ToastAction altText="Show">
        <Link href={link ? link : ""} className="text-blue-500 underline">
          Cart
        </Link>
      </ToastAction>
    ),
  });
};
