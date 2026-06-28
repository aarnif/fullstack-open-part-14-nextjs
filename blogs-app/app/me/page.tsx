import { notFound } from "next/navigation";
import { getCurrentUser } from "@/app/services/session";
import { generateToken } from "@/app/actions/users";
import Button from "@/app/components/Button";

const MyPage = async () => {
  const user = await getCurrentUser();

  if (!user) {
    notFound();
  }

  return (
    <div>
      <div className="border-b border-slate-300 dark:border-slate-700 mb-4 pb-4">
        <h2 className="text-2xl font-bold mb-4">My Profile</h2>
        <p className="mb-2">
          <span className="font-bold">Name:</span> {user.name}
        </p>
        <p className="mb-4">
          <span className="font-bold">Username:</span> {user.username}
        </p>
      </div>
      <h2 className="text-2xl font-bold pt-2 mb-4">API Token</h2>
      <div className="max-w-120 bg-slate-100 dark:bg-slate-900 p-4 mb-4 rounded">
        <p className="font-medium mb-1">Current token:</p>
        <p className="rounded p-2 break-all bg-slate-200 dark:bg-slate-800">
          {user.token ? user.token : <em>No token generated yet</em>}
        </p>
      </div>
      <Button onClick={generateToken}>Generate New Token</Button>
    </div>
  );
};

export default MyPage;
