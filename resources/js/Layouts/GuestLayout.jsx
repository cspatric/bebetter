import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";
import ImageGirl from "../assets/estudante.png";
import "../css/style.css";
import { IoArrowBackCircle } from "react-icons/io5";

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex items-center pt-6 sm:pt-0 bg-[#8573f3]">
            <Link href="/">
                <button className="cursor-pointer absolute text-6xl top-4 left-4 text-[#8d7eeb] active:text-[#634cee]">
                    <IoArrowBackCircle />
                </button>
            </Link>
            <div className="flex justify-center items-center w-2/3 h-screen bg-white">
                <div className="w-1/2 h-2/3">{children}</div>
            </div>
            <div className="flex justify-center items-center w-1/2 h-screen bodyGradient p-32">
                <div className="relative bg-[#776acc7f] w-full h-5/6 rounded-3xl">
                    <img
                        className="max-w-80 absolute bottom-0 left-32"
                        src={ImageGirl}
                        alt=""
                    />
                    <p className="text-5xl absolute float right-space-l top-24">
                        ❤️
                    </p>
                    <p className="text-8xl absolute bottom-0 left-space-l float rotate">
                        💻
                    </p>
                    <p className="text-4xl absolute bottom-72 left-36 float">
                        ✨
                    </p>
                </div>
            </div>
            {/* <div>
                <Link href="/">
                    <ApplicationLogo className="w-20  h-20 fill-current text-gray-500" />
                </Link>
            </div>
*/}
        </div>
    );
}
