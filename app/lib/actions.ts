import { sendMessage, setGroup } from "./db";
import { auth } from "./auth";
import { revalidatePath } from "next/cache";

export async function createMessage (prevState: any, formData: FormData) {
  const data = formData.get("message");
  const group = formData.get("currentGroup");

  console.log(group)
  try {
    sendMessage(data, group);
    // revalidatePath('/');
    return {message: "message Sended"}
  } catch (err) {

    return {message: "could not send message"}
  }
}

export async function createGroup (prevState: any, formData: FormData) {
  const data = formData.get("newName");

  try {
    setGroup(data);
    // revalidatePath('/');
    return {message: "message Sended"}
  } catch (err) {

    return {message: "could not send message"}
  }
}