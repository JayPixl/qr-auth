import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(req: Request) {
    cookies().delete("userId")

    revalidatePath("/")

    redirect("/")
}