import { sendMessage } from "./db";
import { auth } from "./auth";
import { revalidatePath } from "next/cache";

export async function createMessage (prevState: any, formData: FormData) {
  const data = formData.get("message");
  console.log(data);

  try {
    sendMessage(data);
    // revalidatePath('/');
    return {message: "message Sended"}
  } catch (err) {

    return {message: "could not send message"}
  }
}
