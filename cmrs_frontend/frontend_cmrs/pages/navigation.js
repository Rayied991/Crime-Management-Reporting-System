import Link from 'next/link'
import ABOUT from "./about";
import REG from "./Police_dashboard/Registration";
import LOGIN from "./Police_dashboard/psignin";
import LOGOUT from "./Police_dashboard/psignout";
import ADDCRIMESTATUS from './Police_dashboard/addcrimestatus';
import AddWantedList from './Police_dashboard/addwantedlist';
import AddCrimeDetails from './Police_dashboard/addcrimedetails';

export default function Navigation(){
    return (
        <>
        <nav>
      <Link href="/">Home</Link>&nbsp;
     
      <Link href="/Police_dashboard/psignin">Signin</Link>&nbsp;
      
      <Link href="/about">About</Link>&nbsp;<br></br>
      </nav>
      </>
    )
}