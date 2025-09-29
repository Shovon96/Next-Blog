import { authOptions } from "@/helpers/authOptions";
import { getServerSession } from "next-auth";

const DashboardHomePage = async () => {

  const session = await getServerSession(authOptions)
  const user = session?.user
  return (
    <div className="mx-auto bg-white shadow-lg rounded-lg p-6 max-h-[300px]" >
      <div className="flex items-center space-x-4">
        <img
          src={user?.image || "https://via.placeholder.com/100"}
          alt="User Avatar"
          className="w-20 h-20 rounded-full border"
        />
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            {user?.name || "Unknown User"}
          </h2>
          <p className="text-gray-600">{user?.email || "No Email Provided"}</p>
        </div>
      </div>

      <div className="mt-6 border-t pt-4">
        <h3 className="text-lg font-medium text-gray-700 mb-2">
          Personal Information
        </h3>
        <ul className="space-y-2 text-gray-600">
          <li>
            <strong>Name:</strong> {user?.name || "N/A"}
          </li>
          <li>
            <strong>Email:</strong> {user?.email || "N/A"}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardHomePage;
