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
      role: "ស្ថាបនិក",
      role_en: "Founder ",
      avatar: Owner,
      bio: "អ្នកជំនាញផ្នែកបច្ចេកវិទ្យា និងការអប់រំ",
    },
  ];


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
              អ្នកនៅពីក្រោយ K SPACE LIFE
            </h2>
            <p className="text-gray-300">
              គឺជាអ្នកដែលមានចំណង់ចំណូលចិត្តក្នុងការចែករំលែកចំណេះដឹង និងព័ត៌មានទាន់សម័យ។
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
        </div>
      </div>
    </div>
  );
}
