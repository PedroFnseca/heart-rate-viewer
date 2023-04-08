import TabsMain from "@/components/TabsMain";
import PrivateRoute from "@/components/PrivateRoute";

export default function Home() {
  return (
    <>
      <PrivateRoute>
        <TabsMain/>
      </PrivateRoute>
    </>
  )
}