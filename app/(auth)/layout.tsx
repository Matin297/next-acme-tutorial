import { Card, CardContent } from "@/components/ui/card";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="max-w-lg min-h-screen m-auto flex justify-center items-center">
      <Card className="w-full">
        <CardContent>{children}</CardContent>
      </Card>
    </section>
  );
}
