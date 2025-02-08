import { Button } from "@/components/ui/button";
import { BookOpen, Headset, LayoutTemplate, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center justify-center px-4">
      <Header />
      <div className="text-center max-w-2xl mt-12">
        <div className="flex justify-center items-center mb-4">
          <h2 className="text-sm px-4 py-2 text-gray-700">
            Harsha AI Dev
          </h2>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          AI Content <span className="text-blue-600">Generator</span>
        </h1>
        <p className="text-gray-600 text-lg mb-6">
          Revolutionize your content creation with our AI-powered app, delivering engaging and high-quality text in seconds.
        </p>
        <Link href={'/dashboard'}>
        <Button className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg">
          Get started
        </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
        <FeatureCard
          title="25+ templates"
          description="Responsive, and mobile-first project on the web"
          icon={<LayoutTemplate className="w-10 h-10 mx-auto" />}
        />
        <FeatureCard
          title="Customizable"
          description="Components are easily customized and extendable"
          icon={<Settings className="w-10 h-10 mx-auto" />}
        />
        <FeatureCard
          title="Free to Use"
          description="Every component and plugin is well documented"
          icon={<BookOpen className="w-10 h-10 mx-auto" />}
        />
        <FeatureCard
          title="24/7 Support"
          description="Contact us 24 hours a day, 7 days a week"
          icon={<Headset className="w-10 h-10 mx-auto" />}
        />
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="w-full flex items-center justify-between p-4 bg-white shadow-md fixed top-0 left-0">
      <div className="flex items-center">
        <Image src="/logo.svg" alt="Logo" width={50} height={50} />
        <span className="ml-2 text-xl font-bold text-gray-900">AI Content Generator</span>
      </div>
      <Link href={'/dashboard'}>
      <Button className="bg-gray-300 text-gray px-4 py-2 rounded-lg">Get started</Button>
      </Link>
    </header>
  );
}

// @ts-ignore
function FeatureCard({ title, description, icon}) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md text-center">
      <div className="text-blue-600 mb-4">
      {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
    </div>
  );
} 
