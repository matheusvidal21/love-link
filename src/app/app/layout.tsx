import Main from './_components/dashboard/main';
import Sidebar from './_components/dashboard/sidebar'; 

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <Sidebar /> 
      <div className='flex-1'>
        <Main>{children}</Main>
      </div>
    </div>
  );
}
