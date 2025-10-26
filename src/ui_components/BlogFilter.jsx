import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const categories = ["Frontend", "Backend", "Fullstack", "Design", "Blockchain", "Web3"];

const BlogFilter = ({ onSearch, onCategoryChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    onCategoryChange(value === "_all" ? "" : value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center gap-4 bg-card dark:bg-card-foreground">
      <form onSubmit={handleSubmit} className="flex w-full md:w-1/2 gap-4">
        <Input
          type="text"
          placeholder="Search blogs by title or content..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full"
        />
        <Button type="submit">Search</Button>
      </form>

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
