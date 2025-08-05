const services = [
  {
    title: 'AI Strategy',
    description: 'Guiding organizations to implement ethical AI solutions.'
  },
  {
    title: 'Innovation Workshops',
    description: 'Hands-on sessions to cultivate forward-thinking technology.'
  },
  {
    title: 'Research & Development',
    description: 'Exploring cutting-edge tools to solve real-world problems.'
  }
];

export default function Services() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">Services</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.title} className="p-6 rounded-lg shadow bg-white dark:bg-gray-900">
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
