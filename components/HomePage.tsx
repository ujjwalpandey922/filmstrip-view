"use client"; // Indicates this is a client-side rendered component
import Image from "next/image"; // Next.js optimized image component
import { useState, useEffect } from "react";

// Interface for Template objects
interface Template {
  id: string;
  cost: number;
  description: string;
  thumbnail: string;
  image: string;
  title: string;
}

const HomePage = () => {
  // State to hold the list of templates
  const [templates, setTemplates] = useState<Template[]>([]);
  // State to manage the current index of the templates being viewed
  const [currentIndex, setCurrentIndex] = useState(0);
  // State to manage the currently selected template
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null
  );

  // useEffect to fetch templates data when the component mounts
  useEffect(() => {
    fetch("/api/templates")
      .then((response) => response.json())
      .then((data) => {
        console.log(typeof data, data);
        // Check if the fetched data is an array before setting the state
        if (Array.isArray(data)) {
          setTemplates(data);
        } else {
          console.error("Data is not an array:", data);
        }
      });
  }, []);

  // Handle thumbnail click to set the selected template
  const handleThumbnailClick = (index: number) => {
    setSelectedTemplate(templates[index]);
  };

  // Handle "Next" button click to move to the next set of templates
  const handleNext = () => {
    if (currentIndex < templates.length - 4) {
      setCurrentIndex(currentIndex + 4);
    }
  };

  // Handle "Previous" button click to move to the previous set of templates
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 4);
    }
  };

  return (
    <div className="border w-full max-w-5xl flex flex-col border-[#ccc] m-auto p-4 shadow-[0px_0px_12px_rgba(0,0,0,0.3)] min-h-[90vh]">
      {/* // HEADING SECTION */}
      <header>
        <h1 className="text-center text-2xl font-bold">Filmstrip View</h1>
        <hr />
      </header>
      {selectedTemplate ? (
        // Render selected template details
        <div className="p-4 flex gap-4 w-[90%] mx-auto">
          <div className="border flex-[.6] rounded-md shadow-[0px_0px_6px_rgba(0,0,0,0.3)] p-4">
            <Image
              priority
              src={`/imagesList/large/${selectedTemplate.image}`}
              alt={selectedTemplate.description}
              width={700}
              height={400}
              className="block rounded-lg mx-auto w-[500px] h-[350px] object-fill"
            />
          </div>
          <div className="space-y-2 text-left flex-[.4] border-[#ccc]">
            <hr className="h-[2px] bg-gray-300" />
            <div className="text-sm flex gap-2 ">
              <span className="uppercase bg-[#555] text-white px-2">Title</span>
              <p>{selectedTemplate.title}</p>
            </div>
            <hr className="h-[2px] bg-gray-300" />
            <div className="text-sm">
              <span className="uppercase bg-[#555] text-white px-2">
                Description
              </span>
              <span> &nbsp;{selectedTemplate.description}</span>
            </div>
            <hr className="h-[2px] bg-gray-300" />
            <div className="text-sm flex gap-2">
              <span className="uppercase bg-[#555] text-white px-2">Cost</span>
              <p>${selectedTemplate.cost}</p>
            </div>
            <hr className="h-[2px] bg-gray-300" />
            <div className="text-sm flex gap-2">
              <span className="uppercase bg-[#555] text-white px-2">ID #</span>
              <p>{selectedTemplate.id}</p>
            </div>
            <hr className="h-[2px] bg-gray-300" />
            <div className="text-sm flex gap-2">
              <span className="uppercase bg-[#555] text-white px-2">
                Thumbnail File
              </span>
              <p>{selectedTemplate.thumbnail}</p>
            </div>
            <hr className="h-[2px] bg-gray-300" />
            <div className="text-sm flex gap-2">
              <span className="uppercase bg-[#555] text-white px-2">
                Large Image File
              </span>
              <p>{selectedTemplate.image}</p>
            </div>
            <hr className="h-[2px] bg-gray-300" />
          </div>
        </div>
      ) : (
        // Prompt to select a template
        <h1 className="text-center grid items-center text-2xl font-bold h-[50vh]">
          Select a template
        </h1>
      )}

      {/* // THUMBNAIL SECTION WITH NAVIGATION */}
      <div className="flex items-center justify-center p-4 gap-4 mt-auto border rounded border-[#ddd]">
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="disabled:opacity-50"
        >
          <Image
            src="/imagesList/previous.png"
            alt="Previous"
            width={24}
            height={24}
          />
        </button>
        <div className="flex overflow-hidden gap-4">
          {templates.length > 0 &&
            templates
              .slice(currentIndex, currentIndex + 4)
              .map((template, index) => (
                <div
                  key={template.id}
                  className="flex flex-col group gap-4 justify-between items-center"
                >
                  <Image
                    key={template.id}
                    src={`/imagesList/thumbnails/${template.thumbnail}`}
                    alt={template.description}
                    className={`cursor-pointer w-[200px] h-[150px] rounded object-fill border-8 ${
                      selectedTemplate && selectedTemplate.id === template.id
                        ? "border-red-800 "
                        : "border-transparent group-hover:border-gray-400"
                    }`}
                    width={200}
                    height={150}
                    onClick={() => handleThumbnailClick(currentIndex + index)}
                  />
                  <span
                    className={`rounded-xl px-4 ${
                      selectedTemplate && selectedTemplate.id === template.id
                        ? "bg-red-800 text-white"
                        : "bg-gray-300 group-hover:bg-gray-400"
                    }`}
                  >
                    {template.id}
                  </span>
                </div>
              ))}
        </div>
        <button
          onClick={handleNext}
          disabled={currentIndex >= templates.length - 4}
          className="disabled:opacity-50"
        >
          <Image src="/imagesList/next.png" alt="Next" width={24} height={24} />
        </button>
      </div>
    </div>
  );
};

export default HomePage;
