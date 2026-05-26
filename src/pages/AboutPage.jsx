import {
  Target,
  Heart,
  Mail,
  Phone,
  MapPin,
  //   Award,
  //   Users,
  //   Globe,
  Sparkles,
} from "lucide-react";
import Owner from "../assets/owner.jpg";

export default function AboutPage() {
  const team = [
    {
      name: "យីន ឃីន",
      role: "ស្ថាបនិក និងនាយកប្រតិបត្តិ",
      role_en: "Founder & CEO",
      avatar: Owner,
      bio: "អ្នកជំនាញផ្នែកបច្ចេកវិទ្យា និងការអប់រំ",
    },
  ];

  //   const stats = [
  //     { value: "50+", label: "អត្ថបទ", icon: Sparkles },
  //     { value: "10+", label: "ប្រភេទ", icon: Award },
  //     { value: "5k+", label: "អ្នកអាន", icon: Users },
  //     { value: "10+", label: "ប្រទេស", icon: Globe },
  //   ];

  return (
    <div className="bg-black min-h-screen">
      <div className=" container mx-auto px-4 py-8">
        {/* Hero Section with Gradient */}
        <div className="relative w-full overflow-hidden rounded-3xl p-8 sm:p-12 mb-8 text-white">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>

          <div className="relative z-10 text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1 mb-4">
              {/* <Sparkles className="w-4 h-4" /> */}
              <span className="text-sm">ស្វែងយល់ពីយើង</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              អំពី KPSACE LIFE
            </h1>
            <p className="text-base sm:text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
              KPSACE LIFE គឺជាវេទិកាចែករំលែកចំណេះដឹង និងព័ត៌មានទាន់សម័យ
              សម្រាប់អ្នកគ្រប់គ្នា
            </p>
          </div>
        </div>

        {/* Statistics Section */}
        {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-4 sm:p-6 text-center hover:shadow-lg transition"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-gray-800">
                {stat.value}
              </p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          );
        })}
      </div> */}

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="group bg-white border-2 rounded-2xl  p-6 text-center  ">
            <div className="w-16 h-16  rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8  " />
            </div>
            <h3 className="text-xl font-bold mb-2">បេសកកម្ម</h3>
            <p className="text-gray-600 leading-relaxed">
              ផ្តល់ជូននូវចំណេះដឹង និងព័ត៌មានដែលមានគុណភាពខ្ពស់
              ដើម្បីលើកកម្ពស់ការអប់រំនៅកម្ពុជា
            </p>
          </div>
          <div className="group bg-white rounded-xl border-2 p-6 text-center ">
            <div className="w-16 h-16  rounded-full flex items-center justify-center mx-auto mb-4  transition">
              <Heart className="w-8 h-8   " />
            </div>
            <h3 className="text-xl font-bold mb-2">ចក្ខុវិស័យ</h3>
            <p className="text-gray-600 leading-relaxed">
              ក្លាយជាវេទិកាឈានមុខគេក្នុងការចែករំលែកចំណេះដឹងនៅកម្ពុជា និងតំបន់
            </p>
          </div>
        </div>

        {/* Our Team */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-200 mb-2">
              ក្រុមការងាររបស់យើង
            </h2>
            <p className="text-gray-300">
              ជួបជាមួយក្រុមការងារដែលនៅពីក្រោយភាពជោគជ័យ
            </p>
          </div>

          <div className="flex justify-center">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md p-6 text-center max-w-md w-full hover:shadow-xl transition transform hover:-translate-y-1"
              >
                <div className="relative">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-blue-500"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/128?text=Owner";
                    }}
                  />
                  <div className="absolute bottom-0 right-1/3 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
                </div>
                <h3 className="font-bold text-xl text-gray-800">
                  {member.name}
                </h3>
                <p className="text-blue-600 text-sm font-medium mt-1">
                  {member.role}
                </p>
                <p className="text-gray-500 text-sm">{member.role_en}</p>
                <p className="text-gray-500 text-sm mt-3 px-4">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">តម្លៃរបស់យើង</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-4 text-center border border-gray-100 hover:shadow-md transition">
              <div className="text-3xl mb-2"></div>
              <h4 className="font-semibold">គុណភាព</h4>
              <p className="text-xs text-gray-500">មាតិកាដែលមានគុណភាពខ្ពស់</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center border border-gray-100 hover:shadow-md transition">
              <div className="text-3xl mb-2"></div>
              <h4 className="font-semibold">ភាពជឿជាក់</h4>
              <p className="text-xs text-gray-500">ព័ត៌មានពិតប្រាកដ</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center border border-gray-100 hover:shadow-md transition">
              <div className="text-3xl mb-2"></div>
              <h4 className="font-semibold">ច្នៃប្រឌិត</h4>
              <p className="text-xs text-gray-500">គំនិតថ្មីៗ</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center border border-gray-100 hover:shadow-md transition">
              <div className="text-3xl mb-2"></div>
              <h4 className="font-semibold">សហគមន៍</h4>
              <p className="text-xs text-gray-500">រួមគ្នាអភិវឌ្ឍន៍</p>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-gray-800 rounded-2xl shadow-md p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-blue-100 text-center mb-6">
            ទំនាក់ទំនងយើង
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="text-center group cursor-pointer">
              <div className="w-12 h-12 bg-gray-500  rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-gray-500 transition">
                <Phone className="w-6 h-6 text-white group-hover:text-gray-300 transition" />
              </div>
              <p className="font-medium text-gray-300">ទូរស័ព្ទ</p>
              <p className="text-gray-400 text-sm">088 791 4573</p>
            </div>
            <div className="text-center group cursor-pointer">
              <div className="w-12 h-12 group-hover:bg-gray-500 bg-gray-500  rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-gray-500 transition">
                <Mail className="w-6 h-6 group-hover:text-gray-300 text-white  transition" />
              </div>
              <p className="font-medium text-gray-300">អ៊ីមែល</p>
              <p className="text-gray-500 text-sm">kspacelite1999@gmail.com</p>
            </div>
            <div className="text-center group cursor-pointer">
              <div className="w-12 h-12 bg-gray-500 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-gray-500 transition">
                <MapPin className="w-6 h-6  text-white group-hover:text-gray-300 transition" />
              </div>
              <p className="font-medium text-gray-300">អាសយដ្ឋាន</p>
              <p className="text-gray-400 text-sm">ភ្នំពេញ, កម្ពុជា</p>
            </div>
          </div>

          {/* Social Links */}
          <div className="mt-8 pt-6 border-t text-center">
            <p className="text-sm text-gray-300 mb-3">តាមដានយើងតាមរយៈ</p>
            <div className="flex justify-center gap-3">
              <a
                href="#"
                className="w-10 h-10 bg-gray-500 rounded-full flex items-center justify-center hover:bg-gray-300 text-white transition"
              >
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-500 rounded-full flex items-center justify-center hover:bg-gray-300 text-white transition"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0021.605-11.796c0-.15-.003-.3-.01-.447.953-.687 1.775-1.54 2.43-2.513z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-500 rounded-full flex items-center justify-center hover:bg-gray-300 text-white transition"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
