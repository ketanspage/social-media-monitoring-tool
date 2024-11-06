import Navbar from "@/components/navbar";

const AuthLayout = async (
  { children }: { children: React.ReactNode }
) => {
  return (
    <>
    <Navbar/>
      <main className="flex items-center justify-center min-h-screen bg-[url('/search.webp')] bg-no-repeat bg-cover">
          {children}
      </main>
    </>
  );
};

export default AuthLayout;
