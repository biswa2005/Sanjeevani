const techStack = [
  "React Native",
  "FastAPI",
  "Node.js",
  "LangGraph",
  "Llama 3.1 70B",
  "MongoDB",
  "Elasticsearch",
  "pgvector",
  "RabbitMQ",
  "Hugging Face",
  "Scikit-learn",
  "XGBoost",
  "AWS",
  "Docker",
];

export default function Technology() {
  return (
    <section className="py-20 relative border-t border-[#4ade80]/6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-[#4ade80] uppercase tracking-widest mb-4">Infrastructure</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#f2f4f1] mb-4 leading-tight">
            Powered by modern AI infrastructure.
          </h2>
          <p className="text-base text-[#7a8e7a] max-w-lg mx-auto leading-relaxed">
            Built on a robust, scalable stack designed for reliable healthcare delivery at any scale.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="px-5 py-2.5 text-sm font-medium text-[#7a8e7a] bg-[#0d110e] border border-[#4ade80]/8 rounded-lg hover:border-[#4ade80]/22 hover:text-[#f2f4f1] transition-all duration-200"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
