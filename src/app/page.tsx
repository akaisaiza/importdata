"use client"
// pages/index.tsx
import React, { useEffect, useState } from 'react';

enum Type {
  One = '1',
  Two = '2',
  Three = '3',
}

interface Review {
  name: string;
  review_time: string;
  rating: string;
  review_content: string;
}

interface BusinessHours {
  [key: string]: string;
}

interface FormData {
  name: string;
  address: string;
  business_hours: BusinessHours;
  phone_number: string;
  rate: string;
  reviews: Review[];
  type: Type; // Use the Type enum here
  location: string[];
  url_page: string;
  content: string;
  menu: string;
  sum_price: string;
  photo_link: string[];
}

const initialFormData: FormData = {
  name: '',
  address: '',
  business_hours: {
    Sunday: '',
    Monday: '',
    Tuesday: '',
    Wednesday: '',
    Thursday: '',
    Friday: '',
    Saturday: '',
  },
  phone_number: '',
  rate: '',
  reviews: [{
    name: '',
    review_time: '',
    rating: '',
    review_content: '',
  }],
  type: Type.One, // Default value
  location: ['', ''],
  url_page: '',
  content: '',
  menu: '',
  sum_price: '',
  photo_link: [''],
};

const Home: React.FC = () => {
  const [formsData, setFormsData] = useState<FormData[]>([initialFormData]);

  useEffect(() => {
    // Khôi phục dữ liệu khi component được tải ở phía client
    const savedData = localStorage.getItem('formData');
    if (savedData) {
      setFormsData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    // Lưu dữ liệu vào localStorage mỗi khi formsData thay đổi
    if (formsData) {
      localStorage.setItem('formData', JSON.stringify(formsData));
    }
  }, [formsData]);
  const handleRemoveForm = (index: number) => {
    const newFormsData = formsData.filter((_, i) => i !== index);
    setFormsData(newFormsData);
  };
  const handleLocationChange = (formIndex: number, position: number, value: string) => {
    const newFormsData = formsData.map((form, i) => {
      if (i === formIndex) {
        const newLocation = [...form.location];
        newLocation[position] = value;
        return { ...form, location: newLocation };
      }
      return form;
    });
    setFormsData(newFormsData);
  };
  const handleChange = (index: number, field: string, value: string) => {
    const newFormsData = formsData.map((form, i) => {
      if (i === index) {
        return { ...form, [field]: value };
      }
      return form;
    });
    setFormsData(newFormsData);
  };
  const handlePhotoLinkChange = (formIndex: number, linkIndex: number, value: string) => {
    const newFormsData = formsData.map((form, index) => {
      if (index === formIndex) {
        const newPhotoLinks = [...form.photo_link];
        newPhotoLinks[linkIndex] = value;
        return { ...form, photo_link: newPhotoLinks };
      }
      return form;
    });
    setFormsData(newFormsData);
  };
  const handleAddPhotoLink = (formIndex: number) => {
    const newFormsData = formsData.map((form, index) => {
      if (index === formIndex) {
        return { ...form, photo_link: [...form.photo_link, ''] };
      }
      return form;
    });
    setFormsData(newFormsData);
  };
  const handleBusinessHoursChange = (index: number, day: string, value: string) => {
    const newFormsData = formsData.map((form, i) => {
      if (i === index) {
        return { ...form, business_hours: { ...form.business_hours, [day]: value } };
      }
      return form;
    });
    setFormsData(newFormsData);
  };

  const handleAddForm = () => {
    setFormsData([...formsData, { ...initialFormData }]);
  };

  const handleDownload = () => {
    const filename = 'restaurants-data.json';
    const jsonStr = JSON.stringify(formsData, null, 2);
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(jsonStr));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleDownload();
  };
  const handleRemovePhotoLink = (formIndex: number, linkIndex: number) => {
    const newFormsData = formsData.map((form, index) => {
      if (index === formIndex) {
        const newPhotoLinks = form.photo_link.filter((_, idx) => idx !== linkIndex);
        return { ...form, photo_link: newPhotoLinks };
      }
      return form;
    });
    setFormsData(newFormsData);
  };
  return (
    <div className="max-w-xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {formsData.map((formData, index) => (
          <div key={index} className="border p-4 rounded space-y-2">
            <div className="text-lg font-bold">Location {index + 1}</div>
            <label className="block">
              <span className="text-gray-700">Name</span>
              <input type="text" value={formData.name} onChange={(e) => handleChange(index, 'name', e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </label>
            <label className="block">
              <span className="text-gray-700">Address</span>
              <input type="text" value={formData.address} onChange={(e) => handleChange(index, 'address', e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </label>
            {Object.keys(formData.business_hours).map((day) => (
              <label key={day} className="block">
                <span className="text-gray-700">{`Hours for ${day}`}</span>
                <input type="text" value={formData.business_hours[day]} onChange={(e) => handleBusinessHoursChange(index, day, e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
              </label>
            ))}
            <label className="block">
              <span className="text-gray-700">Latitude</span>
              <input
                type="text"
                value={formData.location[0]}
                onChange={(e) => handleLocationChange(index, 0, e.target.value)}
                className="input input-bordered w-full"
                placeholder="Latitude"
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Longitude</span>
              <input
                type="text"
                value={formData.location[1]}
                onChange={(e) => handleLocationChange(index, 1, e.target.value)}
                className="input input-bordered w-full"
                placeholder="Longitude"
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Type</span>
              <select
                value={formData.type}
                onChange={(e) => handleChange(index, 'type', e.target.value as Type)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value={Type.One}>Đồ uống, check in</option>
                <option value={Type.Two}>Khám phá Ẩm thực</option>
                <option value={Type.Three}>Trải nghiệm Giải trí</option>
              </select>
            </label>
            <label className="block">
              <span className="text-gray-700">Phone Number</span>
              <input type="text" value={formData.phone_number} onChange={(e) => handleChange(index, 'phone_number', e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </label>
            <label className="block">
              <span className="text-gray-700">Rate</span>
              <input type="text" value={formData.rate} onChange={(e) => handleChange(index, 'rate', e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </label>
            <label className="block">
              <span className="text-gray-700">URL Page</span>
              <input type="text" value={formData.url_page} onChange={(e) => handleChange(index, 'url_page', e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </label>
            <label className="block">
              <span className="text-gray-700">Content</span>
              <textarea value={formData.content} onChange={(e) => handleChange(index, 'content', e.target.value)} className="textarea textarea-bordered w-full" />
            </label>
            <label className="block">
              <span className="text-gray-700">Menu</span>
              <input type="text" value={formData.menu} onChange={(e) => handleChange(index, 'menu', e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </label>
            <label className="block">
              <span className="text-gray-700">Sum Price</span>
              <input type="text" value={formData.sum_price} onChange={(e) => handleChange(index, 'sum_price', e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </label>
            <div>
            <label className="text-gray-700">Photo Links</label>
            {formData.photo_link.map((link, linkIndex) => (
              <div key={linkIndex} className="flex items-center space-x-2 p-3">
                <input 
                  type="text" 
                  value={link} 
                  onChange={(e) => handlePhotoLinkChange(index, linkIndex, e.target.value)}  
                  placeholder="Photo Link" 
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 py-3" 
                />
                {formData.photo_link.length > 1 && (
                  <button 
                    type="button" 
                    onClick={() => handleRemovePhotoLink(index, linkIndex)}
                    className="btn btn-error btn-xs py-3"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button 
              type="button" 
              onClick={() => handleAddPhotoLink(index)}
              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Add Photo Link
            </button>
          </div>
         <button type="button" onClick={() => handleRemoveForm(index)} className="btn btn-error">Xóa location này</button>

          </div>
        ))}

        <button type="button" onClick={handleAddForm} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 px-12">Add Another Restaurant</button>
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Submit and Download JSON</button>
      </form>
    </div>
  );
};

export default Home;
