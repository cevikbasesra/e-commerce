import React from 'react';

const locations = [
  {
    city: 'Paris',
    address: '1901 Thorn ridge Cir.',
    zip: '75000 Paris',
    phone: '+451 215 215',
    fax: '+451 215 215'
  },
  {
    city: 'Berlin',
    address: '4140 Parker Rd.',
    zip: '75000 Paris',
    phone: '+451 215 215',
    fax: '+451 215 215'
  },
  {
    city: 'New York',
    address: '2715 Ash Dr. San Jose,',
    zip: '75000 Paris',
    phone: '+451 215 215',
    fax: '+451 215 215'
  },
  {
    city: 'London',
    address: '3517 W. Gray St. Utica,',
    zip: '75000 Paris',
    phone: '+451 215 215',
    fax: '+451 215 215'
  }
];

const ContactInfo = () => {
  return (
    <div className="bg-gradient-to-r from-[#2A7CC7] to-[#1C3F6E] text-white py-16">
      <div className="container mx-auto px-4">
        <div className="md:flex md:justify-between">
          <div className="mb-12 md:mb-0 md:w-1/3">
            <h2 className="text-3xl font-bold mb-6">CONTACT US</h2>
            <p className="mb-6">
              Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics
            </p>
            <button className="bg-[#23A6F0] text-white px-6 py-2 rounded hover:bg-[#1a85c2] transition-colors">
              CONTACT US
            </button>
          </div>
          <div className="grid md:grid-cols-2 gap-8 md:w-2/3">
            {locations.map((location, index) => (
              <div key={index} className="mb-8 md:mb-0">
                <h3 className="font-bold mb-4">{location.city}</h3>
                <p className="mb-2">{location.address}</p>
                <p className="mb-2">{location.zip}</p>
                <p className="mb-2">Phone: {location.phone}</p>
                <p>Fax: {location.fax}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
