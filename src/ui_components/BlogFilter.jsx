import { useState } from "react";
import { Input } from "@/components/ui/input"; // Button is no longer needed for search
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const categories = ["Frontend", "Backend", "Fullstack", "Design", "Blockchain", "Web3"]; // Categories can remain local

const BlogFilter = ({ searchTerm, onSearch, onCategoryChange }) => { // Receive searchTerm as prop
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    onCategoryChange(value === "_all" ? "" : value);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center gap-4 bg-card dark:bg-card-foreground">
      <div className="flex w-full md:w-1/2 gap-4">
        <Input
          type="text"
          placeholder="Search blogs by title or content..."
          value={searchTerm} // Controlled by parent's searchTerm prop
          onChange={(e) => onSearch(e.target.value)} // Update parent's searchTerm on change
          className="w-full"
        />
      </div>

      <div className="w-full md:w-1/2 flex justify-end">
        <Select onValueChange={handleCategoryChange} value={selectedCategory}>
          <SelectTrigger className="w-full md:w-auto">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="_all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default BlogFilter;
