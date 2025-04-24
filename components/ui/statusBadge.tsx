import clsx from "clsx";

export function StatusBadge({ status }: { status: string }) {
  const color = clsx(
    "capitalize text-xs font-semibold px-2.5 py-0.5 rounded",
    {
      "bg-yellow-100 text-yellow-800": status === "pending",
      "bg-blue-100 text-blue-800": status === "shipped",
      "bg-green-100 text-green-800": status === "delivered",
      "bg-red-100 text-red-800": status === "cancelled",
      "bg-purple-100 text-purple-800": status === "processing",
      "bg-gray-100 text-gray-800": !["pending", "shipped", "delivered", "cancelled", "processing"].includes(status),
    }
  );

  return <span className={color}>{status}</span>;
}
