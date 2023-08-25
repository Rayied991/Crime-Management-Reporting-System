import Link from "next/link";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
const Layout = dynamic(() => import('../Layout/layout'), {
  ssr: false,
});
const Title = dynamic(() => import('../Layout/title'), {
  ssr: false,
});

export default function GetUsers() {
  const router = useRouter();
  const  adminid  = router.query.id;

  return (
    <>
      <Title page="Welcome" />
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
          <h1 className="text-3xl font-bold mb-4">Welcome Admin</h1>
          <div className="space-y-4">
            <Link href="/Admin/AddManager" className="btn btn-primary">
              Add Manager
            </Link>
            <Link
              href={`/Admin/AddVictim?adminid=${adminid}`}
              className="btn btn-primary"
            >
              Add Victim
            </Link>
            <Link href="/Admin/AddPolice" className="btn btn-primary">
              Police
            </Link>
            <Link href="/Admin/Signout" className="btn btn-primary">
              Signout
            </Link>
            
            {/* <Link href={`/Admin/Adminprof/${adminid}`} passHref>
  {({ href }) => (
    <a href={href} className="btn btn-primary">
      Go to Admin Profile
    </a>
  )}
</Link> */}
            
          </div>
        </div>
      </Layout>
    </>
  );
}
