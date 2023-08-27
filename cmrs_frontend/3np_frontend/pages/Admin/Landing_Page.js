import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
const Layout = dynamic(() => import('../Layout/layout'), {
  ssr: false,
});
const Title = dynamic(() => import('../Layout/title'), {
  ssr: false,
});

export default function Landing_Page() {
  

return (
  <>
    <Title page="Admin Dashboard"/>
    <Layout/>

   
   

    <nav class="bg-white border-gray-200 dark:bg-gray-900">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
  <div class="flex items-center md:order-2">
  <button type="button" class="flex mr-3 text-sm bg-white-800 text-white rounded-full md:mr-0 focus:ring-4 focus:ring-white-300 dark:focus:ring-white-600" id="login-menu-button" aria-expanded="false" data-dropdown-toggle="login-dropdown" data-dropdown-placement="bottom">
 
 Login
</button>
      
      <div class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="login-dropdown">
       
        <ul class="py-2" aria-labelledby="login-menu-button">
          <li>
            <a href="/Admin/Signin" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Admin</a>
          </li>
          <li>
            <a href="/Admin/Victiminputform" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Manager</a>
          </li>
          <li>
            <a href="/Admin/Policeinputform" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Police </a>
          </li>
          <li>
            <a href="/Admin/Policeinputform" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Victim </a>
          </li>
        
         
        </ul>
      </div>&nbsp;&nbsp;&nbsp;
      <button type="button" class="flex mr-3 text-sm bg-white-800 text-white rounded-full md:mr-0 focus:ring-4 focus:ring-white-300 dark:focus:ring-white-600" id="reg-menu-button" aria-expanded="false" data-dropdown-toggle="reg-dropdown" data-dropdown-placement="bottom">
 
 Registration
</button>
      
      <div class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="reg-dropdown">
       
        <ul class="py-2" aria-labelledby="user-menu-button">
          <li>
            <a href="/Admin/Registration" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Admin</a>
          </li>
          <li>
            <a href="/Admin/Victiminputform" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Manager</a>
          </li>
          <li>
            <a href="/Admin/Policeinputform" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Police </a>
          </li>
          <li>
            <a href="/Admin/Policeinputform" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Victim </a>
          </li>
        
         
        </ul>
      </div>
      </div>
      </div>
      
  <Image src="/home_page.png" alt="Crime" width={1599} height={750} />
  
</nav>

 
</>
)}