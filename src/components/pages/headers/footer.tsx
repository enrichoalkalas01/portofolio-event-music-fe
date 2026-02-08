import Link from "next/link";

export default function Footers() {
    return (
        <section className="w-full h-auto text-white">
            <div className="w-full bg-gray-800 flex h-auto py-12 px-4 gap-4">
                <div className="w-full md:max-w-5xl lg:max-w-[90%] flex h-auto py-12 px-4 gap-4 mx-auto">
                    <div className="w-full md:max-w-1/4 flex flex-col gap-6">
                        <Link href={"/"}>
                            <img
                                width={35}
                                height={35}
                                src="/logo.png"
                                className="brightness-0 invert"
                                alt="logo"
                            />
                        </Link>
                        <p className="text-xs w-full md:w-3/4">
                            Platform pembelian tiket event musik terpercaya di
                            Indonesia. Temukan dan hadiri konser favoritmu dengan
                            mudah dan aman.
                        </p>
                    </div>
                    <div className="w-full md:max-w-full flex justify-end">
                        <div className="w-auto flex gap-8">
                            <Link href={"/"} className="text-md">
                                <span>Home</span>
                            </Link>
                            <Link href={"/events"} className="text-md">
                                <span>Events</span>
                            </Link>
                            <Link href={"/coming-soon"} className="text-md">
                                <span>Coming Soon</span>
                            </Link>
                            <Link href={"/about-us"} className="text-md">
                                <span>About Us</span>
                            </Link>
                            <Link href={"/contact-us"} className="text-md">
                                <span>Contact Us</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full flex bg-gray-200/25 items-center py-4 justify-center p-2 text-xs">
                <span>
                    Created By Enricho Alkalas | Supported by Endless Creative
                    Corp
                </span>
            </div>
        </section>
    );
}
