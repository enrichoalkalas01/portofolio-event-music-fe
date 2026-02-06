import Link from "next/link";

export default function Footers() {
    return (
        <section className="w-full h-auto text-white">
            <div className="w-full bg-gray-800 flex h-auto py-12 px-4 gap-4">
                <div className="w-full md:max-w-1/4 flex flex-col gap-6">
                    <Link href={"/"} className="text-xl uppercase">
                        <span>Event Music Logo</span>
                    </Link>
                    <p className="text-xs">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book.
                    </p>
                </div>
                <div className="w-full md:max-w-full flex justify-end">
                    <div className="w-auto flex gap-8">
                        <Link href={"/"} className="text-sm">
                            <span>Home</span>
                        </Link>
                        <Link href={"/events"} className="text-sm">
                            <span>Events</span>
                        </Link>
                        <Link href={"/coming-soon"} className="text-sm">
                            <span>Coming Soon</span>
                        </Link>
                        <Link href={"/about-us"} className="text-sm">
                            <span>About Us</span>
                        </Link>
                        <Link href={"/contact-us"} className="text-sm">
                            <span>Contact Us</span>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="w-full flex bg-gray-200/25 items-center justify-center p-2 text-xs">
                <span>
                    Created By Enricho Alkalas | Supported by Endless Creative
                    Corp
                </span>
            </div>
        </section>
    );
}
