import { supabase } from '../lib/supabaseClient';

export default async function Services() {
  const { data: services } = await supabase
    .from('services')
    .select('*')
    .order('priority', { ascending: true });

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">Services</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {services?.map((service) => (
            <div key={service.id} className="p-6 rounded-lg shadow bg-white dark:bg-gray-900">
              {service.icon && (
                <div className="text-3xl mb-2">{service.icon}</div>
              )}
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
