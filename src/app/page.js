import { auth, signIn, signOut } from "@/auth"

export default async function Home() {
  const session = await auth()

  return (
    <div className="p-10 text-center">
      <h1 className="text-2xl font-bold mb-5">Invoice Generator MVP</h1>

      {session ? (
        <div>
          <p className="text-green-600 font-bold mb-4">
            Logged in as: {session.user.email}
          </p>
          <form action={async () => {
            "use server"
            await signOut()
          }}>
            <button className="bg-red-500 text-white px-4 py-2 rounded">Sign Out</button>
          </form>
        </div>
      ) : (
        <form action={async () => {
          "use server"
          await signIn("google")
        }}>
          <button className="bg-blue-600 text-white px-4 py-2 rounded">Login with Google</button>
        </form>
      )}
    </div>
  )
}