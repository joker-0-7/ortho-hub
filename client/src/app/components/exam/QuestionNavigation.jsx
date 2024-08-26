const QuestionNavigation = ({ exams, flags, setIndex, index }) => (
  <div className="rounded-lg border bg-gray-50 px-1 py-6 dark:border-gray-800 dark:bg-gray-900 lg:max-h-screen max-sm:max-h-1/6 md:mb-0 max-sm:mb-5 overflow-auto">
    <div className="flex items-center justify-center lg:mb-4 max-sm:mb-1">
      <h3 className="text-lg font-semibold">Questions</h3>
    </div>
    <nav className="space-y-2 flex lg:flex-col max-sm:flex-row">
      {exams.map((exam, i) => (
        <span
          key={i}
          onClick={() => setIndex(i)}
          className={`flex items-center justify-center cursor-pointer rounded-md px-4 py-2 text-sm font-medium transition-colors dark:hover:bg-gray-800 ${
            flags.includes(i)
              ? "bg-amber-300 hover:bg-amber-200"
              : "md:hover:bg-gray-100"
          }`}
        >
          <span
            className={`md:w-10 md:h-10 rounded-full flex justify-center items-center font-semibold max-sm:w-8 max-sm:h-8 ${
              i === index && "bg-sky-700 text-white"
            }`}
          >
            {i + 1}
          </span>
        </span>
      ))}
    </nav>
  </div>
);

export default QuestionNavigation;
