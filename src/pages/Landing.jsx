import { Link } from 'react-router-dom'
import { BookOpen, BarChart2, Users, Award, Play, Star, ArrowRight, Check } from 'lucide-react'

const features = [
  {
    icon: BookOpen,
    title: 'Structured Course Catalog',
    desc: 'Access expertly designed courses across mathematics, sciences, economics, and technology with clear learning paths.',
  },
  {
    icon: Play,
    title: 'Video Lessons',
    desc: 'Watch high-quality recorded lessons at your own pace with chapter navigation and progress tracking built in.',
  },
  {
    icon: BarChart2,
    title: 'Progress Tracking',
    desc: 'Monitor your learning with detailed analytics, weekly study charts, and per-course completion breakdowns.',
  },
  {
    icon: Users,
    title: 'Discussion Forum',
    desc: 'Ask questions, share insights, and engage directly with instructors and fellow students in course-specific threads.',
  },
  {
    icon: Award,
    title: 'Certificates',
    desc: 'Earn verifiable certificates upon course completion that you can download, print, and share with employers.',
  },
  {
    icon: Star,
    title: 'Interactive Quizzes',
    desc: 'Test your understanding after each module with instant-feedback quizzes and detailed score breakdowns.',
  },
]

const stats = [
  { value: '12,000+', label: 'Active Students' },
  { value: '48', label: 'Expert Courses' },
  { value: '4.8', label: 'Average Rating' },
  { value: '96%', label: 'Completion Rate' },
]

const instructorList = [
  {
    name: 'Dr. Sarah Wilson',
    role: 'Mathematics',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face',
    courses: 6,
    rating: 4.9,
  },
  {
    name: 'Dr. Andrew Chen',
    role: 'Computer Science',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
    courses: 8,
    rating: 4.9,
  },
  {
    name: 'Prof. David Miller',
    role: 'Economics',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
    courses: 4,
    rating: 4.7,
  },
  {
    name: 'Prof. Emily Roberts',
    role: 'Physics',
    photo: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop&crop=face',
    courses: 5,
    rating: 4.8,
  },
]

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    features: ['Access 5 free courses', 'Discussion forum', 'Basic progress tracking', 'Mobile access'],
    cta: 'Get Started Free',
    highlight: false,
  },
  {
    name: 'Premium',
    price: '$19',
    period: 'per month',
    features: [
      'Unlimited course access',
      'Completion certificates',
      'Downloadable resources',
      'Priority instructor support',
      'Advanced analytics',
      'Scholarship applications',
    ],
    cta: 'Start Premium',
    highlight: true,
  },
  {
    name: 'Institution',
    price: '$99',
    period: 'per month',
    features: [
      'Everything in Premium',
      'Up to 50 student seats',
      'Admin dashboard',
      'Custom branding',
      'API access',
      'Dedicated support',
    ],
    cta: 'Contact Sales',
    highlight: false,
  },
]

const testimonials = [
  {
    name: 'James Park',
    role: 'Engineering Student',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    text: 'SmartLearn helped me go from struggling with calculus to acing my finals. The structured lessons and instant quiz feedback made all the difference.',
  },
  {
    name: 'Maria Santos',
    role: 'Data Science Graduate',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    text: 'The ML course by Dr. Chen is outstanding. Clear explanations, real-world examples, and a community that actually helps you when you are stuck.',
  },
  {
    name: 'Priya Sharma',
    role: 'Economics Major',
    photo: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop&crop=face',
    text: 'I completed three courses in two months and earned certificates for each. The platform keeps you accountable without being overwhelming.',
  },
]

const previewCourses = [
  { id: 1, title: 'Advanced Mathematics II', category: 'Mathematics', rating: 4.8, students: '2,847' },
  { id: 3, title: 'Machine Learning 101', category: 'Computer Science', rating: 4.9, students: '5,621' },
  { id: 2, title: 'Global Economic Trends', category: 'Economics', rating: 4.6, students: '1,923' },
]

const checks = ['No credit card required', 'Free plan available', 'Cancel anytime']

export default function Landing() {
  return (
    <div className="min-h-screen bg-white text-black" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between" style={{ height: '56px' }}>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-black rounded-lg flex items-center justify-center">
              <BookOpen className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold text-black tracking-tight">SmartLearn</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm text-gray-500 hover:text-black transition-colors font-medium">Features</a>
            <a href="#instructors" className="text-sm text-gray-500 hover:text-black transition-colors font-medium">Instructors</a>
            <a href="#pricing" className="text-sm text-gray-500 hover:text-black transition-colors font-medium">Pricing</a>
            <a href="#testimonials" className="text-sm text-gray-500 hover:text-black transition-colors font-medium">Reviews</a>
          </nav>
          <div className="flex items-center gap-2.5">
            <Link
              to="/app"
              className="text-sm font-medium text-gray-500 hover:text-black transition-colors px-3 py-1.5"
            >
              Log In
            </Link>
            <Link
              to="/app"
              className="bg-black text-white text-sm font-medium px-4 py-1.5 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 border border-gray-200 rounded-full px-3.5 py-1 mb-7">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              <span className="text-xs font-medium text-gray-600">Now with AI-powered study recommendations</span>
            </div>
            <h1 className="text-5xl font-black leading-none tracking-tight text-black">
              Build your knowledge, one lesson at a time.
            </h1>
            <p className="text-gray-500 mt-5 text-lg leading-relaxed">
              SmartLearn helps students master complex subjects through expert-led video courses,
              interactive quizzes, and a supportive learning community.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Link
                to="/app"
                className="inline-flex items-center gap-2 bg-black text-white font-semibold px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors"
              >
                Start Learning Free
                <ArrowRight className="w-4 h-4" />
              </Link>
              
                <a href="#features"
                className="inline-flex items-center border border-gray-300 text-black font-semibold px-6 py-3 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-colors"
              >
                See How It Works
              </a>
            </div>
            <div className="flex flex-wrap gap-5 mt-8">
              {checks.map(t => (
                <span key={t} className="flex items-center gap-1.5 text-sm text-gray-400">
                  <Check className="w-3.5 h-3.5 text-black" />
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-2xl shadow-gray-100">
              <img
                src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=520&fit=crop"
                alt="Student studying"
                className="w-full object-cover"
              />
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-white rounded-xl border border-gray-200 p-3.5 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-black rounded-lg flex items-center justify-center flex-shrink-0">
                    <Play className="w-4 h-4 text-white" style={{ marginLeft: '2px' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-black">Advanced Mathematics II</p>
                    <p className="text-xs text-gray-400 mt-0.5">Lesson 4 of 6 — Multivariable Calculus</p>
                    <div className="mt-1.5 h-1 bg-gray-100 rounded-full">
                      <div className="h-full bg-black rounded-full" style={{ width: '68%' }} />
                    </div>
                  </div>
                  <span className="text-xs font-bold text-black flex-shrink-0">68%</span>
                </div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 bg-black text-white rounded-xl px-3.5 py-2.5 shadow-lg">
              <p className="text-xs font-semibold">4.9 rating</p>
              <div className="flex gap-0.5 mt-0.5">
                {[0, 1, 2, 3, 4].map(i => (
                  <Star key={i} className="w-2.5 h-2.5 fill-white text-white" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-gray-100 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="text-3xl font-black text-black">{value}</p>
              <p className="text-sm text-gray-500 mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-black">Everything you need to learn effectively</h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            A complete learning platform designed around how students actually study and retain knowledge.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="border border-gray-200 rounded-2xl p-5 hover:border-gray-400 hover:shadow-sm transition-all"
            >
              <div className="w-9 h-9 bg-black rounded-xl flex items-center justify-center mb-4">
                <Icon className="w-4 h-4 text-white" />
              </div>
              <h3 className="font-bold text-black text-sm">{title}</h3>
              <p className="text-gray-500 text-sm mt-1.5 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Course Preview */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-black text-black">Courses built by real experts</h2>
              <p className="text-gray-500 mt-3 leading-relaxed">
                Every course on SmartLearn is developed by practicing academics and industry professionals.
                No generic content — just deep, structured knowledge.
              </p>
              <div className="mt-7 space-y-3">
                {previewCourses.map(course => (
                  <div
                    key={course.id}
                    className="flex items-center gap-3.5 p-3.5 bg-white border border-gray-200 rounded-xl hover:border-gray-300 transition-colors"
                  >
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-3.5 h-3.5 text-black" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-black">{course.title}</p>
                      <p className="text-xs text-gray-400">{course.category}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-xs font-bold text-black flex items-center gap-0.5 justify-end">
                        <Star className="w-3 h-3 fill-black text-black" />
                        {course.rating}
                      </p>
                      <p className="text-xs text-gray-400">{course.students} students</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                to="/app/courses"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-black mt-5 hover:underline underline-offset-2"
              >
                Browse all courses <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-xl shadow-gray-100">
              <img
                src="https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=700&h=480&fit=crop"
                alt="Course preview"
                className="w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Instructors */}
      <section id="instructors" className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-black">Learn from the best</h2>
          <p className="text-gray-500 mt-3">PhD-level academics and industry leaders who know how to teach.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {instructorList.map(inst => (
            <div
              key={inst.name}
              className="border border-gray-200 rounded-2xl p-5 text-center hover:border-gray-400 transition-colors"
            >
              <img
                src={inst.photo}
                alt={inst.name}
                className="w-14 h-14 rounded-full object-cover mx-auto border-2 border-gray-200"
              />
              <h3 className="font-bold text-black text-sm mt-3">{inst.name}</h3>
              <p className="text-xs text-gray-500 mt-0.5">{inst.role}</p>
              <div className="flex items-center justify-center gap-3 mt-3 text-xs text-gray-400">
                <span className="flex items-center gap-0.5">
                  <Star className="w-3 h-3 fill-black text-black" />
                  {inst.rating}
                </span>
                <span>{inst.courses} courses</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-black">Students who made it work</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map(({ name, role, photo, text }) => (
              <div key={name} className="bg-white border border-gray-200 rounded-2xl p-5">
                <div className="flex gap-0.5 mb-3">
                  {[0, 1, 2, 3, 4].map(i => (
                    <Star key={i} className="w-3.5 h-3.5 fill-black text-black" />
                  ))}
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{text}</p>
                <div className="flex items-center gap-2.5 mt-4 pt-4 border-t border-gray-100">
                  <img src={photo} alt={name} className="w-8 h-8 rounded-full object-cover" />
                  <div>
                    <p className="text-xs font-semibold text-black">{name}</p>
                    <p className="text-xs text-gray-400">{role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-black">Simple, honest pricing</h2>
          <p className="text-gray-500 mt-3">No hidden fees. Cancel any time.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {plans.map(({ name, price, period, features: planFeatures, cta, highlight }) => (
            <div
              key={name}
              className={[
                'rounded-2xl border p-6 flex flex-col',
                highlight ? 'bg-black border-black text-white' : 'bg-white border-gray-200',
              ].join(' ')}
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">{name}</p>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="text-3xl font-black">{price}</span>
                  <span className="text-xs text-gray-400">{period}</span>
                </div>
              </div>
              <ul className="mt-6 space-y-2.5 flex-1">
                {planFeatures.map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className={['w-4 h-4 flex-shrink-0 mt-0.5', highlight ? 'text-white' : 'text-black'].join(' ')} />
                    <span className={highlight ? 'text-gray-300' : 'text-gray-600'}>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/app"
                className={[
                  'mt-7 block text-center py-2.5 rounded-xl font-semibold text-sm transition-colors',
                  highlight
                    ? 'bg-white text-black hover:bg-gray-100'
                    : 'bg-black text-white hover:bg-gray-800',
                ].join(' ')}
              >
                {cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="bg-black rounded-3xl px-8 py-14 text-center text-white relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '30px 30px',
            }}
          />
          <h2 className="text-3xl font-black relative z-10">Ready to start learning?</h2>
          <p className="text-gray-400 mt-3 relative z-10">
            Join thousands of students building real skills on SmartLearn.
          </p>
          <Link
            to="/app"
            className="inline-flex items-center gap-2 mt-7 bg-white text-black font-bold px-7 py-3 rounded-xl hover:bg-gray-100 transition-colors text-sm relative z-10"
          >
            Go to Dashboard <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-black rounded-md flex items-center justify-center">
              <BookOpen className="w-3 h-3 text-white" />
            </div>
            <span className="font-bold text-black text-sm">SmartLearn</span>
          </div>
          <p className="text-xs text-gray-400">2024 SmartLearn. Built for curious minds.</p>
          <div className="flex gap-5">
            <a href="#" className="text-xs text-gray-400 hover:text-black transition-colors">Privacy</a>
            <a href="#" className="text-xs text-gray-400 hover:text-black transition-colors">Terms</a>
            <a href="#" className="text-xs text-gray-400 hover:text-black transition-colors">Contact</a>
          </div>
        </div>
      </footer>

    </div>
  )
}