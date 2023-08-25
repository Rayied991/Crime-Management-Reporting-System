import dynamic from 'next/dynamic'
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';


const Layout = dynamic(() => import('../Layout/layout'), {
  ssr: false,
});
const Title = dynamic(() => import('../Layout/title'), {
  ssr: false,
});

export default function PASS() {
  const router=useRouter();
  const [adminId, setAdminId] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        process.env.NEXT_PUBLIC_API_ENDPOINT + '/admin/changeAdminPassword/'+adminId,
        {
          adminId:adminId,
          newPassword:newPassword
        },
        {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            withCredentials: true
        }
      );

      if (response.data) {
        router.push("/Admin/Signin");
      } else {
        setMessage('Failed to change password');
      }
    } catch (error) {
      console.error('Error changing password:', error);
      setMessage('An error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded shadow-md">
      <Layout page="PASS" />
      <Title page="Change Password" />
      <h1 className="text-2xl font-bold mb-4">Change Password Page</h1>
      <div className="mb-4">
        <label htmlFor="adminId" className="block text-sm font-medium text-gray-700">
          AdminId:
        </label>
        <input
          type="number"
          id="adminId"
          value={adminId}
          onChange={(e) => setAdminId(e.target.value)}
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
          New Password:
        </label>
        <input
          type="password"
          id="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          required
        />
      </div>
      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </div>
      {message && <p className="mt-4 text-center text-red-600">{message}</p>}
      
    <p>  Go Back <a href="/Admin/Signin" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign In</a>

</p>
    </form>
  );
}