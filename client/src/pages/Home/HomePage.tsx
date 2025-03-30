import { Link } from "react-router-dom";
import { LiaBuildingSolid } from "react-icons/lia";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import HomeBG from '../../assets/collegeGIF2.gif'
const Nav = () => (
	<nav className="ml-auto flex gap-4 sm:gap-6 items-center">
		<Link
			className="text-sm font-medium hover:underline underline-offset-4 text-white"
			to="/login"
		>
			Dashboard
		</Link>
		<Link
			className="text-sm font-medium hover:underline underline-offset-4 text-white"
			to="/login"
		>
			Login
		</Link>
		<Link
			className="text-sm font-medium hover:underline underline-offset-4 text-white"
			to="/about"
		>
			About Us
		</Link>
		<Link
			className="text-sm font-medium hover:underline underline-offset-4 text-white"
			to="/contact"
		>
			Contact Us
		</Link>
	</nav>
);

const HomePage = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col max-h-[100svh] min-h-[100svh] overflow-auto noScrollbar">
            <header className="px-4 lg:px-6 h-14 flex items-center min-h-[10svh] bg-[#222831]">
                <div className="flex items-center space-x-2">
                    <LiaBuildingSolid className="h-6 w-6 text-white" />
                    <h1 className="text-md font-semibold tracking-wide sm:text-xl md:text-2xl text-white">
                        HabFix
                    </h1>
                </div>
                <Nav />
            </header>
            <main className="flex-1">
                <section
                    className={`w-full py-6 md:py-12 lg:py-16 min-h-[90svh] flex items-center justify-center`}
                    style={{
                        backgroundImage: `radial-gradient(transparent 1%, black), linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${HomeBG})`,
                        backgroundSize: 'cover',
                        backgroundBlendMode: 'normal'
                    }}
                >
                    <div className="container flex flex-col items-center justify-center gap-4 px-4 text-center md:px-6 h-max sm:w-3/4">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-8xl md:text-5xl/none text-white">
                                Welcome to HabFix
                            </h2>
                            <p className="mx-auto max-w-[600px] text-left  md:text-xl/relaxed text-white lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                            Stop wasting time with broken stuff. HabFix makes reporting and resolving maintenance issues a breeze. Focus on studying, we'll handle the rest.
                            </p>
                            <Button className="bg-[#222831] text-xl font-semibold outline self-start w-max mx-auto" onClick={() => navigate('/login')}>Get Started</Button>
                    </div>
                </section>
                <section className="w-full py-6 md:py-12 lg:py-16 min-h-screen bg-[#222831]">
                    <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
                        <div className="space-y-3">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#00ADB5]">
                                How it works
                            </h2>
                            <p className="mx-auto max-w-[600px] text-white md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                                Simple steps to report an issue and get it resolved.
                            </p>
                        </div>
                        <div className="mx-auto w-full max-w-3xl space-y-12">
                            <div className="grid gap-10 sm:grid-cols-2">
                                <div className="flex flex-col items-center space-y-2">
                                    <img
                                        alt="Image"
                                        className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center animate-pulse bg-gray-400"
                                        height="225"
                                        src="/placeholder.svg"
                                        width="400"
                                    />
                                    <div className="space-y-2 text-center">
                                        <h3 className="text-xl font-bold text-[#00ADB5]">
                                            Step 1: Report
                                        </h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Use the app to report an issue in your room.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center space-y-2">
                                    <img
                                        alt="Image"
                                        className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center animate-pulse bg-gray-400"
                                        height="225"
                                        src="/placeholder.svg"
                                        width="400"
                                    />
                                    <div className="space-y-2 text-center">
                                        <h3 className="text-xl font-bold text-[#00ADB5]">
                                            Step 2: Assign
                                        </h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Your hostel staff will be notified immediately.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center space-y-2">
                                    <img
                                        alt="Image"
                                        className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center animate-pulse bg-gray-400"
                                        height="225"
                                        src="/placeholder.svg"
                                        width="400"
                                    />
                                    <div className="space-y-2 text-center">
                                        <h3 className="text-xl font-bold text-[#00ADB5]">
                                            Step 3: Notify
                                        </h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Your issue will be resolved in a timely manner.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center space-y-2">
                                    <img
                                        alt="Image"
                                        className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center animate-pulse bg-gray-400"
                                        height="225"
                                        src="/placeholder.svg"
                                        width="400"
                                    />
                                    <div className="space-y-2 text-center">
                                        <h3 className="text-xl font-bold text-[#00ADB5]">
                                            Step 4: Resolve
                                        </h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Get notified when your issue is resolved.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <footer>
                <div className="flex items-center justify-between h-16 bg-[#000]">
                    <p className="text-md text-white px-10">
                        &copy; 2021 HabFix. All rights reserved.
                    </p>
                    <div className="flex items-center space-x-4 px-10">
                        <Link
                            className="text-md font-medium hover:underline underline-offset-4 text-[#00ADB5]"
                            to="#"
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            className="text-md font-medium hover:underline underline-offset-4 text-[#00ADB5]"
                            to="#"
                        >
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    );
};
export default HomePage;
