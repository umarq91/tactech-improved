import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import emailjs from "@emailjs/browser";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

emailjs.init("e0tSfkm2jtR7BVg4x");

export const sendEmail = async (data: any) => {
  try {

    const response = await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERIVICE_ID!,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
      data
    );
    return response;
  } catch (error) {
    console.error("Email sending failed:", error);
    throw error;
  }
};
