import Logo from "@/components/logo";

import { AvatarMenu } from "./avatar-menu";

export default function Navbar() {
  return (
    <nav className="container mx-auto flex items-center justify-between gap-5">
      <Logo />
      <AvatarMenu />
    </nav>
  );
}
