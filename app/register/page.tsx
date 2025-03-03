
import Image from "next/image";
import Link from "next/link";
import { signup } from "../login/action";
import Form from "next/form"
import { AgentVerification } from "@/components/helper/verification/agent-verirication";
const volume = [
  { placeholder: "Enter Full Name...", name: "fullName", type: "text", className: "col-span-2" },
  { placeholder: "Enter Shop/Pharmacy Name...", name: "shopName", type: "text", className: "" },
  { placeholder: "Enter Business Type...", name: "businessType", type: "text", className: "" },
  { placeholder: "Enter Email...", name: "email", type: "email", className: "" },
  { placeholder: "Username...", name: "agent", type: "text", className: "", defaultValue: "nbrk_user" },
  { placeholder: "Enter Phone Number...", name: "phone", type: "number", maxLength: 10, className: "col-span-2" },
  { placeholder: "Enter Password...", name: "password", type: "password", className: "" },
];

const RegisterPage: React.FC = () => {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700 p-6 sm:p-8">
        <Image src="/logo.svg" width={100} height={100} alt="logo" />
        <h1 className="text-xl font-bold text-gray-900 md:text-2xl da5rk:text-white text-center">
          Create an Account
        </h1>
        <Form action={signup} className="grid grid-cols-2 gap-4 mt-6">
          {volume.map((field) => (
            <>
              {field.name === "agent" ? <AgentVerification /> : <input
                key={field.name}
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                maxLength={field.maxLength}
                defaultValue={field.defaultValue} // Set default value for username
                className={`bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 shadow-md dark:focus:border-blue-500`}
                required
              />}

            </>
          ))}
          <button
            type="submit"
            className="col-span-2 p-2 rounded-lg text-white font-semibold text-2xl bg-blue-500 shadow-sm shadow-blue-400"
          >
            Register
          </button>
        </Form>
        <p className="text-sm font-light text-gray-500 dark:text-gray-400 mt-4 text-center">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
            Sign in
          </Link>
        </p>
      </div>
    </section>
  );
};

export default RegisterPage;
