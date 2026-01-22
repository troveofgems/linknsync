import Link from "next/link";
import { LuCalendarHeart } from "react-icons/lu";
import {Button} from "@/components/ui/button";

export const Logo = () => {
    return (
        <Button size={"icon"} asChild>
            <Link href="/" className={"linkContainer__header"}>
                <LuCalendarHeart title={"Link N' Sync Banner"} className={"header__logo"} />
            </Link>
        </Button>
    );
};
