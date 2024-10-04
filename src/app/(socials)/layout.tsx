import Navbar from "@/components/navbar";

const AuthLayout = async (
  { children }: { children: React.ReactNode }
) => {
  return (
    <>
    <Navbar/>
      <main className="min-h-screen  pt-[55px]">
          {children}
      </main>
    </>
  );
};

export default AuthLayout;
