import { useParams, Link } from 'react-router-dom'
import { Award, Download, Share2, CheckCircle, ChevronLeft } from 'lucide-react'
import { Button } from '../components/ui'
import { courses } from '../data/mockData'

export default function Certificate() {
  const { courseId } = useParams()
  const course = courses.find(c => c.id === Number(courseId))

  if (!course?.completed) return (
    <div className="text-center py-20">
      <Award className="w-10 h-10 text-gray-200 mx-auto mb-3" />
      <h2 className="text-base font-semibold text-black">No Certificate Available</h2>
      <p className="text-gray-400 text-sm mt-1">Complete the course to earn your certificate</p>
      <Link to="/courses"><Button className="mt-4">Browse Courses</Button></Link>
    </div>
  )

  return (
    <div className="space-y-5 max-w-2xl mx-auto">
      <Link to={`/courses/${course.id}`} className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-black font-medium">
        <ChevronLeft className="w-4 h-4" />Back to Course
      </Link>

      <div>
        <h1 className="text-xl font-bold text-black">Certificate of Completion</h1>
        <p className="text-gray-500 text-sm mt-0.5">Your achievement has been recognized</p>
      </div>

      <div className="border-4 border-black rounded-2xl p-8 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-28 h-28 border-b-4 border-r-4 border-gray-100 rounded-br-full" />
        <div className="absolute bottom-0 right-0 w-28 h-28 border-t-4 border-l-4 border-gray-100 rounded-tl-full" />
        <div className="absolute top-4 right-4 w-2 h-2 bg-gray-200 rounded-full" />
        <div className="absolute top-4 right-8 w-2 h-2 bg-gray-200 rounded-full" />
        <div className="absolute bottom-4 left-4 w-2 h-2 bg-gray-200 rounded-full" />

        <div className="text-center relative z-10">
          <div className="flex items-center justify-center gap-2.5 mb-6">
            <div className="w-9 h-9 bg-black rounded-lg flex items-center justify-center">
              <Award className="w-4.5 h-4.5 text-white" style={{ width: 18, height: 18 }} />
            </div>
            <span className="text-xl font-black tracking-tight">SmartLearn</span>
          </div>

          <p className="text-gray-400 text-xs uppercase tracking-widest font-medium">Certificate of Completion</p>

          <div className="my-7 border-t border-b border-gray-100 py-7">
            <p className="text-gray-400 text-xs">This certifies that</p>
            <h2 className="text-3xl font-bold text-black mt-2" style={{ fontFamily: 'Georgia, serif' }}>Alex Johnson</h2>
            <p className="text-gray-400 text-xs mt-3">has successfully completed</p>
            <h3 className="text-lg font-bold text-black mt-2">{course.title}</h3>
            <p className="text-sm text-gray-400 mt-1">Taught by {course.instructor}</p>
          </div>

          <div className="flex justify-center items-center gap-6 text-sm">
            {[
              { label: 'Completed', value: 'March 1, 2024' },
              { label: 'Duration', value: course.duration },
              { label: 'Certificate ID', value: `SL-${String(course.id).padStart(4,'0')}-2024` },
            ].map(({ label, value }, i) => (
              <div key={label} className="flex items-center gap-6">
                {i > 0 && <div className="w-px h-8 bg-gray-200" />}
                <div className="text-center">
                  <p className="text-gray-400 text-xs uppercase tracking-wide">{label}</p>
                  <p className="font-semibold text-black text-sm mt-0.5">{value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-around items-end">
            <div className="text-center">
              <div className="w-20 border-b-2 border-black mx-auto mb-1.5" />
              <p className="text-xs text-gray-500 font-medium">{course.instructor}</p>
              <p className="text-xs text-gray-400">Course Instructor</p>
            </div>
            <CheckCircle className="w-7 h-7 text-black mb-1" />
            <div className="text-center">
              <div className="w-20 border-b-2 border-black mx-auto mb-1.5" />
              <p className="text-xs text-gray-500 font-medium">Dr. Michael Scott</p>
              <p className="text-xs text-gray-400">Platform Director</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <Button onClick={() => window.print()} className="flex-1 gap-1.5"><Download className="w-4 h-4" />Download Certificate</Button>
        <Button variant="outline" className="flex-1 gap-1.5"><Share2 className="w-4 h-4" />Share</Button>
      </div>
    </div>
  )
}